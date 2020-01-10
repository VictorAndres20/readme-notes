# IF ELSIF ELSE statement

DECLARE
    -- DECLARAR VARIABLES
    obj1 PACIENTE%ROWTYPE;
    cod NUMBER(11);
    maxCod PACIENTE.cod_paciente%TYPE;
BEGIN
    cod:=:Codigo;
    SELECT MAX(PACIENTE.cod_paciente) INTO maxCod FROM PACIENTE;
    IF cod<=0 OR cod>=maxCod THEN
        DBMS_OUTPUT.PUT_LINE('El código ingresado se excede de los posibles.');
    ELSE
        SELECT * INTO obj1 FROM PACIENTE WHERE PACIENTE.cod_paciente=cod;
        DBMS_OUTPUT.PUT_LINE('Nombre:' || obj1.nom_paciente || ' Celular:' || obj1.celular_paciente || ' Correo:' || obj1.correo_paciente);
    END IF; 

    -- Manejo de Excepcion NO_DATA_FOUND
    EXCEPTION 
        WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('El código ' || cod || ' no existe.');
END;

##############################################################################################

# Transfer Control with goto xy

DECLARE
    var1 NUMBER:=:Dato;
BEGIN
    IF(var1>7) THEN
        goto proceso3;
    ELSIF(var1<7) THEN
        goto proceso1;
    ELSE
        goto proceso2;
    END IF;
<<proceso1>>
    DBMS_OUTPUT.PUT_LINE('Soy el proceso 1');
<<proceso2>>
    DBMS_OUTPUT.PUT_LINE('Soy el proceso 2');
<<proceso3>>
    DBMS_OUTPUT.PUT_LINE('Soy el proceso 3');
END;

##############################################################################################

# Create Stored Procedure

CREATE OR REPLACE PROCEDURE SP_print(cadena VARCHAR2)
IS
BEGIN
    DBMS_OUTPUT.PUT_LINE(cadena);
END;

##############################################################################################

# Create Stores functions

create or replace FUNCTION SF_pow2(n NUMBER)
RETURN varchar
IS
BEGIN
    return(n*n);
END;

##############################################################################################

# Recursive function

CREATE OR REPLACE FUNCTION SF_FACTORIALR(x NUMBER)
RETURN NUMBER
IS
BEGIN
    IF(x=0) THEN
        return 1;
    ELSE
        return(x*SF_FACTORIALR(x-1));
    END IF;
END;

##############################################################################################

# EXCEPTIONS
--EXAMPLE1
DECLARE
--...
BEGIN
--..
EXCEPTION 
    WHEN NO_DATA_FOUND THEN
        SP_PRINT('No existe el usuario con la cédula ' || id_user);
    WHEN DUP_VAL_ON_INDEX THEN
        SP_PRINT('Error en registro, PRIMARY KEY repetida');
END;

--EXAMPLE2
DECLARE
   resultado NUMBER;
BEGIN
  SELECT 1/0 INTO resultado FROM DUAL;
EXCEPTION
  WHEN OTHERS THEN
     SP_PRINT_ERROR(50);
END;

--Create OWN Exception
DECLARE
MY_EXCEPTION EXCEPTION;
BEGIN
    FOR i in 1..10 LOOP
        IF(i=5) THEN
            RAISE MY_EXCEPTION;
        END IF;
        DBMS_OUTPUT.PUT_LINE(i);
    END LOOP;
EXCEPTION
    WHEN MY_EXCEPTION THEN
        DBMS_OUTPUT.PUT_LINE('Número 5');
END;

--Procedure Print Error Message
CREATE OR REPLACE PROCEDURE SP_PRINT_ERROR(CODE NUMBER)
IS
BEGIN
     DBMS_OUTPUT.PUT_LINE(SQLERRM(CODE));
END;
--Print Error Message
DECLARE
   resultado NUMBER;
BEGIN
  SELECT 1/0 INTO resultado FROM DUAL;
EXCEPTION
  WHEN OTHERS THEN
     SP_PRINT_ERROR(SQLCODE);
