from django.conf.urls import url
from django.urls import include
from rest_framework import routers

from emr_core.views import PersonViewSet, PatientViewSet, IdentificationDocumentViewSet, AddressViewSet

router = routers.DefaultRouter()
router.register(r'persons', PersonViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'identification-documents', IdentificationDocumentViewSet)
router.register(r'addresses', AddressViewSet)

app_name = "emr_core"

urlpatterns = [
    url(r'^', include(router.urls)),
]
