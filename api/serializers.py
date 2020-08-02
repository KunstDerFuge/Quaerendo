from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from api.models import Entity, Source, Claim, Evidence, EvidenceReview, Topic, EvidenceRelationship, TruthJudgement, \
    ReviewInvitation


class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = ['id', 'name', 'short_bio']


class SourceSerializer(serializers.ModelSerializer):
    authors = EntitySerializer(many=True)

    class Meta:
        model = Source
        fields = '__all__'


class SourceCreateSerializer(serializers.ModelSerializer):
    authors = PrimaryKeyRelatedField(many=True, write_only=True, queryset=Entity.objects.all())

    class Meta:
        model = Source
        fields = '__all__'


class SourceLinkSerializer(serializers.ModelSerializer):
    authors = EntitySerializer(many=True, read_only=True)

    class Meta:
        model = Source
        fields = ['id', 'authors']


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'name']


class ClaimSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(read_only=True, many=True)
    source_of_claim = SourceSerializer(read_only=True)
    claimants = EntitySerializer(many=True, read_only=True)
    expert_truth_consensus = serializers.SerializerMethodField(read_only=True)
    community_truth_consensus = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Claim
        fields = ['id', 'claim_text', 'description', 'topics', 'source_of_claim', 'claimants', 'expert_truth_consensus',
                  'community_truth_consensus']

    @extend_schema_field(serializers.ChoiceField(choices=TruthJudgement.choices) or None)
    def get_expert_truth_consensus(self, obj: Claim) -> TruthJudgement or None:
        return obj.get_truth_consensus(expert=True)

    @extend_schema_field(serializers.ChoiceField(choices=TruthJudgement.choices) or None)
    def get_community_truth_consensus(self, obj: Claim) -> TruthJudgement or None:
        return obj.get_truth_consensus(expert=False)


class ClaimCreateSerializer(serializers.ModelSerializer):
    topics = PrimaryKeyRelatedField(many=True, queryset=Topic.objects.all())
    source_of_claim = SourceCreateSerializer()
    claimants = PrimaryKeyRelatedField(many=True, write_only=True, queryset=Entity.objects.all())

    class Meta:
        model = Claim
        fields = ['id', 'claim_text', 'description', 'topics', 'source_of_claim', 'claimants']

    def create(self, validated_data):
        source_data = validated_data.pop('source_of_claim')
        authors = source_data.pop('authors')
        source_instance = Source.objects.create(**source_data)
        source_instance.authors.set(authors)
        user = validated_data.pop('user')
        topics = validated_data.pop('topics')
        claimants = validated_data.pop('claimants')
        claim_instance = Claim.objects.create(**validated_data, source_of_claim=source_instance,
                                              submitted_by=user)
        claim_instance.topics.set(topics)
        claim_instance.claimants.set(claimants)
        claim_instance.save()
        return claim_instance


class EvidenceSerializer(serializers.ModelSerializer):
    source_of_evidence = SourceSerializer(read_only=True)
    expert_consensus_relationship = serializers.SerializerMethodField()
    community_consensus_relationship = serializers.SerializerMethodField()
    num_expert_reviews = serializers.SerializerMethodField()
    num_community_reviews = serializers.SerializerMethodField()

    class Meta:
        model = Evidence
        fields = ['id', 'source_of_evidence', 'description', 'expert_consensus_relationship', 'num_expert_reviews',
                  'community_consensus_relationship', 'num_community_reviews']

    @extend_schema_field(serializers.ChoiceField(choices=EvidenceRelationship.choices))
    def get_expert_consensus_relationship(self, obj: Evidence) -> EvidenceRelationship:
        return obj.get_consensus(expert=True)

    @extend_schema_field(serializers.ChoiceField(choices=EvidenceRelationship.choices))
    def get_community_consensus_relationship(self, obj: Evidence) -> EvidenceRelationship:
        return obj.get_consensus(expert=False)

    @staticmethod
    def get_num_expert_reviews(obj: Evidence) -> int:
        return obj.get_num_reviews(expert=True)

    @staticmethod
    def get_num_community_reviews(obj: Evidence) -> int:
        return obj.get_num_reviews(expert=False)


