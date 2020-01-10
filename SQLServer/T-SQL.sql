-- DOESNT MATTER ';' AT END OF LINES
-- DOC
--https://docs.microsoft.com/en-us/sql/t-sql/statements/create-function-transact-sql?view=sql-server-2017
--#######################################################

--"AUTO_INCREMENT id"
CREATE TABLE Productos(
    idProducto INTEGER IDENTITY(1,1),
    Producto VARCHAR(30) NOT NULL,
    CONSTRAINT productos_pk PRIMARY KEY(idProducto)
);

--#######################################################

-- Simple hello world
BEGIN
    PRINT 'Hello world';
END;
GO

--#######################################################

-- Using varaibles
BEGIN
DECLARE @var1 VARCHAR(30), @var2 INTEGER, @var3 INTEGER;
    SET @VAR3=7;
    SET @var2=5;
    SET @VAR2=@VAR2+@VAR3;
    SET @var1='Hola'+' mundo '+CAST(@var2 as VARCHAR);
    PRINT @var1;
END;
GO

--#######################################################

-- IF STATEMENT
BEGIN
DECLARE @var2 INTEGER, @var3 INTEGER;
    SET @VAR3=7;
    SET @var2=5;
    IF(@var2<@var3)
    BEGIN
        PRINT '1';
    END;
    ELSE IF(@var2=@var3)
    BEGIN
        PRINT '2';
    END;
    ELSE
    BEGIN
        PRINT '3';
    END;
END;
GO

--#######################################################

-- Create PROCEDURES no params
CREATE OR ALTER PROCEDURE SP_HELLO
AS
BEGIN
     PRINT 'HELLO WORLD works';
END;
GO

-- Execute procedure
BEGIN
    exec SP_HELLO;
END;
GO

-- Create PROCEDURES WITH params
CREATE OR ALTER PROCEDURE SP_HELLO(@var1 VARCHAR(50),@var2 INTEGER)
AS
BEGIN
     PRINT @var1+'->'+CAST(@var2 AS VARCHAR);
END;
GO

-- Execute procedure WITH params
BEGIN
    exec SP_HELLO 'Hola',2;
END;
GO

--#######################################################
-- PROCEDURE RECOVERY SALDO EXAMPLE TALLER
CREATE OR ALTER PROCEDURE SP_RECOVERY_SALDO
AS
BEGIN
    DECLARE @codCuenta INTEGER,@newSal INTEGER,@actualSal INTEGER,@codType INTEGER;
    DECLARE cursor_cuentas CURSOR LOCAL
    FOR
    SELECT cod_cuenta FROM CUENTA; 
    OPEN cursor_cuentas;
    FETCH NEXT FROM cursor_cuentas INTO @codCuenta;
    WHILE(@@FETCH_STATUS = 0)
    BEGIN
        SET @newSal=0;
        DECLARE cursor_mov CURSOR LOCAL
        FOR
        SELECT val_movimiento,cod_t_movimiento FROM MOVIMIENTO WHERE cod_cuenta=@codCuenta AND val_movimiento>0 AND cod_t_movimiento<>3;
        OPEN cursor_mov;
        FETCH NEXT FROM cursor_mov INTO @actualSal, @codType;
        WHILE(@@FETCH_STATUS = 0)
        BEGIN
            IF(@codType=2 AND @actualSal<=@newSal)
            BEGIN
               SET @newSal=@newSal-@actualSal; 
            END;
            ELSE IF(@codType=1)
            BEGIN
               SET @newSal=@newSal+@actualSal; 
            END;
            FETCH NEXT FROM cursor_mov INTO @actualSal, @codType;
        END;
        CLOSE cursor_mov;
        --Important to delete cursor to create new one on iterate
        UPDATE CUENTA SET sal_cuenta = @newSal WHERE cod_cuenta=@codCuenta;
        DEALLOCATE cursor_mov;
        FETCH NEXT FROM cursor_cuentas INTO @codCuenta;
    END;  
    CLOSE cursor_cuentas;
END;
go
--EXEC
BEGIN
    EXEC SP_RECOVERY_SALDO;
END;

--#######################################################

-- Create function no param
CREATE OR ALTER FUNCTION SF_HELLO()
RETURNS VARCHAR(100)
AS
BEGIN
    DECLARE @var1 VARCHAR(100);
    SET @var1='Hello World';
    RETURN @var1;
END;
GO

-- Get function return value
BEGIN
    DECLARE @var1 VARCHAR(100);
    SET @var1= dbo.SF_HELLO();
    PRINT @var1;
END;
GO

-- Create function WITH param
CREATE OR ALTER FUNCTION SF_HELLO(@var1 VARCHAR(100),@var2 INTEGER)
RETURNS VARCHAR(100)
AS
BEGIN
    RETURN @var1+'->'+CAST(@var2 as VARCHAR);
END;
GO

-- Get function return value with param
BEGIN
    DECLARE @var1 VARCHAR(100);
    SET @var1= dbo.SF_HELLO('Hola',1);
    PRINT @var1;
END;
GO

--#######################################################

-- CURSORS

