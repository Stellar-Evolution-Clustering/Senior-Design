from rest_framework import serializers
from binarystars.models import BinaryStars, Attribute, InterpolatedBinaryStars, ClusterQueue


class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ('display_name', 'database_name')


class ClusterQueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClusterQueue
        fields = ('id', 'query', 'finished')


class BinaryStarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BinaryStars
        fields = ('file_id',
                  'id',
                  'tphys',
                  'kstar_1',
                  'mass0_1',
                  'mass_1',
                  'lumin_1',
                  'rad_1',
                  'teff_1',
                  'massc_1',
                  'radc_1',
                  'menv_1',
                  'renv_1',
                  'epoch_1',
                  'ospin_1',
                  'deltam_1',
                  'rrol_1',
                  'kstar_2',
                  'mass0_2',
                  'mass_2',
                  'lumin_2',
                  'rad_2',
                  'teff_2',
                  'massc_2',
                  'radc_2',
                  'menv_2',
                  'renv_2',
                  'epoch_2',
                  'ospin_2',
                  'deltam_2',
                  'rrol_2',
                  'porb',
                  'sep',
                  'ecc',
                  'b_0_1',
                  'b_0_2',
                  'snkick_1',
                  'snkick_2',
                  'vsys_final',
                  'sntheta_final',
                  'sn_1',
                  'sn_2',
                  'bin_state',
                  'merger_type',
                  'bin_num',
                  'time_id')


class InterpolatedBinaryStarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterpolatedBinaryStars
        fields = ('file_id',
                  'id',
                  'tphys',
                  'kstar_1',
                  'mass0_1',
                  'mass_1',
                  'lumin_1',
                  'rad_1',
                  'teff_1',
                  'massc_1',
                  'radc_1',
                  'menv_1',
                  'renv_1',
                  'epoch_1',
                  'ospin_1',
                  'deltam_1',
                  'rrol_1',
                  'kstar_2',
                  'mass0_2',
                  'mass_2',
                  'lumin_2',
                  'rad_2',
                  'teff_2',
                  'massc_2',
                  'radc_2',
                  'menv_2',
                  'renv_2',
                  'epoch_2',
                  'ospin_2',
                  'deltam_2',
                  'rrol_2',
                  'porb',
                  'sep',
                  'ecc',
                  'b_0_1',
                  'b_0_2',
                  'snkick_1',
                  'snkick_2',
                  'vsys_final',
                  'sntheta_final',
                  'sn_1',
                  'sn_2',
                  'bin_state',
                  'merger_type',
                  'bin_num',
                  'time_id')
