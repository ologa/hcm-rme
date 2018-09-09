from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer

from emr_core.models import Person, Patient, Address, IdentificationDocument, GeoLocation


class IdentificationDocumentSerializer(ModelSerializer):
    class Meta:
        model = IdentificationDocument
        exclude = ('person',)


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        exclude = ('person',)


class PersonSerializer(ModelSerializer):
    identification_documents = IdentificationDocumentSerializer(many=True)
    addresses = AddressSerializer(many=True)

    class Meta:
        model = Person
        fields = '__all__'


class PatientSerializer(ModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = Patient
        fields = '__all__'

    def create(self, validated_data):
        person_data = validated_data.pop('person')
        person = Person()
        person.name = person_data['name']
        person.surname = person_data['surname']
        person.gender = person_data['gender']
        person.age = person_data['age']
        person.date_of_birth = person_data['date_of_birth']
        person.save()

        patient = Patient()
        patient.identifier = validated_data.pop('identifier')
        patient.registration_date = validated_data.pop('registration_date')
        patient.person = person
        patient.save()

        return patient


class GeoLocationSerializer(ModelSerializer):
    class Meta:
        model = GeoLocation
        fields = '__all__'
