from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_projects),
    path('create/', views.create_project),
    path('<int:project_id>/decisions/', views.get_decisions),
    path('<int:project_id>/decisions/add/', views.add_decision),
    path('decision/<int:decision_id>/comment/', views.add_decision_comment),
    path('<int:project_id>/discord/', views.update_discord_link),
]
