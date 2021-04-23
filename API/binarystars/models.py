from django.db import models
import uuid
from datetime import datetime

# Create your models here.


class Attribute(models.Model):
    database_name = models.TextField(primary_key=True)
    display_name = models.TextField()
    enabled = models.BooleanField(default=True)

    class Meta:
        managed = True
        db_table = 'attributes'


def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" %
                    type(obj).__name__)


class ClusterQueue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    query = models.JSONField(editable=False)
    finished = models.BooleanField(default=False)
    response = models.JSONField(default=default)
    date_added = models.DateTimeField(auto_now_add=True, blank=True)
    error = models.BooleanField(default=False)

    class Meta:
        managed = True
        db_table = 'queue'


class BinaryStars(models.Model):
    file_id = models.IntegerField(blank=True, null=True)
    id = models.IntegerField(blank=True, null=True)
    tphys = models.FloatField(blank=True, null=True)
    kstar_1 = models.FloatField(blank=True, null=True)
    mass0_1 = models.FloatField(blank=True, null=True)
    mass_1 = models.FloatField(blank=True, null=True)
    lumin_1 = models.FloatField(blank=True, null=True)
    rad_1 = models.FloatField(blank=True, null=True)
    teff_1 = models.FloatField(blank=True, null=True)
    massc_1 = models.FloatField(blank=True, null=True)
    radc_1 = models.FloatField(blank=True, null=True)
    menv_1 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    renv_1 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    epoch_1 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    ospin_1 = models.FloatField(blank=True, null=True)
    deltam_1 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    rrol_1 = models.FloatField(blank=True, null=True)
    kstar_2 = models.FloatField(blank=True, null=True)
    mass0_2 = models.FloatField(blank=True, null=True)
    mass_2 = models.FloatField(blank=True, null=True)
    lumin_2 = models.FloatField(blank=True, null=True)
    rad_2 = models.FloatField(blank=True, null=True)
    teff_2 = models.FloatField(blank=True, null=True)
    massc_2 = models.FloatField(blank=True, null=True)
    radc_2 = models.FloatField(blank=True, null=True)
    menv_2 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    renv_2 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    epoch_2 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    ospin_2 = models.FloatField(blank=True, null=True)
    deltam_2 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    rrol_2 = models.FloatField(blank=True, null=True)
    porb = models.FloatField(blank=True, null=True)
    sep = models.FloatField(blank=True, null=True)
    ecc = models.FloatField(blank=True, null=True)
    b_0_1 = models.DecimalField(
        max_digits=50, decimal_places=20, blank=True, null=True)
    b_0_2 = models.DecimalField(
        max_digits=50, decimal_places=20, blank=True, null=True)
    snkick_1 = models.FloatField(blank=True, null=True)
    snkick_2 = models.FloatField(blank=True, null=True)
    vsys_final = models.FloatField(blank=True, null=True)
    sntheta_final = models.FloatField(blank=True, null=True)
    sn_1 = models.FloatField(blank=True, null=True)
    sn_2 = models.FloatField(blank=True, null=True)
    bin_state = models.SmallIntegerField(blank=True, null=True)
    merger_type = models.SmallIntegerField(blank=True, null=True)
    bin_num = models.SmallIntegerField(blank=True, null=True)
    time_id = models.BigIntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'binary_stars'


class InterpolatedBinaryStars(models.Model):
    file_id = models.IntegerField(blank=True, null=True)
    id = models.IntegerField(blank=True, null=True)
    tphys = models.FloatField(blank=True, null=True)
    kstar_1 = models.FloatField(blank=True, null=True)
    mass0_1 = models.FloatField(blank=True, null=True)
    mass_1 = models.FloatField(blank=True, null=True)
    lumin_1 = models.FloatField(blank=True, null=True)
    rad_1 = models.FloatField(blank=True, null=True)
    teff_1 = models.FloatField(blank=True, null=True)
    massc_1 = models.FloatField(blank=True, null=True)
    radc_1 = models.FloatField(blank=True, null=True)
    menv_1 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    renv_1 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    epoch_1 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    ospin_1 = models.FloatField(blank=True, null=True)
    deltam_1 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    rrol_1 = models.FloatField(blank=True, null=True)
    kstar_2 = models.FloatField(blank=True, null=True)
    mass0_2 = models.FloatField(blank=True, null=True)
    mass_2 = models.FloatField(blank=True, null=True)
    lumin_2 = models.FloatField(blank=True, null=True)
    rad_2 = models.FloatField(blank=True, null=True)
    teff_2 = models.FloatField(blank=True, null=True)
    massc_2 = models.FloatField(blank=True, null=True)
    radc_2 = models.FloatField(blank=True, null=True)
    menv_2 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    renv_2 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    epoch_2 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    ospin_2 = models.FloatField(blank=True, null=True)
    deltam_2 = models.DecimalField(
        max_digits=50, decimal_places=30, blank=True, null=True)
    rrol_2 = models.FloatField(blank=True, null=True)
    porb = models.FloatField(blank=True, null=True)
    sep = models.FloatField(blank=True, null=True)
    ecc = models.FloatField(blank=True, null=True)
    b_0_1 = models.DecimalField(
        max_digits=50, decimal_places=20, blank=True, null=True)
    b_0_2 = models.DecimalField(
        max_digits=50, decimal_places=20, blank=True, null=True)
    snkick_1 = models.FloatField(blank=True, null=True)
    snkick_2 = models.FloatField(blank=True, null=True)
    vsys_final = models.FloatField(blank=True, null=True)
    sntheta_final = models.FloatField(blank=True, null=True)
    sn_1 = models.FloatField(blank=True, null=True)
    sn_2 = models.FloatField(blank=True, null=True)
    bin_state = models.SmallIntegerField(blank=True, null=True)
    merger_type = models.SmallIntegerField(blank=True, null=True)
    bin_num = models.SmallIntegerField(blank=True, null=True)
    time_id = models.BigIntegerField(primary_key=True)

    class Meta:
        managed = True
        db_table = 'interpolated_binary_stars'