class EvidenceReviewSerializer(serializers.ModelSerializer):
    evidence = PrimaryKeyRelatedField(write_only=True, queryset=Evidence.objects.all())

    class Meta:
        model = EvidenceReview
        fields = ['deduced_evidence_relationship', 'deduced_source_degree', 'is_reliable',
                  'additional_comments', 'evidence']

    def create(self, validated_data):
        evidence_instance = validated_data.get('evidence')
        review = EvidenceReview.objects.create(**validated_data)
        evidence_instance.reviews.add(review)
        evidence_instance.save()
        return review


class EvidenceReviewByEvidenceSubmitterSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvidenceReview
        fields = ['deduced_evidence_relationship', 'deduced_source_degree', 'is_reliable',
                  'additional_comments']

    def create(self, validated_data):
        review = EvidenceReview.objects.create(**validated_data)
        return review


class EvidenceWithReviewSerializer(serializers.ModelSerializer):
    source_of_evidence = SourceCreateSerializer()
    reviews = EvidenceReviewByEvidenceSubmitterSerializer(write_only=True, many=True)
    claim = serializers.PrimaryKeyRelatedField(queryset=Claim.objects.all())

    class Meta:
        model = Evidence
        fields = ['source_of_evidence', 'reviews', 'claim']

    def create(self, validated_data):
        source_data = validated_data.pop('source_of_evidence')
        authors = source_data.pop('authors')
        source_instance = Source.objects.create(**source_data)
        source_instance.authors.set(authors)
        claim = validated_data.pop('claim')
        user = self.context['request'].user
        review = EvidenceReviewByEvidenceSubmitterSerializer(data=validated_data.pop('reviews')[0])
        if review.is_valid():
            evidence_instance = Evidence.objects.create(**validated_data, source_of_evidence=source_instance,
                                                        claim=claim,
                                                        submitted_by=user)
            review.save(evidence=evidence_instance, reviewer=user)
        else:
            return review.errors
        return evidence_instance


class EvidenceReviewPartialSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvidenceReview
        fields = ['deduced_evidence_relationship', 'additional_comments']


class ClaimWithEvidenceSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(read_only=True, many=True)
    source_of_claim = SourceSerializer(read_only=True)
    claimants = EntitySerializer(many=True, read_only=True)
    related_evidence = EvidenceSerializer(many=True, read_only=True)
    expert_truth_consensus = serializers.SerializerMethodField(read_only=True)
    community_truth_consensus = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Claim
        fields = ['id', 'claim_text', 'description', 'topics', 'source_of_claim', 'claimants', 'related_evidence',
                  'expert_truth_consensus', 'community_truth_consensus']

    @extend_schema_field(serializers.ChoiceField(choices=TruthJudgement.choices) or None)
    def get_expert_truth_consensus(self, obj: Claim) -> TruthJudgement or None:
        return obj.get_truth_consensus(expert=True)

    @extend_schema_field(serializers.ChoiceField(choices=TruthJudgement.choices) or None)
    def get_community_truth_consensus(self, obj: Claim) -> TruthJudgement or None:
        return obj.get_truth_consensus(expert=False)


class ClaimForReviewSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(read_only=True, many=True)
    source_of_claim = SourceSerializer(read_only=True)
    claimants = EntitySerializer(many=True, read_only=True)

    class Meta:
        model = Claim
        fields = ['id', 'claim_text', 'claimants', 'description', 'topics', 'source_of_claim']


class EvidenceAndClaimForReviewSerializer(serializers.ModelSerializer):
    source_of_evidence = SourceSerializer(read_only=True)
    claim = ClaimForReviewSerializer(read_only=True)

    class Meta:
        model = Evidence
        fields = ['id', 'source_of_evidence', 'description', 'claim']


class ReviewInvitationSerializer(serializers.ModelSerializer):
    evidence = serializers.PrimaryKeyRelatedField(queryset=Evidence.objects.all())

    class Meta:
        model = ReviewInvitation
        fields = '__all__'


class ReviewInvitationDetailsSerializer(serializers.ModelSerializer):
    evidence = EvidenceAndClaimForReviewSerializer(read_only=True)

    class Meta:
        model = ReviewInvitation
        fields = '__all__'
