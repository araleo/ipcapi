from rest_framework import serializers

from .models import IpcaData


class IpcaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = IpcaData
        fields = ['id', 'data', 'valor']