END;

##############################################################################################

# Use of CURSOR With FOR

DECLARE
    --Obtenemos el registro
    CURSOR c_users IS SELECT * FROM USERS;
    counter NUMBER:=0;
BEGIN
    SP_PRINT('Lista de usuarios:');
    FOR user_c in c_users LOOP 
      counter := counter + 1; 
      DBMS_OUTPUT.PUT_LINE(counter||'-> Usuario: ' || user_c.nom_user||' Cedula: '||user_c.cc_user); 
   END LOOP;
END;

##############################################################################################

# Use of CURSOR With LOOP, OPEN, CLOSE

create or replace PROCEDURE SP_VAL_X_VEN_PAGO_DADA(pago NUMBER)
IS
    CURSOR cursor_val_fact IS SELECT nom_f_pago, nom_vendedor,SUM(val_factura) AS total FROM VENDEDOR,CLIENTE,FACTURA,F_PAGO WHERE CLIENTE.cod_f_pago=F_PAGO.cod_f_pago AND VENDEDOR.cod_vendedor=CLIENTE.cod_vendedor AND FACTURA.cod_cliente = CLIENTE.cod_cliente AND F_PAGO.cod_f_pago=pago GROUP BY(nom_vendedor,nom_f_pago);
    registro cursor_val_fact%ROWTYPE;
BEGIN
    OPEN cursor_val_fact;
    LOOP
        FETCH cursor_val_fact INTO registro;
        EXIT WHEN cursor_val_fact%NOTFOUND;
        SP_PRINT(registro.nom_vendedor||' ->'|| registro.nom_f_pago ||' -> '|| registro.total);
    END LOOP;
    CLOSE cursor_val_fact;
END;

##############################################################################################

# LOOP use

DECLARE 
    x NUMBER:=10;
BEGIN
    LOOP
        IF(x<1) THEN
            exit;
        END IF;
        SP_PRINT(x);
        x:=x-1;
    END LOOP;
END;

##############################################################################################

# WHILE use

DECLARE 
    x NUMBER:=99;
BEGIN
    WHILE(x>0) LOOP
        SP_PRINT(x);      
        x:=x-2;
    END LOOP;
END;

##############################################################################################

# FOR use

CREATE OR REPLACE PROCEDURE SP_FACTORIAL(n NUMBER)
IS
    acum NUMBER:=1;
BEGIN
   FOR c IN REVERSE 1 .. n LOOP
        acum:=acum*c;
   END LOOP;
   SP_PRINT(acum);
END;

##############################################################################################

# VARRAYs

# Create type array to use it on return functions

CREATE Or REPLACE TYPE arrayOfNumbers AS VARRAY(n) OF NUMBER;

# OR Use ir directly

Type arrayOfNumbers IS VARRAY(n) OF INTEGER;

# USE IT

DECLARE
    numbers arrayOfNumbers:=arrayOfNumbers(n);
    numbers arrayOfNumbers:=arrayOfNumbers(1,2,3,4..n);
BEGIN
    -- numbers.extends;
    numbers(1):=1;

##############################################################################################

# RETURN a <<TABLE>> from a SF FUNCTION
https://renenyffenegger.ch/notes/development/databases/Oracle/PL-SQL/collection-types/return-table-from-function/index

1.  create a record type

CREATE OR REPLACE TYPE TABLE_RECORD AS OBJECT(
i NUMBER,
n NUMBER
);

2. Create table type to use like array or container of record type 

CREATE OR REPLACE TYPE TABLE_TABLE_RECORD AS TABLE OF TABLE_RECORD;

3. Return it or use it on Function

create or replace FUNCTION SF_DEC_BIN(d NUMBER)
RETURN TABLE_TABLE_RECORD
IS
    -- Dclarar variable de tipo ARRAY
    arrayBin TABLE_TABLE_RECORD;
