from django.urls import path

from .views import CodeBlockAPIView

urlpatterns = [
    path('codeblocks/', CodeBlockAPIView.as_view()),
]
