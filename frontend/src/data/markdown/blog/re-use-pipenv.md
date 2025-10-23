Some of us may have had the occasional urge to test out some code using an already existing virtual environment dependencies. The rule of the thumb is that we should always keep python projects concerns/dependencies separate from each other for well known reasons.

However, I have come across a situation where I just needed to try out some code without necessarily creating an entirely new virtual environment using Pipenv. Well it's easy as creating a `.venv` file in your new project and including in it the location of the virtual environment. This is the folder that holds the pipenv files and folders. It normally includes some hashed code at the end of the folder name. So your .venv file would have in it a line as shown below:

`C:\Users\User Name\.virtualenvs\Pipenvfolder-TVgiFkue`

Note: There are no quotes in the path.