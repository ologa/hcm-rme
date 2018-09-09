from rest_framework.viewsets import ModelViewSet

from emr_core.models import Person, Patient, IdentificationDocument, Address
from emr_core.serializers import PersonSerializer, PatientSerializer, IdentificationDocumentSerializer, \
    AddressSerializer


class PersonViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class PatientViewSet(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class IdentificationDocumentViewSet(ModelViewSet):
    queryset = IdentificationDocument.objects.all()
    serializer_class = IdentificationDocumentSerializer


class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
