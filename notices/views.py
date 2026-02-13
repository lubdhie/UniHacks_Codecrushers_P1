from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Notice
from .serializers import NoticeSerializer
from .permissions import IsAdmin


class NoticeCreateView(generics.CreateAPIView):
    serializer_class = NoticeSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class NoticeListView(generics.ListAPIView):
    queryset = Notice.objects.all().order_by("-created_at")
    serializer_class = NoticeSerializer
    permission_classes = [permissions.IsAuthenticated]


class LatestNoticeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        latest_notice = Notice.objects.order_by("-created_at").first()

        if not latest_notice:
            return Response({"message": "No notices available"})

        serializer = NoticeSerializer(latest_notice)
        return Response(serializer.data)
