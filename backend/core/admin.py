from django.contrib import admin

# Register your models here.
from .models import CodeBlock, ViewModel
from django.shortcuts import render

@admin.register(CodeBlock)
class CodeBlockAdmin(admin.ModelAdmin):
    list_display = ('wallet_address', 'code', 'created_at', 'updated_at')
    list_filter = ('wallet_address', 'created_at', 'updated_at')
    search_fields = ('wallet_address', 'code')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('wallet_address', 'name', 'parent', 'code')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ViewModel)
class ViewModelAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False
            
    def changelist_view(self, request, extra_context=None):
        from .models import CodeBlock
        code_blocks = CodeBlock.objects.all()
        relationships = []
        for block in code_blocks:
            if block.parent:
                relationships.append([block.parent.name, block.name])
        context = {
            'relationships': relationships
        }
        # Render the template
        return render(request, 'code.html', context)
