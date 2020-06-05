from django.urls import path, re_path

from api import views

urlpatterns = [
    path('entities/', views.EntitiesList.as_view()),
    path('entities/<int:pk>', views.EntityDetail.as_view()),
    path('sources/', views.SourcesList.as_view()),
    path('sources/<int:pk>', views.SourceDetail.as_view()),
    path('claims/', views.ClaimsList.as_view()),
    path('claims/<int:pk>', views.ClaimDetail.as_view()),
    path('evidence/reviews/', views.EvidenceReviewList.as_view()),
    path('evidence/reviews/<int:pk>', views.EvidenceReviewDetail.as_view()),
    path('evidence/', views.EvidenceList.as_view()),
    path('evidence/<int:pk>', views.EvidenceDetail.as_view()),
    re_path(r'^article/$', views.ArticleInfo.as_view()),
    re_path(r'^authors/$', views.AuthorNegotiation.as_view())
]
