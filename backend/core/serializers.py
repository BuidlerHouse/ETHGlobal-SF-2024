from rest_framework import serializers
from .models import CodeBlock
class CodeBlockSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    parent = serializers.CharField(required=False, allow_null=True)

    class Meta:
        model = CodeBlock
        fields = ['id', 'name', 'wallet_address', 'parent', 'code', 'token_id', 'created_at', 'updated_at', 'children']
        read_only_fields = ['created_at', 'updated_at', 'children']

    def get_children(self, obj):
        return [{'id': child.id, 'token_id': child.token_id} for child in obj.children.all()]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation
    
    def validate(self, data):
        parent = data.get('parent')
        if parent:
            try:
                parent_obj = CodeBlock.objects.get(token_id=parent)
                data['parent'] = parent_obj
            except CodeBlock.DoesNotExist:
                raise serializers.ValidationError("Parent with given token_id does not exist.")
        return data

    def create(self, validated_data):
        return super().create(validated_data)
