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

-- Example with loop in Cursor Resultset
CREATE PROCEDURE sp_clean_tests()
BEGIN
	DECLARE bDone INT;
	DECLARE org_uuid VARCHAR(40);

   	DECLARE curs CURSOR FOR SELECT org.uuid FROM organization org WHERE org.name='LLL' OR org.name='VITI' OR org.name='TTTT' OR org.name='ANA' OR org.name='OFICINA LEGAL DE INNOVACIÓN Y EXTENSIÓN ';
  	DECLARE CONTINUE HANDLER FOR NOT FOUND SET bDone = 1;
  
  	OPEN curs;

  	SET bDone = 0;
  	REPEAT
    	FETCH curs INTO org_uuid;
		delete from innovation_section where organization = org_uuid;
		delete from innovation_management where organization = org_uuid;
		delete from trainer_section where organization = org_uuid;
		delete from facilitator_section where organization = org_uuid;
		delete from advisor_section where organization = org_uuid;
		delete from funder_section where organization = org_uuid;
		delete from initiative_section where organization = org_uuid;
	
		call sp_clean_ini(org_uuid);
	   
	   	Call sp_clean_tr(org_uuid);
		
		
		delete from organization where uuid=org_uuid;
  	UNTIL bDone END REPEAT;

  	CLOSE curs;
   	  
END;

CREATE PROCEDURE sp_clean_ini(IN org_uuid VARCHAR(40))
BEGIN
	DECLARE bDone1 INT;
	DECLARE ini_uuid VARCHAR(40);
	
	DECLARE curs1 CURSOR FOR SELECT oi.initiative FROM organization_initiative oi WHERE oi.organization=org_uuid;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET bDone1 = 1;
		OPEN curs1;
  		SET bDone1 = 0;
	
		REPEAT
	    	FETCH curs1 INTO ini_uuid;
	    	IF(ini_uuid IS NOT NULL) THEN
		    	delete from innovation_model_initiative WHERE initiative = ini_uuid;
				delete from innovation_result WHERE initiative = ini_uuid;
				delete from organization_initiative WHERE initiative = ini_uuid;
				delete from initiative WHERE uuid = ini_uuid;
		    	/*select ini_uuid as INI;*/
	    	END IF;
	    	
	    
	    UNTIL bDone1 END REPEAT;
   	  
END;

CREATE PROCEDURE sp_clean_tr(IN org_uuid VARCHAR(40))
BEGIN
	DECLARE bDone2 INT;
	DECLARE tr_uuid VARCHAR(40);

   	DECLARE curs2 CURSOR FOR SELECT otp.trainer_program FROM organization_trainer_program otp WHERE otp.organization=org_uuid;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET bDone2 = 1;
		OPEN curs2;
  		SET bDone2 = 0;
	
		REPEAT
	    	FETCH curs2 INTO tr_uuid;
	    	IF(tr_uuid IS NOT NULL) THEN
		    	delete from organization_trainer_program where trainer_program = tr_uuid;
				delete from trainer_result where trainer_program = tr_uuid;
				delete from trainer_program where uuid = tr_uuid;
		    	/*select tr_uuid as TR;*/
	    		
	    	END IF;
	    	
	    
	    UNTIL bDone2 END REPEAT;
	   	CLOSE curs2;
   	  
END;
CALL sp_clean_tests();


--################################################################################