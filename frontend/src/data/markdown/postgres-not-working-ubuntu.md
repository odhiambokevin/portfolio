The way postgres installation for Ubuntu is set, there's no way to explicitly set the password for the default user `postgres`. You set the password after installation and it involves making changes to the `pg_hba.conf` file typically located in `/etc/postgresql/postgres_version/main`.

Find the line with the user `postgres` and change it from `peer` to `trust` eg.

> local     all     postgres        trust

Save the file then open a terminal and restart the postgres service by typing
`sudo systemctl restart postgresql`

Then connect using the psql client as user postgres.
`psql postgres postgres`

and alter the user `postgres` and include a password.

<Code language="sql">
    ALTER USER postgres PASSWORD 'mypassword'
</Code>

Go back to the `pg_hba.conf` file and change from `trust` to `md5`.

Restart the service again as before and proceed to connect to postgres.