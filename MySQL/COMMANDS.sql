-- Connect
mysql -u USERNAME -p

-- Show Databases
show databases;

-- Crear usuario
CREATE USER 'newuser'@'%' IDENTIFIED BY 'user_password'; -- 'Username'@'TYPE-ACCESS' localhost or IP or %
-- Grant privileges
--    ALL PRIVILEGES – grants all privileges to a user account.
--    CREATE – user account is allowed to create databases and tables.
--    DROP - user account is allowed to drop databases and tables.
--    DELETE - user account is allowed to delete rows from a specific table.
--    INSERT - user account is allowed to insert rows into a specific table.
--    SELECT – user account is allowed to read a database.
--    UPDATE - user account is allowed to update table rows.
-- GRANT permission1, permission2 ON database_name.table_name TO 'database_user'@'localhost';
GRANT ALL PRIVILEGES ON database_name.* TO 'database_user'@'localhost';

-- Use DB 
use DBNAME;

-- Show users
select user, host from mysql.user;

-- Drop user
DROP USER 'dbadmin'@'%';