from django.urls import path

from .views import CodeBlockAPIView, RootAPIView

urlpatterns = [
    path('codeblocks/', CodeBlockAPIView.as_view()),
    path('tee/', RootAPIView.as_view()),
]
