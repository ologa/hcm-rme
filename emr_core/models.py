from django.db import models


class Person(models.Model):
    MALE = 'M'
    FEMALE = 'F'
    GENDER_CHOICES = (
        (MALE, 'Masculino'),
        (FEMALE, 'Femenino')
    )
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    age = models.PositiveIntegerField()
    date_of_birth = models.DateField()
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1)

    def __str__(self):
        return '%s %s' % (self.name, self.surname)


class GeoLocation(models.Model):
    COUNTRY = 'country'
    PROVINCE = 'province'
    DISTRICT = 'district'
    ADMINISTRATIVE_POST = 'administrative-post'
    LOCALITY = 'locality'

    GEO_LOCATION_TYPE_CHOICES = (
        (COUNTRY, 'Pais'),
        (PROVINCE, 'Provincia'),
        (DISTRICT, 'Distrito'),
        (ADMINISTRATIVE_POST, 'Posto Administrativo'),
        (LOCALITY, 'Localidade'),
    )
    code = models.CharField(max_length=10)
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('self', on_delete=models.PROTECT, null=True, blank=True)
    type = models.CharField(choices=GEO_LOCATION_TYPE_CHOICES, max_length=20)

    class Meta:
        db_table = 'geo_location'

    def __str__(self):
        return self.code + ' - %s' % self.name


class Address(models.Model):
    neighborhood = models.CharField(max_length=50)
    street = models.CharField(max_length=100)
    house_number = models.PositiveIntegerField()
    cell = models.CharField(max_length=2)
    block = models.CharField(max_length=4)
    person = models.ForeignKey(Person, on_delete=models.PROTECT, related_name='addresses')
    locality = models.ForeignKey(GeoLocation, on_delete=models.PROTECT)

    def __str__(self):
        return self.person.__str__()


class IdentificationDocument(models.Model):
    ID = 'ID'
    PASSPORT = 'PASSPORT'

    DOC_TYPE_CHOICES = (
        (ID, 'B.I'),
        (PASSPORT, 'Passaport')
    )

    person = models.ForeignKey(Person, on_delete=models.PROTECT, related_name='identification_documents')
    number = models.CharField(max_length=50)
    issue_date = models.DateField(blank=True)
    expiry_date = models.DateField(blank=True)
    type = models.CharField(choices=DOC_TYPE_CHOICES, max_length=20)

    class Meta:
        db_table = 'identification_document'

    def __str__(self):
        return '%s %s - %s' % (self.type, self.number, self.person.__str__())


class Patient(models.Model):
    identifier = models.CharField(max_length=50)
    person = models.ForeignKey(Person, on_delete=models.PROTECT)
    registration_date = models.DateTimeField()

    def __str__(self):
        return self.identifier + ' - %s' % self.person.__str__()
