from django.db import models


class IpcaData(models.Model):
    data = models.DateField()
    valor = models.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        verbose_name = "IpcaData"
        verbose_name_plural = "IpcaData"

    def __str__(self) -> str:
        return f"{self.data} : {self.valor}"
