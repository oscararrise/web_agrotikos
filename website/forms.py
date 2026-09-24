from django import forms
from .models import ContactLead


class ContactLeadForm(forms.ModelForm):
    class Meta:
        model = ContactLead
        fields = ["name", "company", "operation_type", "email", "phone", "message"]
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "Tu nombre", "autocomplete": "name"}),
            "company": forms.TextInput(attrs={"placeholder": "Empresa o finca"}),
            "operation_type": forms.Select(),
            "email": forms.EmailInput(attrs={"placeholder": "correo@empresa.com", "autocomplete": "email"}),
            "phone": forms.TextInput(attrs={"placeholder": "+57 ...", "autocomplete": "tel"}),
            "message": forms.Textarea(attrs={"placeholder": "¿Qué quieres medir, entender o automatizar?", "rows": 5}),
        }

    def clean_message(self):
        message = self.cleaned_data["message"].strip()
        if len(message) < 20:
            raise forms.ValidationError("Cuéntanos un poco más sobre el reto de tu operación.")
        return message
