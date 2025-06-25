Working with a `Postgresql` database in `Django` is a well documented setup with a lot of good resources available online and in the docs.
Here is how I prefer to setup.

***Note: Basic security setup can be set as per preferences and is not discussed in detail.***

1.&nbsp;Login as the default database superuser and create a user with superuser privileges. I typically name the user the same name as my Django project. In the example below my Django project is called `dashboard`. Remember the password needs to be the same as the one you use for database password credentials in Django.

<Code language="sql">
    CREATE USER dashboard WITH PASSWORD 'secure123' SUPERUSER;
</Code>
<br>
2.&nbsp;Logout of the database and log in again with the new created user.
<br>
<br>
3.&nbsp;Create a database logged in as the new user. I typically name the database the name of my Django project then append db. So for instance if my Django project is called `dashboard` I would do;

<Code language="sql">
	CREATE DATABASE dashboarddb;
</Code>
This naming convention, which I also apply for schemas, just makes it easy for me to understand how things are organized when I interact with the database and clusters.
<br>
<br>
4.&nbsp;Then create a schema. I typically append ***schema*** to the name of my Django app

<Code language="sql">
CREATE SCHEMA dashboardschema;
</Code>
<br>
5.&nbsp;Edit the search path of the database user to ensure that the new schema is declared first since this is where most of the database objects such as tables will be stored by default. Also edit the default search path of the database to ensure this schema is always used first. This helps me keep different databases concerned isolated on the server based on their schemas. We enter these in one command as below;

<Code language="sql">
ALTER ROLE dashboard IN DATABASE dashboarddb SET search_path to dashboardschema,public,topology;
</Code>
Database objects are created in the dashboardschema first. Ensure to include any other schemas that any extensions you might use might come with eg `topology` in the search path above is included as it is the default schema for extension `postgis_topology`. I later move the `postgis_topology` extension to my default schema after installation.

In your database settings in Django you might have something similar to the one below; Note that the intended schemas are indicated under `"OPTIONS"` key.

<Code language="python">
  DATABASES = {
      "default": {
          "ENGINE": config("DB\_ENGINE"),
          "OPTIONS": {"options": "-c search_path=dashboardschema,topology,public"},
          ....other database connection settings
      }
  }
</Code>

6.&nbsp;Since I use `postgis` extension, it is installed by default in the `dashboardschema` since this is where the default database objects are stored. But for `postgis_topology`, I will install it first in its default schema, `topology` then move it later.
<Code language="sql">
CREATE EXTENSION postgis;
</Code>

7.&nbsp;Install the postgis_topology extension then move it to the new schema as explained [here](https://postgis.net/documentation/tips/tip-move-postgis-schema/#:~:text=Luckily%20there%20is%20a%20way,other%20PostgreSQL%20tool%20you%20want.)

<Code language="sql">
CREATE EXTENSION postgis_topology;
</Code>

<Code language="sql">
UPDATE pg\_extension
  SET extrelocatable = true
	WHERE extname = 'postgis\_topology';

ALTER EXTENSION postgis\_topology
  SET SCHEMA dashboardschema;

-- try to 'dummy' upgrade
ALTER EXTENSION postgis\_topology
  UPDATE TO "ANY";

-- then look for any updates
ALTER EXTENSION postgis\_topology UPDATE;
</Code>


Move any new extensions to the new default schema as above if they are not created there by default. Please note some extensions with interrelated functionality may need to be installed in the same schema for them to work correctly. Eg some geospatial extensions as explained [here](https://postgis.net/documentation/tips/tip-move-postgis-schema/#:~:text=Luckily%20there%20is%20a%20way,other%20PostgreSQL%20tool%20you%20want.) must always be installed in the same location/schema as postgis.

8.&nbsp;Since we created the `dashboardschema` as user `dashboard`, by default, we have all privileges granted on this schema. There is an implied `public` role in postgres which all new users inherit and it has some default access to some objects in a database. If you need to revoke this access of this implied `public` role from accessing the new schema at all, you can run the following command.
<Code language="sql">
REVOKE ALL ON SCHEMA dashboardschema FROM public;
</Code>
But I typically just revoke the ability of the implied `public` role from creating anything on the schema. This would allow another superuser to access the objects in the schema using the `SELECT` command.
<Code language="sql">
REVOKE CREATE ON SCHEMA dashboardschema FROM public;
</Code>

I also typically prevent the implied `public` role from creating objects in the default public schema;
<Code language="sql">
REVOKE CREATE ON SCHEMA public FROM public;
</Code>
<br>

For other Django projects, `rinse and repeat`.
