from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny
from .models import CodeBlock
from .serializers import CodeBlockSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CodeBlockAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        code_blocks = CodeBlock.objects.all()
        serializer = CodeBlockSerializer(code_blocks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CodeBlockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
