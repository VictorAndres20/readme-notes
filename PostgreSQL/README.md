# install on Debian and Ubuntu
https://www.postgresql.org/download/linux/ubuntu/
https://www.postgresql.org/download/linux/debian/
https://linuxize.com/post/how-to-install-postgresql-on-debian-9/
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-9-4-on-debian-8

1. Get Repo

	1.1 FOR DEBIAN 9.x
		$ sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main"
		$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
		$ sudo apt-get update
	1.2 FOR UBUNTU 16.04
		$ sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main"
		$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
		$ sudo apt-get update

2. Install it
$ sudo apt-get update /** If you dont hit it */
$ sudo apt-get install postgresql-10 postgresql-client-10 postgresql-contrib-9.x pgadmin4
$ sudo service postgresql status

###############################################################################################################################

# Random UUID as ID primary key postgres v9
alter table my_table add uuid varchar(100) default gen_random_uuid();
alter table my_table add constraint table_pk_uui primary key(uuid);

###############################################################################################################################

# Upgrade PostgreSQL
https://stackoverflow.com/questions/46687645/upgrade-postgresql-from-9-6-to-10-0-on-ubuntu-16-10
https://www.postgresql.org/docs/9.5/app-pg-dumpall.html
https://stackoverflow.com/questions/24930923/postgresql-where-does-the-output-of-pg-dump-go

1. Enter as postgres user
$ sudo su - postgres

2. Make backup. Should save on /var/lib/postgresql Backup database $ pg_dump dbname > dbname.out
$ pg_dumpall > backup.out

3. exit postgres user
$ exit

4. install new version postgres
$ sudo apt-get update
$ sudo apt-get install postgresql-10

5. See custers
$ pg_lsclusters

EXAMPLE ON TERMINAL:
9.5 main    5432 online postgres /var/lib/postgresql/9.5/main /var/log/postgresql/postgresql-9.5-main.log
10  main    5433 online postgres /var/lib/postgresql/10/main  /var/log/postgresql/postgresql-10-main.log

6. Stop the 10 cluster and drop it, MAKE SURE THAT YOU DID PREVIOUS STEP TO KNOW WHO VERSION YOU ARE GOING TO STOP, this shuold be lasted:
$ sudo pg_dropcluster 10 main --stop

7. Stop postgres service
$ sudo systemctl stop postgresql 

8. Upgrade cluster
$ sudo pg_upgradecluster -m upgrade 9.5 main

9. Start postgres
$ sudo systemctl start postgresql

10. Se clusters again
$ pg_lsclusters

EXAMPLE ON TERMINAL:
9.5 main    5433 down   postgres /var/lib/postgresql/9.5/main /var/log/postgresql/postgresql-9.5-main.log
10  main    5432 online postgres /var/lib/postgresql/10/main  /var/log/postgresql/postgresql-10-main.log

11. Delete old cluster
$ sudo pg_dropcluster 9.5 main --stop

After this, /var/lib/postgresql/ only be the lasted version

###############################################################################################################################

# Enter to postgres on terminal

$ psql -h <host> -p <5900> -U <username>
$ psql -h localhost -p 5432 -U postgres

# psql commands
http://www.postgresqltutorial.com/psql-commands/

=# CREATE DATABASE <DB_NAME>;

\l -> List all databases
\c dbname -> Connect to Database
\d -> List all tables with id sequences
\dt -> List all tables on database
\d table_name -> Describe a table
\df -> List all functions on database
\sf function_name() -> See code of function
\q -> Exit

code with editor, \e -> code -> save -> close
\e

edit a function in the editor.
\ef function_name

###############################################################################################################################

# Create Database and specify user that you want to own the database

su - postgres
createdb -O <user> <dbname>

###############################################################################################################################

# Create user and give permissions on DB

$ su - postgres
$ createuser testuser

Acces the postgres Shell psql

alter user testuser with encrypted password 'passwd';
grant all privileges on database <database> to testuser;

###############################################################################################################################

# CREATE BACKUP

1. Enter as postgres user
$ sudo su - postgres

2. Make backup. Should save on /var/lib/postgresql
$ pg_dumpall > backup.out

# specific Database

1. Enter as postgres user
$ sudo su - postgres

2. Make backup. Should save on /var/lib/postgresql
$ pg_dump name_of_database > name_of_backup_file

###############################################################################################################################

# Set postgres password
$ sudo su - postgres
$ psql
$ \password postgres
ENTER PASSWORD
$\q

###############################################################################################################################

# Make psql -U postgres -p 5432 -W not enterautomatically
1. on vi /etc/postgresql/9.4/main/pg_hba.conf modify 'peer' to 'md5'
-#Database administrative login by Unix domain socket 
local   all             postgres 	md5
3. $ sudo /etc/init.d/postgresql restart

###############################################################################################################################

# Configure to access on remote machine
1. On /etc/postgresql/9.4/main/pg_hba.conf adding 0.0.0.0/0 for IPv4 and ::/0 IPv6
-# IPv4 local connections:
host    all             all             0.0.0.0/0               md5 # NEW
host    all             all             127.0.0.1/32            md5
-# IPv6 local connections:
host    all             all             ::/0                    md5 # NEW
host    all             all             ::1/128                 md5

2. On /etc/postgresql/9.4/main/postgresql.conf modify or uncomment
listen_addresses = '*'

3. on remote machine yo can access with
$ psql -h <IP> -U postgres -p 5432 -W
$ psql -h 170.239.76.132 -U postgres -p 5432 -W

###############################################################################################################################