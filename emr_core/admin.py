from django.contrib import admin

# Register your models here.
from emr_core.models import Person, Patient, Address, IdentificationDocument, GeoLocation


class PersonAdmin(admin.ModelAdmin):
    search_fields = ('name', 'surname')


class PatientAdmin(admin.ModelAdmin):
    search_fields = ('person', 'identifier')


class IdentificationDocumentAdmin(admin.ModelAdmin):
    search_fields = ('number', 'type', 'person')
    list_display = ('type', 'number', 'person', 'issue_date', 'expiry_date')


class AddressAdmin(admin.ModelAdmin):
    search_fields = ('locality', 'person', 'house_number', 'street')
    list_display = ('locality', 'neighborhood', 'street', 'house_number', 'person')


class GeoLocationAdmin(admin.ModelAdmin):
    search_fields = ('code', 'name')
    list_display = ('code', 'name', 'parent')


admin.site.register(Person, PersonAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(IdentificationDocument, IdentificationDocumentAdmin)
admin.site.register(GeoLocation, GeoLocationAdmin)
