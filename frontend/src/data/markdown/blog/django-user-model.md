i'll give Spartan-degree laconic reply and explain briefly

`get_user_model good, AUTH_USER_MODEL safe`

 just know the limitations

 `get_user_model()` returns the current active user model, even if it is a custom one. however, it runs (since it's a function call) when the app using it is first imported. if used (called) in an app higher in the `INSTALLED_APPS` hierachy than the referenced user model (if it's a custom one), it might break the import.  you are referencing a non-existent user model aka *it has not been imported*. eg using it in a `books` app that refences a user in custom user model in a `users` app with `INSTALLED_APPS` in your ***settings.py*** looking as below;

 <Code language="python">
    INSTALLED_APPS = [
        '..',         # base django apps
        'books',       # get_user_model() used here
        'categories',
        'users',
    ]
 </Code>

you can see that at the time `get_user_model()` is called in the `books` app, it is referencing an app, `users`, that, in order of the hierarchy of imports in Django, has yet to be imported. this can break the import and the whole code. 

`AUTH_USER_MODEL` will always delay the import of the user model specified untill all models (model classes) have been imported. the only catch here is if the custom user model define in the `AUTH_USER_MODEL` in the ***settings.py*** file is changed and the foreign key field references a field that does not exist in the defined model.

 the two are imported as below;

*get_user_model*

<Code language="python">
    from django.db import models
    from django.contrib.auth import get_user_model
    User=get_user_model()
    # Create your models here.

    class Book(models.Model):
        author = models.ForeignKey(User, on_delete=models.CASCADE)
</Code>

*AUTH_USER_MODEL*

<Code language="python">
    from django.conf import settings
    from django.db import models
    
    class Book(models.Model):
        author = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
</Code>