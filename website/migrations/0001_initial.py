from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ContactLead",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120, verbose_name="Nombre")),
                ("company", models.CharField(blank=True, max_length=160, verbose_name="Empresa / finca")),
                ("operation_type", models.CharField(choices=[("agricultura", "Agricultura"), ("ganaderia", "Ganadería"), ("acuicultura", "Acuicultura"), ("floricultura", "Floricultura"), ("invernaderos", "Invernaderos"), ("avicultura", "Avicultura"), ("otro", "Otro")], max_length=30, verbose_name="Tipo de operación")),
                ("email", models.EmailField(max_length=254, verbose_name="Email")),
                ("phone", models.CharField(blank=True, max_length=40, verbose_name="Teléfono")),
                ("message", models.TextField(max_length=3000, verbose_name="Mensaje")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"verbose_name": "Contacto", "verbose_name_plural": "Contactos", "ordering": ["-created_at"]},
        )
    ]