-- EXPLICIT CURSOR
BEGIN
    DECLARE cursor_cuenta CURSOR LOCAL 
        FOR
        SELECT CUENTA.nom_cuenta,CUENTA.sal_cuenta FROM CUENTA;
    DECLARE @saldo INTEGER, @nombre VARCHAR(40);
    OPEN cursor_cuenta;
    FETCH NEXT FROM cursor_cuenta INTO @nombre,@saldo;
    CLOSE cursor_cuenta;
    PRINT @nombre+'->'+CAST(@saldo as VARCHAR(10));
END;
GO

-- IMPLICIT CURSOR
BEGIN
    DECLARE @saldo INTEGER, @nombre VARCHAR(40);
    SELECT  @nombre=nom_cuenta,@saldo=sal_cuenta FROM CUENTA WHERE cod_cuenta=2;
    PRINT @nombre+'->'+CAST(@saldo as VARCHAR(10));
END;
GO

--#######################################################

-- WHILE loop on CURSOR
BEGIN
    DECLARE cursor_cuenta CURSOR LOCAL 
        FOR
        SELECT CUENTA.nom_cuenta,CUENTA.sal_cuenta FROM CUENTA;
    DECLARE @saldo INTEGER, @nombre VARCHAR(40);
    OPEN cursor_cuenta;
    FETCH NEXT FROM cursor_cuenta INTO @nombre,@saldo;
    WHILE @@FETCH_STATUS = 0 
    BEGIN
        PRINT @nombre+'->'+CAST(@saldo as VARCHAR(10));
        FETCH NEXT FROM cursor_cuenta INTO @nombre,@saldo;
    END;
    CLOSE cursor_cuenta;    
END;
GO

--#######################################################

-- Create Trigger
CREATE TRIGGER AI_MOVIMIENTO ON MOVIMIENTO
AFTER INSERT
AS
BEGIN
    DECLARE @newType INTEGER,@newVal INTEGER, @catualVal INTEGER,@newCod INTEGER,@nomCuenta VARCHAR(30);
    SELECT @newCod=INSERTED.cod_cuenta,@newType=INSERTED.cod_t_movimiento, @newVal=INSERTED.val_movimiento FROM INSERTED;
    SELECT @catualVal=CUENTA.sal_cuenta FROM CUENTA WHERE CUENTA.cod_cuenta=@newCod;
    --Desahabilitar trigger auditoria para UPDATE
    DISABLE TRIGGER AU_CUENTA ON CUENTA;
    IF(@newType=1 AND @newVal>0)
    BEGIN
        UPDATE CUENTA SET sal_cuenta=sal_cuenta+@newVal WHERE CUENTA.cod_cuenta=@newCod;
        PRINT 'Consignación';
    END;
    ELSE IF(@newType=2 AND @newVal>0 AND @catualVal>=@newVal)
    BEGIN
        UPDATE CUENTA SET sal_cuenta=sal_cuenta-@newVal WHERE CUENTA.cod_cuenta=@newCod;
        PRINT 'Retiro';
    END;
    ELSE IF(@newType=3 AND @newVal=0)
    BEGIN
        SELECT @nomCuenta=CUENTA.nom_cuenta, @catualVal=CUENTA.sal_cuenta FROM CUENTA WHERE CUENTA.cod_cuenta=@newCod;
        PRINT 'Consulta';
        PRINT @nomCuenta+'->'+CAST(@catualVal AS VARCHAR(20));
    END;
    ELSE
    BEGIN
        PRINT 'Transacción no válida';
    END;
    --habilitar trigger auditoria para UPDATE
    ENABLE TRIGGER AU_CUENTA ON CUENTA;
END;
GO

-- AUDI trigger
CREATE TRIGGER AU_CUENTA ON CUENTA
AFTER UPDATE
AS 
BEGIN
    DECLARE @newSal INTEGER, @oldSal INTEGER,@newCuenta INTEGER;
    SELECT @newSal=INSERTED.sal_cuenta,@oldSal=DELETED.sal_cuenta,@newCuenta=INSERTED.cod_cuenta 
    FROM INSERTED,DELETED;
    INSERT INTO AUDI_CUENTA VALUES(@newCuenta,@oldSal,@newSal,SYSTEM_USER,getdate(),CAST(CONNECTIONPROPERTY('client_net_address') AS VARCHAR(20)));
END;
GO

--#######################################################

--Disable And Enable Trigger
-- https://docs.microsoft.com/en-us/sql/t-sql/statements/enable-trigger-transact-sql?view=sql-server-2017
ALTER TABLE table_name DISABLE TRIGGER tr_name;
ALTER TABLE table_name ENABLE TRIGGER tr_name;

--#######################################################

-- Synonym
CREATE SYNONYM MyProduct  
FOR AdventureWorks2012.Production.Product;

--#######################################################

--Views
CREATE VIEW prod_inv AS
  SELECT products.product_id, products.product_name, inventory.quantity
  FROM products
  INNER JOIN inventory
  ON products.product_id = inventory.product_id
  WHERE products.product_id >= 1000;

-- Indexed (Materialized) Views
https://docs.microsoft.com/en-us/sql/relational-databases/views/create-indexed-views?view=sql-server-2017

--#######################################################

-- Index
-- Create a nonclustered index on a table or view
CREATE INDEX i1 ON t1 (col1);
GO

SELECT "FROM t1 WHERE col1=34;

--#######################################################