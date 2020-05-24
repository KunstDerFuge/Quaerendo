from rest_framework import serializers
from api.models import Entity, Source, Claim, Evidence, EvidenceReview, Topic


class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        fields = ['name', 'description']


class SourceSerializer(serializers.ModelSerializer):
    authors = EntitySerializer(many=True, read_only=True)

    class Meta:
        model = Source
        fields = ['url', 'description', 'source_degree', 'authors', 'date_retrieved']


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['name']


class ClaimSerializer(serializers.ModelSerializer):
    topic = TopicSerializer(read_only=True)

    class Meta:
        model = Claim
        fields = ['id', 'claim_text', 'description', 'topic', 'source_of_claim']


class EvidenceReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvidenceReview
        fields = ['deduced_evidence_relationship', 'additional_comments']


class EvidenceSerializer(serializers.ModelSerializer):
    claim = ClaimSerializer(read_only=True)
    source_of_evidence = SourceSerializer(read_only=True)

    class Meta:
        model = Evidence
        fields = ['claim', 'source_of_evidence', 'evidence_relationship', 'description', 'is_expert_verified']
