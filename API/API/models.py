# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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
    menv_1 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    renv_1 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    epoch_1 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    ospin_1 = models.FloatField(blank=True, null=True)
    deltam_1 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    rrol_1 = models.FloatField(blank=True, null=True)
    kstar_2 = models.FloatField(blank=True, null=True)
    mass0_2 = models.FloatField(blank=True, null=True)
    mass_2 = models.FloatField(blank=True, null=True)
    lumin_2 = models.FloatField(blank=True, null=True)
    rad_2 = models.FloatField(blank=True, null=True)
    teff_2 = models.FloatField(blank=True, null=True)
    massc_2 = models.FloatField(blank=True, null=True)
    radc_2 = models.FloatField(blank=True, null=True)
    menv_2 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    renv_2 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    epoch_2 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    ospin_2 = models.FloatField(blank=True, null=True)
    deltam_2 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    rrol_2 = models.FloatField(blank=True, null=True)
    porb = models.FloatField(blank=True, null=True)
    sep = models.FloatField(blank=True, null=True)
    ecc = models.FloatField(blank=True, null=True)
    b_0_1 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    b_0_2 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
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