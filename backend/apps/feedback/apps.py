from django.apps import AppConfig

class EmailsConfig(AppConfig):
    name = 'apps.feedback'

    def ready(self):
        from apps.feedback import signals