BEGIN
    -- Llamar a constructor ARRAY
    arrayBin:=TABLE_TABLE_RECORD();
    -- Añadir un nuevo dato,
    -- Primero se extiende el tamanio
    -- Luego se agrega
    arrayBin.extend; 
    arrayBin(arrayBin.count):=TABLE_RECORD(1, d);
    
    -- Retornar tabla con la solucion
    return arrayBin;
END;

##############################################################################################

# Packages
his have two essential parts

# ESPECIFICACION

-- ESPECIFICACION Pakcage
CREATE OR REPLACE PACKAGE PKG_PAQUETACO
IS
    PROCEDURE P_PRINT(cadena VARCHAR2);
    FUNCTION F_SUMAR(n1 NUMBER, n2 NUMBER) RETURN NUMBER;
END PKG_PAQUETACO;


# BODY

-- BODY Package
CREATE OR REPLACE PACKAGE BODY PKG_PAQUETACO
IS
    PROCEDURE P_PRINT(cadena VARCHAR2)
    IS
    BEGIN
        DBMS_OUTPUT.PUT_LINE(cadena);
    END;

    FUNCTION F_SUMAR(n1 NUMBER, n2 NUMBER)
    RETURN NUMBER
    IS
    BEGIN
        RETURN (n1+n2);
    END;
END PKG_PAQUETACO;

# uSO DEL PAQUETE COMO UN OBJETO

--EXCEUTE PAKCAGE
BEGIN
    PKG_PAQUETACO.P_PRINT(PKG_PAQUETACO.F_SUMAR(1,2));
END;

##############################################################################################

# Package with cursor explicit

-- ###
-- Specification
-- ###
CREATE OR REPLACE PACKAGE PACK_VENTAS
IS
    CURSOR cursor_vxvxfp(pago_given NUMBER)
    IS
    SELECT VENDEDOR.nom_vendedor AS nombre, SUM(FACTURA.val_factura) AS total
    FROM F_PAGO,FACTURA,CLIENTE,VENDEDOR
    WHERE F_PAGO.cod_f_pago=pago_given AND FACTURA.cod_cliente=CLIENTE.cod_cliente AND CLIENTE.cod_f_pago=F_PAGO.cod_f_pago AND CLIENTE.cod_vendedor=VENDEDOR.cod_vendedor
    GROUP BY VENDEDOR.nom_vendedor;
    FUNCTION F_VXVXFP(codPago NUMBER) RETURN VARCHAR2;
END PACK_VENTAS;

-- #####
-- Body
-- #####
CREATE OR REPLACE PACKAGE BODY PACK_VENTAS
IS
    FUNCTION F_VXVXFP(codPago NUMBER)
    RETURN VARCHAR2
    IS
        res VARCHAR2(100):=NULL;
    BEGIN
        FOR registro IN cursor_vxvxfp(codPago)
        LOOP
             res:=res||registro.nombre||' -> '||registro.total||chr(10);
        END LOOP;
        return res;
    END;
END PACK_VENTAS;

-- #######
-- Use it
-- #######
BEGIN
    SP_PRINT(PACK_VENTAS.F_VXVXFP(:F_PAGO));
END;

# Other example, data recovery

-- #####
-- Specification
-- #####

create or replace PACKAGE PACK_RECOVERY_SALDO
IS
    totalCuentas NUMBER;
    CURSOR cursorMov(codCuenta NUMBER) 
    IS
    SELECT movimiento.val_movimiento AS valor,movimiento.cod_t_movimiento AS tipo 
    FROM movimiento
    WHERE cod_cuenta=codCuenta AND movimiento.val_movimiento>0;
    CURSOR cursorCuenta
    IS
    SELECT cod_cuenta FROM CUENTA;
    PROCEDURE P_RECOVERY;
END PACK_RECOVERY_SALDO;

-- #####
-- BODY
-- #####

