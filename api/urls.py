from django.urls import path, include
from api import views

urlpatterns = [
    path('entities/', views.EntitiesList.as_view()),
    path('sources/', views.SourcesList.as_view()),
    path('claims/', views.ClaimsList.as_view()),
    path('evidence/', views.EvidenceList.as_view())
]