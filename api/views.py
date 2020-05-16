from rest_framework import generics
from api.models import Entity, Source, Claim, Evidence
from api.serializers import EntitySerializer, SourceSerializer, ClaimSerializer, EvidenceSerializer


class EntitiesList(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting entities
    """
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer


class EntitiesDetail(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting entities
    """
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer


class SourcesList(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting sources
    """
    queryset = Source.objects.all()
    serializer_class = SourceSerializer


class ClaimsList(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting claims
    """
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer


class EvidenceList(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting claims
    """
    queryset = Evidence.objects.all()
    serializer_class = EvidenceSerializer