create or replace PACKAGE BODY PACK_RECOVERY_SALDO
IS
    PROCEDURE P_RECOVERY
    IS
        newSaldo CUENTA.sal_cuenta%TYPE;
    BEGIN
        FOR c IN cursorCuenta LOOP
            newSaldo:=0;
            FOR registro IN cursorMov(c.cod_cuenta) LOOP
                IF(registro.tipo=2 AND newSaldo>registro.valor) THEN                    
                    newSaldo:=newSaldo-registro.valor;                    
                ELSIF(registro.tipo=1) THEN
                    newSaldo:=newSaldo+registro.valor;
                END IF;
            END LOOP; 
            UPDATE cuenta SET sal_cuenta=newSaldo WHERE cod_cuenta=c.cod_cuenta;  
        END LOOP;
    DBMS_OUTPUT.PUT_LINE('DATOS RECUPERADOS');
    END;
END PACK_RECOVERY_SALDO;

##############################################################################################

# Create sequences

--Secuencia 1
CREATE SEQUENCE sequencef
MINVALUE 2
MAXVALUE 20
INCREMENT BY 2
START WITH 10
ORDER;

--Secuencia 2
CREATE SEQUENCE sequence2
MINVALUE 2
MAXVALUE 20
START WITH 10
ORDER
INCREMENT BY 2
NOCACHE
CYCLE;

--Get current value
SELECT sequence2.CURRVAL FROM DUAL;

--Get next value of a sequence
SELECT sequence2.NEXTVAL INTO next FROM DUAL;
--Some eample
declare
next NUMBER;
current NUMBER;
begin
SELECT sequence2.NEXTVAL INTO next FROM DUAL;
SELECT sequence2.CURRVAL INTO current FROM DUAL;
dbms_output.put_line(current);
end;

##############################################################################################

# Create TRIGGER

CREATE OR REPLACE TRIGGER AI_MOVIMIENTO
AFTER INSERT ON MOVIMIENTO
FOR EACH ROW
BEGIN
    IF(:NEW.cod_t_movimiento = 1) THEN
        UPDATE CUENTA
        SET sal_cuenta=sal_cuenta+:NEW.val_movimiento
        WHERE cod_cuenta=:NEW.cod_cuenta;
    END IF;
END;

--Create TRIGGER for adding sequence

CREATE OR REPLACE TRIGGER BI_MOVIMIENTO
AFTER INSERT ON MOVIMIENTO
FOR EACH ROW
BEGIN
    SELECT sequencef.NEXTVAL INTO :NEW.codigo FROM DUAL;
END;

##############################################################################################

# SYNINYMS

-- Crear tabla
CREATE TABLE DELINCUENTE(
cod_delincuente NUMBER,
nom_delincuente VARCHAR2(50),
del_delincuente VARCHAR2(50),
CONSTRAINT delincuente_pk PRIMARY KEY(cod_delincuente)
);

-- Inserts
BEGIN
    INSERT INTO DELINCUENTE VALUES(1,'Samuel Moreno','Ladrón');
    INSERT INTO DELINCUENTE VALUES(2,'PAblo Escobar','Narcotraficante');
    INSERT INTO DELINCUENTE VALUES(3,'Pablo Urdinola','Testaferro');
    INSERT INTO DELINCUENTE VALUES(4,'Jorge Briceño','Guerrillero');
END;

-- Select
SELECT * FROM DELINCUENTE;

-- Crear sinónimo
CREATE SYNONYM ZAPATOS FOR DELINCUENTE;

-- Select using synonym
SELECT * FROM ZAPATOS;

-- INSERT using synonym
INSERT INTO ZAPATOS VALUES(6,'Carlos Leder','Narcotraficante');

-- Synonym for synonym
CREATE SYNONYM COLIBRI FOR ZAPATOS;

-- SELECT
SELECT * FROM COLIBRI;

-- DESCRIPTION
DESC COLIBRI;

-- Delete original table DELINCUENTE
DROP TABLE DELINCUENTE;

##############################################################################################

# VIEWS

-- Create Tbale
CREATE TABLE FACTURA2(
cod_factura NUMBER,
cod_cliente NUMBER,
val_factura NUMBER,
CONSTRAINT factura2_pk PRIMARY KEY(cod_factura)
);

