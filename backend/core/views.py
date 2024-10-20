from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny
from .models import CodeBlock
from .serializers import CodeBlockSerializer

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from dstack_sdk import AsyncTappdClient, DeriveKeyResponse, TdxQuoteResponse
import asyncio
import os
class CodeBlockAPIView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        code_blocks = CodeBlock.objects.all().order_by('-created_at')
        serializer = CodeBlockSerializer(code_blocks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CodeBlockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RootAPIView(APIView):
    permission_classes = [AllowAny]

    async def async_get(self, request):
        endpoint = os.environ.get('TAPPD_SIMULATOR_URL', 'http://0.0.0.0:8090')
        client = AsyncTappdClient(endpoint)
        try:
            derive_key = await client.derive_key('/', 'test')
            assert isinstance(derive_key, DeriveKeyResponse)
            as_bytes = derive_key.toBytes()
            assert isinstance(as_bytes, bytes)
            limited_size = derive_key.toBytes(32)
            tdx_quote = await client.tdx_quote('test')

            return {
                "deriveKey": as_bytes.hex(),
                "derive_32bytes": limited_size.hex(),
                "tdxQuote": tdx_quote
            }
        except Exception as e:
            return {"error": str(e)}

    def get(self, request):
        return Response(asyncio.run(self.async_get(request)))

@csrf_exempt
@require_http_methods(["POST"])
def message_receive_http(request):
    print(f"IP: {request.META['REMOTE_ADDR']}, Headers: {request.headers}, Body: {request.body.decode('utf-8')}")      
    