from django.urls import path, include
from api import views

urlpatterns = [
    path('entities/', views.EntitiesList.as_view()),
    path('entities/<int:pk>', views.EntityDetail.as_view()),
    path('sources/', views.SourcesList.as_view()),
    path('sources/<int:pk>', views.SourceDetail.as_view()),
    path('claims/', views.ClaimsList.as_view()),
    path('claims/<int:pk>', views.ClaimDetail.as_view()),
    path('evidence/', views.EvidenceList.as_view()),
    path('evidence/<int:pk>', views.EvidenceDetail.as_view())
]