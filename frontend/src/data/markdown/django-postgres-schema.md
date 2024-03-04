Working with a `Postgres` database in `Django` is fairly an easy setup with good info in the docs.
However, here is my setup process when setting up a remote database for my `Django` projects using the *psql*  cli tool.

Basic security setup can be set as per preferences and is not discussed in detail.

1. login to your database instance as a superuser with the *psql* cli tool. We assume the DATABASE name for this example as `mydatabase`

2. create a database user(s) with the same name(s) as your Django project. Give the same password as
your  If your project is called Dashboard: 

<Code language="sql">
    CREATE USER dashboard WITH PASSWORD 'password123'
</Code>

The role will be created with login since the create user is similar to creating a role with a login access. ie `CREATE ROLE dashboard WITH LOGIN;` You can opt to create the user outside the psql with the create user utility to ensure better security when communicating with the database as discussed [here](https://phoenixnap.com/kb/postgres-create-user)

3. create schema(s) with the same name(s) as your app

<Code language="sql">
    CREATE SCHEMA dashboard
</Code>

4. revoke all privileges on the database from the implied `public` (Default) schema. This includes the default connect privilege that all created user have;

<Code language="sql">
    REVOKE ALL ON DATABASE mydatabase from public;
</Code>

55. *optional* create a role group called "apps" and give this role connect privilege
to the database. All user applications (using the database) can now have connect privilege to the database.

<Code language="sql">
	CREATE ROLE apps;
</Code>
<Code language="sql">
	GRANT CONNECT ON DATABASE nydatabse TO apps;
</Code>

6. Revoke the privileges of public schema from creating tables and other objects; Only superuser can create object on the database.

<Code language="sql">
	REVOKE ALL ON SCHEMA public FROM public;
</Code>

7. This should be done on specific schemas as created. We will expressly grant appropriate users the privileges later.

<Code language="sql">
	REVOKE ALL ON SCHEMA dashboard FROM public;
</Code>

8. *optional* Give the django project ( the user we created ) access to the schema name that matches the project.

<Code language="sql">
	REVOKE ALL ON SCHEMA dashboard TO dashboard;
</Code>

9. Set the `search path` for the django project (our database user here) to be limited to the specific schema that matches their access.

<Code language="sql">
	ALTER USER dashboard SET SEARCH_PATH to dashboard;
</Code>

*note: the first `dashoard` refers to the user (our app) while the second `dashoard` is the schema name*
	
10. Then grant all on privileges to the specific app schema to the user (app). Note, all business logic remains in the app code

<Code language="sql">
	GRANT ALL ON ALL TABLES IN SCHEMA dashboard TO dashboard
</Code>


11. Permanently add the new schemas to the search path of the superuser becausse by defaul they will not be included;

<Code language="sql">
	ALTER USER `superuser` SET SEARCH_PATH =  "$user",public,dashboard;
</Code>



For other django projects, `rinse and repeat`.