-- INSERTS
BEGIN
INSERT INTO FACTURA2 VALUES(1,6,1000);
INSERT INTO FACTURA2 VALUES(2,7,2000);
INSERT INTO FACTURA2 VALUES(3,3,3000);
INSERT INTO FACTURA2 VALUES(4,6,1000);
INSERT INTO FACTURA2 VALUES(5,7,2000);
END;

--CREATE SIMPLE VIEW
CREATE OR REPLACE VIEW vista1
AS
SELECT * FROM FACTURA2;

-- USE VIEW ON SELECT
SELECT * FROM vista1;

-- USE VIEW ON UPDATE
UPDATE vista1 SET val_factura=5000 WHERE val_factura=3000;

-- CREATE VIEW WITH SPECIFIC CONFIG
CREATE OR REPLACE VIEW vista2
AS
SELECT * FROM FACTURA2
WHERE cod_cliente=7
WITH CHECK OPTION;

-- Create SYNONYM for view
CREATE SYNONYM facturita FOR vista3;

-- SELELC VIEW
SELECT * FROM vista2;

-- READ ONLY
CREATE OR REPLACE VIEW vista3
AS
SELECT * FROM FACTURA2
READ ONLY;

-- Vista Compleja
CREATE OR REPLACE VIEW vista1c
(Codigo,Total)
AS SELECT cod_cliente, SUM(val_factura)
FROM FACTURA2
GROUP BY cod_cliente;

-- Vista compleja 2
CREATE OR REPLACE VIEW vista2c
AS SELECT cod_cliente AS Cliente, SUM(val_factura) AS Toatl
FROM FACTURA2
GROUP BY cod_cliente;

-- SELECT 
SELECT * FROM vista2c;

##############################################################################################

# MATERIALIZED VIEWS

SELECT * FROM FACTURA2;

-- MATRERIALIZED VIEW
CREATE MATERIALIZED VIEW mv_vista1
AS
SELECT * FROM FACTURA2;

-- SLECT
SELECT * FROM mv_vista1;

--
INSERT INTO FACTURA2 VALUES(21,21,21);

-- Refresh matrialized view
BEGIN
DBMS_MVIEW.REFRESH('mv_vista1');
END;

##############################################################################################

# INDEXES

TRUNCATE TABLE DELINCUENTE;
--
BEGIN
FOR i IN 1..100000
LOOP
    INSERT INTO DELINCUENTE VALUES(i,'Delincuente_'||i,'Delito_'||i);
END LOOP; 
END;
-- Before Index 0.05 Seconds
SELECT * from DELINCUENTE WHERE nom_delincuente='Delincuente_98000';
-- Create Index
CREATE INDEX index1
ON DELINCUENTE(nom_delincuente);
-- After Index 0.01 Seconds
SELECT * from DELINCUENTE WHERE nom_delincuente='Delincuente_98000';

##############################################################################################

# Types

CREATE TYPE direccion_type AS OBJECT(
sitio_exacto VARCHAR2(30),
barrio VARCHAR2(30),
ciudad VARCHAR2(30),
pais VARCHAR2(30)
);

CREATE TABLE EMPLEADO(
codigo NUMBER,
nombre VARCHAR2(30),
telefono VARCHAR2(15),
direccion direccion_type,
CONSTRAINT empelado_pk PRIMARY KEY(codigo)
);

INSERT INTO EMPLEADO VALUES(1,'Daniel','3125678965',direccion_type('crr48 n123-45','Mazuren','Bogotá','Colombia'));
INSERT INTO EMPLEADO VALUES(2,'Guido','3125678965',direccion_type('crr48 n123-45','Bella Suiza','Bogotá','Colombia'));
INSERT INTO EMPLEADO VALUES(3,'Paula','3125678965',direccion_type('crr48 n123-45','Altos del Norte','Bogotá','Colombia'));

SELECT codigo,nombre,telefono,e.direccion.sitio_exacto,e.direccion.barrio FROM EMPLEADO e;

##############################################################################################