--------------------------------------------------------------------------------------------------------------------
-- Create PROCEDURES
-- Example 1
DELIMITER $$
CREATE PROCEDURE sp_example1()
BEGIN
	DECLARE var1 VARCHAR(10);
    SET var1="Hello worold";
	SELECT var1 AS salida;    
END$$

-- Example 2
DELIMITER $$
CREATE PROCEDURE sp_generate_orders(IN codUser INT, IN codService INT, IN dateService DATE, IN addr VARCHAR(100))
BEGIN
	DECLARE cantHour INT;
   DECLARE actualCant INT;
   SELECT service.quant_hour INTO cantHour FROM service WHERE service.cod_serv=codService;
   SELECT COUNT(order_service.cod_ord_serv) INTO actualCant 
	FROM order_service 
	WHERE order_service.cod_state=1 AND order_service.cod_serv=codService AND order_service.hour_serv=codHour AND order_service.date_serv=dateService;
	IF(cantHour>actualCant) THEN
    	INSERT INTO order_service(date_order,date_serv,hour_serv,addr_client,cod_user,cod_serv,cod_state) 
		VALUES(CURRENT_DATE,dateService,codHour, addr, codUser, codService, 1);
      SELECT 1 AS salida;
    ELSE
    	SELECT 0 AS salida;
    END IF;  
END$$

-- CALL procedures
CALL sp_example1();
CALL sp_generate_orders(1, 1, '2017-09-03',5, 'Address');

--################################################################################

-- Create FUNCTIONS
-- Example 1
DELIMITER $$
CREATE FUNCTION sf_sqrt(x1 DECIMAL, y1 DECIMAL) 
RETURNS DECIMAL
DETERMINISTIC
BEGIN 
	DECLARE dist DECIMAL;
	SET dist = SQRT(x1 - y1);
	RETURN dist;
END$$

-- Example 2
DELIMITER $$
CREATE FUNCTION sf_getShop(codShop INTEGER) 
RETURNS VARCHAR(100) 
BEGIN 
	DECLARE name VARCHAR(50);
   DECLARE phone VARCHAR(15); 
   SELECT shop.nom_shop,shop.phon_shop 
   INTO name,phone 
   FROM shop 
   WHERE shop.cod_shop=codShop; 
   RETURN CONCAT(name,'->',phone); 
END$$

-- Get result function
SELECT sf_sqrt(5, 2)  AS salida
SELECT sf_getShop(1) AS salida

--################################################################################



--################################################################################