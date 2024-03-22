from django.apps import AppConfig


class EmailsConfig(AppConfig):
    name = 'apps.emails'

    def ready(self):
        from apps.emails import signals

