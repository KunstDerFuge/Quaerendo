from drf_spectacular.utils import extend_schema
from newspaper import Article
from rest_framework import generics
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Entity, Source, Claim, Evidence, EvidenceReview
from api.serializers import EntitySerializer, SourceSerializer, ClaimSerializer, EvidenceSerializer, \
    ClaimWithEvidenceSerializer, EvidenceReviewSerializer


@extend_schema(operation_id='api_article_info', methods=['GET'])
class ArticleInfo(APIView):
    """
    Takes a URL, checks if this is an article, and if so, returns parsed metadata
    """

    def get(self, request):
        article_url = request.query_params.get('url')
        article = Article(article_url)
        article.download()
        article.parse()
        article.nlp()
        return Response({
            'summary': article.summary,
            'authors': article.authors,
            'title': article.title,
            'date_published': article.publish_date
        })


class AuthorNegotiation(APIView):
    """
    Takes a list of author names, gets or creates a list of matching Entities and returns them.
    """

    def get(self, request: Request):
        authors = request.query_params.getlist('authors')
        print(authors)


class EntitiesList(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting entities
    """
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer


@extend_schema(operation_id='api_entity_detail', methods=['GET'])
class EntityDetail(generics.RetrieveUpdateAPIView):
    """
    REST endpoints for viewing and modifying individual entities
    """
    queryset = Entity.objects.all()
    serializer_class = EntitySerializer


class SourcesList(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting sources
    """
    queryset = Source.objects.all()
    serializer_class = SourceSerializer


@extend_schema(operation_id='api_source_detail', methods=['GET'])
class SourceDetail(generics.RetrieveUpdateAPIView):
    """
    REST endpoints for viewing and modifying individual sources
    """
    queryset = Source.objects
    serializer_class = SourceSerializer


class ClaimsList(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting claims
    """
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer


@extend_schema(operation_id='api_claim_detail', methods=['GET'])
class ClaimDetail(generics.RetrieveUpdateAPIView):
    """
    REST endpoints for viewing and modifying individual claims
    """
    queryset = Claim.objects.all()
    serializer_class = ClaimWithEvidenceSerializer


class EvidenceList(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting claims
    """

    queryset = Evidence.objects.all()
    serializer_class = EvidenceSerializer


@extend_schema(operation_id='api_evidence_detail', methods=['GET'])
class EvidenceDetail(generics.RetrieveUpdateAPIView):
    """
    REST endpoints for viewing and modifying individual pieces of evidence
    """
    queryset = Evidence.objects.all()
    serializer_class = EvidenceSerializer


class EvidenceReviewList(generics.ListCreateAPIView):
    """
    REST endpoints for viewing and submitting evidence reviews
    """

    queryset = EvidenceReview.objects.all()
    serializer_class = EvidenceReviewSerializer


@extend_schema(operation_id='api_evidence_review_detail', methods=['GET'])
class EvidenceReviewDetail(generics.RetrieveUpdateAPIView):
    """
    REST endpoints for viewing and modifying individual evidence reviews
    """
    queryset = EvidenceReview.objects.all()
    serializer_class = EvidenceReviewSerializer
