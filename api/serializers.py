import math

from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from api.models import Entity, Source, Claim, Evidence, EvidenceReview, Topic, EvidenceRelationship


class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = ['name', 'description']


class SourceSerializer(serializers.ModelSerializer):
    authors = EntitySerializer(many=True, read_only=True)

    class Meta:
        model = Source
        fields = ['title', 'url', 'description', 'source_degree', 'authors', 'date_retrieved']


class SourceLinkSerializer(serializers.ModelSerializer):
    authors = EntitySerializer(many=True, read_only=True)

    class Meta:
        model = Source
        fields = ['id', 'authors']


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['name']


class ClaimSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    source_of_claim = SourceLinkSerializer(read_only=True)

    class Meta:
        model = Claim
        fields = ['id', 'claim_text', 'description', 'topic', 'source_of_claim']


class EvidenceReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvidenceReview
        fields = ['deduced_evidence_relationship', 'additional_comments']


class EvidenceSerializer(serializers.ModelSerializer):
    source_of_evidence = SourceSerializer(read_only=True)
    expert_consensus_relationship = serializers.SerializerMethodField()

    class Meta:
        model = Evidence
        fields = ['source_of_evidence', 'evidence_relationship', 'description', 'expert_consensus_relationship']

    def get_expert_consensus_relationship(self, obj: Evidence) -> EvidenceRelationship:
        topic_experts = obj.claim.topic.experts.all()
        expert_reviews = [review for review in obj.reviews.all() if review.reviewer in topic_experts]

        # If 80% of expert reviewers agree on an evidence relationship, return that. Otherwise, return 'SPLIT'.
        deduced_relationships_by_count = dict()
        num_expert_reviews = len(expert_reviews)
        num_required_for_80_pct_consensus = math.ceil(num_expert_reviews * 0.8)
        for review in expert_reviews:
            if review.deduced_evidence_relationship not in deduced_relationships_by_count:
                deduced_relationships_by_count[review.deduced_evidence_relationship] = 1
            else:
                deduced_relationships_by_count[review.deduced_evidence_relationship] += 1
        for relationship, count in deduced_relationships_by_count.items():
            if count >= num_required_for_80_pct_consensus:
                return relationship
        return EvidenceRelationship.SPLIT


class ClaimWithEvidenceSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)
    source_of_claim = SourceLinkSerializer(read_only=True)
    related_evidence = EvidenceSerializer(many=True, read_only=True)

    class Meta:
        model = Claim
        fields = ['id', 'claim_text', 'description', 'topic', 'source_of_claim', 'related_evidence']
