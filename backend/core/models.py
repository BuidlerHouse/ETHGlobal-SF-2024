from django.db import models

# Create your models here.
class CodeBlock(models.Model):
    name = models.CharField(max_length=100, default='', blank=True)
    wallet_address = models.CharField(max_length=100, default='', blank=True)
    code = models.TextField(default='', blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ViewModel(models.Model):
    class Meta:
        verbose_name = "Code Block View"
        verbose_name_plural = "Code Block Views"

    name = models.CharField(max_length=1)

    def __init__(self, *args, **kwargs):
        pass

    def __str__(self):
        return ""