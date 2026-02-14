


from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import Project
from .models import Decision
from .serializers import ProjectSerializer, DecisionSerializer, DecisionCommentSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_project(request):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data)
    return Response(serializer.errors)






@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_decision(request, project_id):
    serializer = DecisionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(project_id=project_id, decided_by=request.user)
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_decisions(request, project_id):
    decisions = Decision.objects.filter(project_id=project_id)
    serializer = DecisionSerializer(decisions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_decision_comment(request, decision_id):
    serializer = DecisionCommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(decision_id=decision_id, user=request.user)
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_discord_link(request, project_id):
    project = Project.objects.get(id=project_id)
    project.discord_invite_link = request.data.get("discord_invite_link")
    project.save()
    return Response({"message": "Discord link updated"})

