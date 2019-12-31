-- CREATE A NEW USER TO ACCESS
1. Create Login
CREATE LOGIN safacturacion WITH PASSWORD='Facturacion123*';
GO

2. Create User with db_owner privileges
USE DATABASE_name;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name=N'safacturacion')
BEGIN
    CREATE USER [safacturacion] FOR LOGIN [safacturacion];
    EXEC sp_addrolemember N'db_owner',N'safacturacion';
END;
GO

-- ##################################################################################

-- Sequences
CREATE SEQUENCE [dbo].[SequenceCounter]
 AS INT
 START WITH 1
 INCREMENT BY 1;
GO
--INSERTS
INSERT INTO Cars2 VALUES (NEXT VALUE FOR [dbo].[SequenceCounter], '208', 'Peugeot', 5400)
INSERT INTO Cars2 VALUES (NEXT VALUE FOR [dbo].[SequenceCounter], 'C500', 'BMW', 8000)
INSERT INTO Cars2 VALUES (NEXT VALUE FOR [dbo].[SequenceCounter], 'C500', 'Peugeot', 5400)

-- DEFAULT SEQUENCES
CREATE SEQUENCE seq_productos
AS INTEGER
START WITH 1
INCREMENT BY 1;
GO
-- Tabla Productos
CREATE TABLE Productos(
    idProducto INTEGER DEFAULT (NEXT VALUE FOR seq_productos),
    Producto VARCHAR(30) NOT NULL,
    CONSTRAINT productos_pk PRIMARY KEY(idProducto)
);
GO

--To reset a specific sequence using a SQL Statement
ALTER SEQUENCE [schema].[sequencename] RESTART WITH [new value]; 

-- ##################################################################################