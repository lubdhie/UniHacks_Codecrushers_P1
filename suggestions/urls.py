from django.urls import path
from .views import (
    SuggestionCreateView,
    SuggestionListView,
    SuggestionRevealView,
)

urlpatterns = [
    path("", SuggestionCreateView.as_view()),   
    path("all/", SuggestionListView.as_view()), 
    path("<uuid:pk>/reveal/", SuggestionRevealView.as_view()),
]
