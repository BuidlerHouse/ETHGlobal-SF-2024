from django.urls import path

from .views import CodeBlockAPIView, RootAPIView, message_receive_http

urlpatterns = [
    path('codeblocks/', CodeBlockAPIView.as_view()),
    path('tee/', RootAPIView.as_view()),
    path('webhook/', message_receive_http),
]
