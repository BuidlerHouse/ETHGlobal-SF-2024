from rest_framework import serializers
from .models import CodeBlock

class CodeBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeBlock
        fields = ['id', 'wallet_address', 'parent', 'code', 'token_id', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['children'] = CodeBlockSerializer(instance.children.all(), many=True).data
        return representation
