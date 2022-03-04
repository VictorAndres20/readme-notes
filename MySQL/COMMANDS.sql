-- Connect
mysql -u USERNAME -p

-- Show Databases
show databases;

-- Create user
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

----------------------------------------------------------------------------------------

-- Show processlist

SHOW PROCESSLIST;

-- Show tables
SHOW TABLES;

-- Show db size
SELECT
    table_schema AS 'DB Name',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) AS 'DB Size in MB'
FROM
    information_schema.tables
GROUP BY
    table_schema;

-- Show db size Specifying db
-- in WHERE table_schema
SELECT
    table_schema AS 'DB Name',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) AS 'DB Size in MB'
FROM
    information_schema.tables
WHERE
    table_schema = 'db_name'
GROUP BY
    table_schema;


----------------------------------------------------------------------------------------

-- Exit
exit;


----------------------------------------------------------------------------------------