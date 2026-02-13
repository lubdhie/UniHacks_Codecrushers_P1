from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Suggestion
from .serializers import SuggestionSerializer
from .permissions import IsHR

class SuggestionCreateView(generics.CreateAPIView):
    serializer_class = SuggestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(submitted_by=self.request.user)

class SuggestionListView(generics.ListAPIView):
    queryset = Suggestion.objects.all().order_by("-created_at")
    serializer_class = SuggestionSerializer
    permission_classes = [permissions.IsAuthenticated, IsHR]

class SuggestionRevealView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsHR]

    def post(self, request, pk):
        suggestion = get_object_or_404(Suggestion, pk=pk)

        suggestion.is_revealed = True
        suggestion.save()

        return Response({"message": "Suggestion revealed"})
