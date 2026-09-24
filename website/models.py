from django.db import models


class ContactLead(models.Model):
    OPERATION_CHOICES = [
        ("agricultura", "Agricultura"),
        ("ganaderia", "Ganadería"),
        ("acuicultura", "Acuicultura"),
        ("floricultura", "Floricultura"),
        ("invernaderos", "Invernaderos"),
        ("avicultura", "Avicultura"),
        ("otro", "Otro"),
    ]

    name = models.CharField("Nombre", max_length=120)
    company = models.CharField("Empresa / finca", max_length=160, blank=True)
    operation_type = models.CharField("Tipo de operación", max_length=30, choices=OPERATION_CHOICES)
    email = models.EmailField("Email")
    phone = models.CharField("Teléfono", max_length=40, blank=True)
    message = models.TextField("Mensaje", max_length=3000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contacto"
        verbose_name_plural = "Contactos"

    def __str__(self):
        return f"{self.name} · {self.get_operation_type_display()}"
