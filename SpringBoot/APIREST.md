# Maven dependencies and PROPERTIES
At END of this document
------------------------------------------------------------------------------------------------------------------------

# Create project
# Start project with Spring Tool Suite
1. Spring Starter Project (2.1.4)
2. Type MAVEN
3. JAR
4. JPA, WEB
# By Spirng Initializr
1. https://start.spring.io/
2. SAME STEPS ABOVE
3. Import project on IDE

# Install dependencys with Maven
```
mvn clean install
```

# If your Application doesn't need to connect a database
Add this configuration to you Main application
```
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
``` 

# application.properties config src/main/resources
```
# Base server configuration
server.port=8090
server.error.whitelabel.enabled=false

# Database configuration
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
												org.postgresql.Driver // https://mvnrepository.com/artifact/org.postgresql/postgresql
spring.datasource.url=jdbc:mysql://localhost:3306/agendamiento?useSSL=false // Maybe change SSL true
							 jdbc:postgresql://localhost:5432/agendamiento?useSSL=false&currentSchema=myschema
spring.datasource.username=root
spring.datasource.password=pass
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5Dialect
													 org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
# spring.jpa.properties.hibernate.default_schema=dbo
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl

#Hibernate<4.x>
spring.jpa.hibernate.naming.strategy=org.hibernate.cfg.ImproveNamingStrategy
```

# Package structure

src/
	main/
		java/
			com.somename.app
				configuration
				controller
				converter
				entity
				model
				repository
				service

------------------------------------------------------------------------------------------------------------------------

# Database drivers

**PostgreSQL**
<!-- https://mvnrepository.com/artifact/org.postgresql/postgresql -->	

------------------------------------------------------------------------------------------------------------------------

# Create Entity and Model
Always create Entity with his Model, VERY IMPORTANT

1. Entity
```
package com.vitisystems.SpringBootAPIexample.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="profesion")
@Entity
public class Profesion implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // For dont use hibernate_sequence and Column is Auto_increment or asosiated to a SEQUENCE
	@GeneratedValue(strategy = GenerationType.AUTO) // Use hibernate_seq, spring.jpa.hibernate.ddl-auto=update
	@Column(name="cod_profesion")
	private int codigo;
	
	@Column(name="nom_profesion")
	private String nombre;
	
	@Column(name="val_hora")
	private double valorHora;
	
	public Profesion(){}

	public Profesion(int codigo, String nombre, double valorHora){
		super();
		this.codigo = codigo;
		this.nombre = nombre;
		this.valorHora = valorHora;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public double getValorHora() {
		return valorHora;
	}

	public void setValorHora(double valorHora) {
		this.valorHora = valorHora;
	}	
}
```

2. Model
```
package com.vitisystems.SpringBootAPIexample.model;

import com.vitisystems.SpringBootAPIexample.entity.Profesion;

public class ProfesionModel {
	
	private int codigo;
	private String nombre;
	private double valorHora;
	
	public ProfesionModel(){}
	
	public ProfesionModel(int codigo, String nombre, double valorHora) {
		super();
		this.codigo = codigo;
		this.nombre = nombre;
		this.valorHora = valorHora;
	}
	
	public ProfesionModel(Profesion profesion){
		this.codigo = profesion.getCodigo();
		this.nombre = profesion.getNombre();
		this.valorHora = profesion.getValorHora();		
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public double getValorHora() {
		return valorHora;
	}

	public void setValorHora(double valorHora) {
		this.valorHora = valorHora;
	}
	
}
```

# Create Repository Interface. Here is the Bridge to App - ORM - DB
```
package com.vitisystems.SpringBootAPIexample.repository;

import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vitisystems.SpringBootAPIexample.entity.Profesion;

@Repository("profesionrepo")
public interface ProfesionRepo extends JpaRepository<Profesion, Integer>{
	public abstract Profesion findByCodigo(int codigo);
	public abstract List<Profesion> findByValorHora(double valorHora);
	public abstract Profesion findByValorHoraAndNombre (double valorHora,String nombre);
}
```

# Create Converter
```
package com.vitisystems.SpringBootAPIexample.converter;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import com.vitisystems.SpringBootAPIexample.entity.Profesion;
import com.vitisystems.SpringBootAPIexample.model.ProfesionModel;

@Component("profesionconvert")
public class ProfesionConverter {
	public ProfesionModel map(Profesion entity){
        return new ProfesionModel(entity);
    }

    public List<ProfesionModel> mapList(List<Profesion> list) {
        return list.stream().map(this::map).collect(Collectors.toList());
    }
}
```

# Create service, Where you develop queries and all retrives and interection with database
```
package com.vitisystems.SpringBootAPIexample.service;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import com.vitisystems.SpringBootAPIexample.converter.ProfesionConverter;
import com.vitisystems.SpringBootAPIexample.entity.Profesion;
import com.vitisystems.SpringBootAPIexample.model.ProfesionModel;
import com.vitisystems.SpringBootAPIexample.repository.ProfesionRepo;

@Service("profesionservice")
public class ProfesionService {
	
	@Autowired
	@Qualifier("profesionrepo")
	private ProfesionRepo repo;
	
	@Autowired
	@Qualifier("profesionconvert")
	private ProfesionConverter converter;
	
	private static final Log logger=LogFactory.getLog(ProfesionService.class);
	
	public boolean crear(Profesion profesion)
	{
		try
		{
			logger.info("CREANDO PROFESION");
			repo.save(profesion);
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	public boolean actualizar(Profesion profesion)
	{
		try
		{
			repo.save(profesion);
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	public boolean eliminar(int codigo)
	{
		try
		{
			Profesion profesion=repo.findByCodigo(codigo);
			repo.delete(profesion);
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	public List<ProfesionModel> listar()
	{
		List<ProfesionModel> profesionesm=converter.convertList(repo.findAll());
		return profesionesm;
	}
	
	public List<ProfesionModel> listarPorValorHora(double valorHora)
	{
		List<ProfesionModel> profesionesm=converter.convertList(repo.findByValorHora(valorHora));
		return profesionesm;
	}
	
	public ProfesionModel findByCodigo(int codigo)
	{
		try
		{
			return new ProfesionModel(repo.findByCodigo(codigo));
		}
		catch(Exception e)
		{
			return null;
		}
		
	}
	
	public ProfesionModel findByValorHoraAndNombre(double valorHora, String nombre)
	{
		try
		{
			return new ProfesionModel(repo.findByValorHoraAndNombre(valorHora, nombre));
		}
		catch(Exception e)
		{
			return null;
		}
		
	}
}
```

# Create Controller
```
package com.vitisystems.SpringBootAPIexample.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.vitisystems.SpringBootAPIexample.entity.Profesion;
import com.vitisystems.SpringBootAPIexample.model.ProfesionModel;
import com.vitisystems.SpringBootAPIexample.service.ProfesionService;

@RestController
@RequestMapping("/v1")
public class ProfesionController {
	
	@Autowired
	@Qualifier("profesionservice")
	private ProfesionService service;
	
	@GetMapping(path= {"","/"})
	public String presentation()
	{
		return "Presentación API REST con Sptring Boot";
	}
	
	@PutMapping("/profesion")
	public boolean agregarNota(@RequestBody @Valid Profesion profesion)
	{
		return service.crear(profesion);
	}
	
	@PostMapping("/profesion")
	public boolean actualizarProfesion(@RequestBody @Valid Profesion profesion)
	{
		return service.actualizar(profesion);
	}
	
	@DeleteMapping("/profesion/{codigo}")
	public boolean borrarProfesion(@PathVariable("codigo") int codigo)
	{
		return service.eliminar(codigo);
	}
	
	@GetMapping("/profesiones")
	public List<ProfesionModel> listar()
	{
		return service.listar();
	}
	
	@GetMapping("/profesiones/{valorHora}")
	public List<ProfesionModel> listarPorValorH(@PathVariable("valorHora") double valorHora)
	{
		return service.listarPorValorHora(valorHora);
	}
	
	@GetMapping("/profesion/{codigo}")
	public ProfesionModel obtenerByCodigo(@PathVariable("codigo") int codigo)
	{
		return service.findByCodigo(codigo);
	}
	
	@GetMapping("/profesion/{valorHora}/{nombre}")
	public ProfesionModel obtenerByValorAndNombre(@PathVariable("valorHora") double valorHora,@PathVariable("nombre") String nombre)
	{
		return service.findByValorHoraAndNombre(valorHora, nombre);
	}

}
```

------------------------------------------------------------------------------------------------------------------------

# Entities, Models and Services with Relationships
# EXAMPLE ciudad -n----1-> departamento
# Repository, Converter and Controller are the same structure and logic

1. Entities
------------
DPARTAMENTO
------------

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="departamento")
public class Departamento implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cod_departamento",unique=true,nullable=false)
	private int codigo;
	
	@Column(name="nom_departamento")
	private String nombre;
	
	@OneToMany(mappedBy="departamento",cascade=CascadeType.ALL,fetch=FetchType.LAZY,targetEntity=Ciudad.class)
	private List<Ciudad> ciudades;
	
	public Departamento(){}

	public Departamento(int codigo, String nombre, List<Ciudad> ciudades) {
		super();
		this.codigo = codigo;
		this.nombre = nombre;
		this.ciudades=ciudades;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<Ciudad> getCiudades() {
		return ciudades;
	}

	public void setCiudades(List<Ciudad> ciudades) {
		this.ciudades = ciudades;
	}
}

------
CIUDAD
------

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="ciudad")
public class Ciudad implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cod_ciudad",nullable=false,unique=true)
	private int codigo;
	
	@Column(name="nom_ciudad")
	private String nombre;
	
	@Transient //This not will be mapped because is a relationship column, but we will need this atribute
	private int codigoDep;
	
	@ManyToOne(fetch=FetchType.LAZY,targetEntity=Departamento.class)
	@JoinColumn(name="cod_departamento",nullable=false)
	private Departamento departamento;
	
	public Ciudad(){}

	public Ciudad(int codigo, String nombre, int codigoDep) {
		super();
		this.codigo = codigo;
		this.nombre = nombre;
		this.codigoDep=codigoDep;
	}
	
	public Ciudad(int codigo, String nombre,Departamento departamento){
		this.codigo = codigo;
		this.nombre = nombre;
		this.codigoDep=departamento.getCodigo();
		this.departamento=departamento;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Departamento getDepartamento() {
		return departamento;
	}

	public void setDepartamento(Departamento departamento) {
		this.departamento = departamento;
	}

	public int getCodigoDep() {
		return codigoDep;
	}

	public void setCodigoDep(int codigoDep) {
		this.codigoDep = codigoDep;
	}	
}

**EXPLAIN FETCH TYPES**
LAZY = fetch when needed
EAGER = fetch immediately

2. Models
------------------
DepartamentoModel
------------------

public class DepartamentoModel {
	
	private int codigo;
	private String nombre;
	
	public DepartamentoModel(){}

	public DepartamentoModel(int codigo, String nombre) {
		super();
		this.codigo = codigo;
		this.nombre = nombre;
	}
	
	public DepartamentoModel(Departamento departamento) {
		this.codigo = departamento.getCodigo();
		this.nombre = departamento.getNombre();
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}	
}

------------------
CiudadModel
------------------
public class CiudadModel {
	
	private int codigo;
	private String nombre;
	private int codigoDep;
	private DepartamentoModel departamento;
	
	public CiudadModel(){}

	public CiudadModel(int codigo, String nombre, DepartamentoModel departamento) {
		super();
		this.codigo = codigo;
		this.nombre = nombre;
		this.codigoDep=departamento.getCodigo();
		this.departamento=departamento;
	}
	
	public CiudadModel(Ciudad ciudad) {
		this.codigo = ciudad.getCodigo();
		this.nombre = ciudad.getNombre();
		this.codigoDep=ciudad.getDepartamento().getCodigo();
		this.departamento=new DepartamentoModel(ciudad.getDepartamento());
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public DepartamentoModel getDepartamento() {
		return departamento;
	}

	public void setDepartamento(DepartamentoModel departamento) {
		this.departamento = departamento;
	}

	public int getCodigoDep() {
		return codigoDep;
	}

	public void setCodigoDep(int codigoDep) {
		this.codigoDep = codigoDep;
	}	
}

3. Services
-------------------
DepartamentoService
-------------------

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("departamentoservice")
public class DepartamentoService {
	
	/**
	 * Repositorio Departamento para el uso del JPA y Hibernate con la entidad Departamento
	 */
	@Autowired
	@Qualifier("departamentorepository")
	private DepartamentoRepository repo;
	
	/**
	 * Convertidor de Entidad a Modelo para la entidad Departamento
	 */
	@Autowired
	@Qualifier("departamentoconverter")
	private DepartamentoCoverter converter;
	
	/**
	 * 
	 * @param departamento
	 * @return
	 */
	public boolean crear(Departamento departamento)
	{
		try
		{
			repo.save(departamento);
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	public boolean actualizar(Departamento departamento)
	{
		try
		{
			repo.save(departamento);
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	public boolean eliminar(int codigo)
	{
		try
		{
			Departamento departamento=repo.findByCodigo(codigo);
			repo.delete(departamento);
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	public List<DepartamentoModel> listar()
	{
		return converter.list(repo.findAll());
	}
}

-------------------
CiudadService
-------------------

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("ciudadservice")
public class CiudadService {
	
	@Autowired
	@Qualifier("ciudadrepository")
	private CiudadRepository repo;
	
	@Autowired
	@Qualifier("departamentorepository")
	private DepartamentoRepository repoDep;
	
	@Autowired
	@Qualifier("ciudadconverter")
	private CiudadConverter converter;
	
	public boolean crear(Ciudad ciudad)
	{
		try
		{
			ciudad.setDepartamento(repoDep.findByCodigo(ciudad.getCodigoDep()));
			repo.save(ciudad);
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	public boolean actualizar(Ciudad ciudad)
	{
		try
		{
			ciudad.setDepartamento(repoDep.findByCodigo(ciudad.getCodigoDep()));
			repo.save(ciudad);
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	public boolean eliminar(int codigo)
	{
		try
		{
			Ciudad ciudad=repo.findByCodigo(codigo);
			repo.delete(ciudad);
			return true;
		}
		catch(Exception e)
		{
			return false;
		}
	}
	
	public List<CiudadModel> listar()
	{
		return converter.lista(repo.findAll());
	}
}

------------------------------------------------------------------------------------------------------------------------

# JpaQueries and Custom Queries

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("adultorepository")
public interface AdultoRepository extends JpaRepository<Adulto, Integer>{
	
	public abstract Adulto findByCodigo(int codigo);
	
	public abstract Adulto findByNombre(String nombre);
	
	public abstract Adulto findByTelefono(String telefono);
	
	public abstract Adulto findByCorreo(String correo);
	
	@Query("SELECT a FROM Adulto a WHERE a.correo=:correo OR a.telefono=:telefono")
	public Adulto findByTelefonoAndCorreo(@Param("telefono")String telefono, @Param("correo")String correo);
	
	@Query("SELECT a FROM Adulto a WHERE a.nombre=:nombre OR a.correo=:correo OR a.telefono=:telefono")
	public Adulto findByNombreAndTelefonoAndCorreo(@Param("nombre")String nombre, @Param("telefono")String telefono, @Param("correo")String correo);

	@Query("SELECT p FROM Adulto p WHERE p.direccion LIKE :direccion%")
	public List<Adulto> findByDireccionStarts(String direccion);
}

------------------------------------------------------------------------------------------------------------------------

## Handler @Autowired injection in abstract class using Contructor Injection
We can’t use @Autowired on a constructor of an abstract class.
Spring doesn’t evaluate the @Autowired annotation on a constructor of an abstract class.
Example: abstract class for Service in API Rest

**WITHOUT Abstraction**
```
@Service()
public class ProfesionService {
	
	@Autowired
	@Qualifier()
	private ProfesionRepo repo;
	
	@Autowired
	@Qualifier()
	private ProfesionConverter converter;
	
	// Methods
}
```

**WITH Abstraction**

```
public abstract class UserServiceAbstraction {
	
	protected UserRepo repo;
	
	protected UserMapper mapper;

	public UserServiceAbstraction(UserRepo repo, UserMapper mapper){
		this.repo = repo;
		this.mapper = mapper;
	}
	
	// Methods
}

```

```
@Service()
public class UserService extends UserServiceAbstraction<User, String, UserModel> {

    @Autowired()
    public UserService(UserRepo repo, UserMapper mapper){
        super(repo, mapper);
    }
}
```

------------------------------------------------------------------------------------------------------------------------

# Spring Boot and JWT service

0. Maven dependency
```
		<dependency>
            <groupId>com.auth0</groupId>
            <artifactId>java-jwt</artifactId>
            <version>3.8.3</version>
        </dependency>
```

1. JWTException
```
public class JWTException extends Exception {

	private static final long serialVersionUID = 2893141502868586192L;
	
	public JwtException(String message) {
        super(message);
    }
	
	public JwtException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

2. JWTUtil
```
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public final class JWTUtil {

    private static final String JWT_PREFIX = "Bearer ";
    private static final String JWT_ISSUER = "SomeIssuerHere";

    private JWTUtil(){}

    public static String generateToken(final String content, final String secret, final int expirationMinutes) throws JWTException {
        try {
            return JWT.create()
                    .withIssuer(JWT_ISSUER)
                    .withIssuedAt(new Date())
                    .withSubject(content) //Token Content
                    .withExpiresAt(addMinutes(expirationMinutes))
                    .sign(buildAlgorithm(secret));
        } catch (IllegalArgumentException | JWTCreationException e) {
            throw new JWTException(e.getMessage(), e);
        }
    }

    public static String validate(final String token, final String secret) throws JWTException {
        try {
            final JWTVerifier verifier = JWT.require(buildAlgorithm(secret))
                    .build();
            final DecodedJWT decoded = verifier.verify(token);
            return decoded.getSubject();
        } catch (JWTVerificationException e) {
            throw new JWTException(e.getMessage(), e);
        }
    }

    static Algorithm buildAlgorithm(String secret) {
        return Algorithm.HMAC512(secret);
    }

    static Date addMinutes(final int minutes) {
        Calendar calendar = GregorianCalendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, minutes);
        return calendar.getTime();
    }

    public static String extractToken(String headerToken) throws JWTException {
        if(! headerToken.startsWith(JWT_PREFIX))
            throw new JWTException("Token Error Syntax");

        return headerToken.split(JWT_PREFIX)[1];
    }
}
```

3. JWTService
```
import org.springframework.stereotype.Service;

@Service
class JWTService<E>{

    public String generateToken(final E content, final String secret, final int expirationMinutes) throws JWTException {
        return generateToken(content.toString(), secret, expirationMinutes);
    }

    public String generateToken(final String content, final String secret, final int expirationMinutes) throws JWTException {
        return JWTUtil.generateToken(content,secret,expirationMinutes);
    }

    public String validate(final String token, final String secret) throws JWTException {
        return JWTUtil.validate(token,secret);
    }

    public String extractToken(String headerToken) throws JWTException {
        return JWTUtil.extractToken(headerToken);
    }
}
```

4. Create Validate JWT method on AuthService
```
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserService userService;

    public static final String JWT_SECRET = "HwreTnXSkhWSt9uRGOTczHQGpsEzVZLnXVwpRDG5";

    @Value("${jwt.token.expiration-minutes}")
    private int jwtExpirationMinutes;

    @Autowired
    private JWTService<Integer> jwtService;

    @Override
    public User login(AuthInput input) throws ServiceException{
        validateInputs(input);

        User user = userService.findByEmailOrUsername(input.getLogin(), input.getLogin());

        if(user == null)
            throw new ServiceException(HttpStatus.UNAUTHORIZED, "User not found");

        if(! comparePassword(input.getPassword(), user.getPassword()))
            throw new ServiceException(HttpStatus.UNAUTHORIZED, "Credentials error");

        return user;
    }

    @Override
    public boolean comparePassword(String plainPass, String encryptedPass){
        return SecurityEncoderHelper.comparePasswordBCrypt(plainPass, encryptedPass);
    }

    @Override
    public void validateInputs(AuthInput input) throws ServiceException{
        if(input == null)
            throw new ServiceException(HttpStatus.BAD_REQUEST, "Inputs null");

        if(StringUtils.isBlank(input.getLogin()))
            throw new ServiceException(HttpStatus.BAD_REQUEST, "Login is required");

        if(StringUtils.isBlank(input.getPassword()))
            throw new ServiceException(HttpStatus.BAD_REQUEST, "Password is required");
    }

    @Override
    public String generateToken(UserOutput user) throws JWTException {
        return jwtService.generateToken(user.getId(),JWT_SECRET,jwtExpirationMinutes);
    }

    @Override
    public String validateToken(String token) throws JWTException {
        return jwtService.validate(token, JWT_SECRET);
    }

    @Override
    public String extractToken(String headerToken) throws ServiceException {
        try {
            return jwtService.extractToken(headerToken);
        } catch (JWTException e) {
            throw new ServiceException(HttpStatus.UNAUTHORIZED,e.getMessage());
        }
    }
}
```

5. Generate token on Login and validate token on controller or use Middleware (Filter) for protection

------------------------------------------------------------------------------------------------------------------------

# Middlewares

0. OPTIONAL class for response
```
@Data
@AllArgsConstructor
public class RestResponse<E> implements Serializable {

    private int status;
    private boolean ok;
    private String error;
    private String message;
    private E content;

    public String toJson(){
        return "{" +
                "\"status\":" + this.status + "," +
                "\"ok\":" + this.ok + "," +
                "\"error\":\"" + this.error + "\"," +
                "\"message\":\"" + this.message + "\"," +
                "\"content\":\"" + this.content + "\"" +
                "}";
    }
}
```

1. Create you Middleware class
**Interface**
```
public interface SecurityFilter {

    void validateHeaderToken(String headerToken) throws ServiceException;
}
```
**Filter Implementation**
```
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Order(1)
public class SecurityFilterImpl implements SecurityFilter,Filter {

    @Override
    public void doFilter(
            ServletRequest servletRequest,
            ServletResponse servletResponse,
            FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse res = (HttpServletResponse) servletResponse;
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Max-Age", "3600");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me, Cache-Control, Authorization");
        System.out.println(String.format("Logging Protected Request  {%s} : {%S}",req.getMethod(),
                req.getRequestURI()));
        System.out.println(req.getHeader("Authorization"));

        if(! req.getMethod().equalsIgnoreCase("OPTIONS")){
            try {
                validateHeaderToken(req.getHeader("Authorization"));
                filterChain.doFilter(servletRequest, servletResponse);
            } catch (ServiceException e) {
                res.setStatus(401);
                try {
                    System.out.println("With error" + e.getMessage());
                    PrintWriter out = res.getWriter();
                    out.print(new RestResponse<String>(
                            401,false,e.getMessage(),null,null
                    ).toJson());
                    out.flush();
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        }
    }

    @Override
    public void validateHeaderToken(String headerToken) throws ServiceException {
        if(headerToken == null)
            throw new ServiceException(HttpStatus.UNAUTHORIZED, "Token Expected");
        try {
            JWTUtil.validate(
                    JWTUtil.extractToken(headerToken),AuthServiceImpl.JWT_SECRET);
        } catch (JWTException e) {
            throw new ServiceException(HttpStatus.UNAUTHORIZED, "Invalid token, authenticate again");
        }
    }


}
```

2. Register in configuration class, and register all paths you want to make filter
```
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MiddlewareConfiguration {

    private static final String API_VERSION_PATH = "/api/v1";

    @Bean
    public FilterRegistrationBean<SecurityFilterImpl> securityFilterImpl(){
        FilterRegistrationBean<SecurityFilterImpl> registrationBean
                = new FilterRegistrationBean<>();

        registrationBean.setFilter(new SecurityFilterImpl());
        registrationBean.addUrlPatterns(
                API_VERSION_PATH + "/user/*",
                API_VERSION_PATH + "/client/*"
        );

        return registrationBean;
    }
}
```

**NOTE IMPORTANT**
If you want to use Middleware in all routes, 
you only need to specify @Component in top of @Order(#) and NOT need register @Bean in Configuration.
With @Component annotation, you can inject services with @Autowired.


------------------------------------------------------------------------------------------------------------------------

# Spring Boot Security with JWT
1. Maven dependencies
		<dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
      </dependency>

		<!-- https://mvnrepository.com/artifact/io.jsonwebtoken/jjwt -->
		<dependency>
		  <groupId>io.jsonwebtoken</groupId>
		  <artifactId>jjwt</artifactId>
		  <version>0.9.0</version>
		</dependency>

2. Create Package com.name.app.configuration and inside create class Usuario
package com.vitisystems.SpringBootAPIexample.configuration;

public class Usuario {
	
	private String usuario;
	private String pass;
	
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
}

3. Create Entity Usuario, if this is not created or verify columns
package com.vitisystems.SpringBootAPIexample.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="usuario")
public class Usuario implements Serializable{
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="cod_usuario")
	private int codigo;
	
	@Column(name="nom_usuario")
	private String usuario;
	
	@Column(name="pass_usuario")
	private String pass;
	
	@Column(name="rol_usuario")
	private int rol;
	
	@Column(name="act_usuario")
	private int activo;
	
	public Usuario(){}

	public Usuario(int codigo, String usuario, String pass, int rol, int activo) {
		super();
		this.codigo = codigo;
		this.usuario = usuario;
		this.pass = pass;
		this.rol = rol;
		this.activo = activo;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public int getRol() {
		return rol;
	}

	public void setRol(int rol) {
		this.rol = rol;
	}

	public int getActivo() {
		return activo;
	}

	public void setActivo(int activo) {
		this.activo = activo;
	}
}

4. Create Repository for Usuario with less this method
package com.vitisystems.SpringBootAPIexample.repository;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.vitisystems.SpringBootAPIexample.entity.Usuario;

@Repository("usuariorepo")
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
	public abstract Usuario findByUsuario(String usuario);
}

5. Create Service for Usuario implementing UserDetailsService with less this method
package com.vitisystems.SpringBootAPIexample.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.vitisystems.SpringBootAPIexample.entity.Usuario;
import com.vitisystems.SpringBootAPIexample.repository.UsuarioRepository;

@Service("usuarioserv")
public class UsuarioService implements UserDetailsService {
	
	@Autowired
	@Qualifier("usuariorepo")
	private UsuarioRepository repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		BCryptPasswordEncoder encoder = passwordEncoder();
		/** GET USER FROM DATABASE*/
		Usuario usuario=repo.findByUsuario(username);
		
		/** ENCRYPT PASS with MD5 OR any other, here is withou encrypt, you may use one*/
		User userd=new User(usuario.getUsuario(),encoder.encode(usuario.getPass()),this.buildGrants(usuario));
		return userd;
	}
	
	public List<GrantedAuthority> buildGrants(Usuario usuario)
	{
		List<GrantedAuthority> authsg=new ArrayList<GrantedAuthority>();
		authsg.add(new SimpleGrantedAuthority(String.valueOf(usuario.getRol())));
		return authsg;
	}	
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
}

6. Create on configuration Package, JwtUtil.class
package com.vitisystems.SpringBootAPIexample.configuration;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.Key;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class JwtUtil {

	static Key secret = MacProvider.generateKey();
	
	public static void addAuthentication(HttpServletResponse res, String username)
	{
		String token=Jwts.builder()
				.setSubject(username)
				.signWith(SignatureAlgorithm.HS512, "Qw34r5*")
				.compact();
		res.addHeader("Authorization", "Bearer "+token);
		try {
			PrintWriter out = res.getWriter();
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			out.print("{\"id\":\"1\",\"data\":\"Login realizado\"}");
			out.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
		/** MAY BE ADD MORE HEADERS*/
	}
	
	public static void unsuccessAuthentication(HttpServletResponse res)
	{
		res.addHeader("Authorization", "ERROR");
		try {
			PrintWriter out = res.getWriter();
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			out.print("{\"id\":\"-1\",\"data\":\"Credenciales incorrectas\"}");
			out.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static Authentication getAuthentication(HttpServletRequest req)
	{
		String token=req.getHeader("Authorization");
		if(token!=null)
		{
			String user=Jwts.parser()
					.setSigningKey("Qw34r5*")
					.parseClaimsJws(token.replace("Bearer", ""))
					.getBody()
					.getSubject();
			return user != null ? new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()) : null;
		}
		return null;
	}
}

7. Create on configuration Package, LoginFilter.class
package com.vitisystems.SpringBootAPIexample.configuration;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;

public class LoginFilter extends AbstractAuthenticationProcessingFilter {

	public LoginFilter(String url, AuthenticationManager authManager) {
		super(new AntPathRequestMatcher(url));
		setAuthenticationManager(authManager);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {
		InputStream body=request.getInputStream();
		//Usuario class on this package
		Usuario usuario=new ObjectMapper().readValue(body, Usuario.class);
		return getAuthenticationManager().authenticate(
				new UsernamePasswordAuthenticationToken(
						usuario.getUsuario(),usuario.getPass(),Collections.emptyList()
						)
				);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication auth) throws IOException, ServletException {
		JwtUtil.addAuthentication(response, auth.getName());
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		JwtUtil.unsuccessAuthentication(response);
	}
}

8. Create on configuration Package, JwtFilter.class
package com.vitisystems.SpringBootAPIexample.configuration;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class JwtFilter extends GenericFilterBean{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		Authentication authentication=JwtUtil.getAuthentication((HttpServletRequest) request);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(request,response);		
	}
}

9. Create on configuration Package, WebSecurity class
package com.vitisystems.SpringBootAPIexample.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.vitisystems.SpringBootAPIexample.service.UsuarioService;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

	@Autowired
	@Qualifier("usuarioserv")
	private UsuarioService service;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(service);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
		.antMatchers("/login").permitAll() // api.com/login NO AUTHENTICATE TOKEN NEEDED
		//.antMatchers("/login","/other/url").permitAll() //If you need more url without AUTHENTICATE TOKEN		
		.anyRequest().authenticated() // Any other URL AUTHENTICATE TOKEN NEEDED
		.and()
		.addFilterBefore(new LoginFilter("/login",authenticationManager()), UsernamePasswordAuthenticationFilter.class)
		.addFilterBefore(new JwtFilter(),UsernamePasswordAuthenticationFilter.class);
	}
}

10. Login sending POST method with atributes User.class on configuration Package, in this example use
{
	"usuario":"some",
	"pass":"some123"
}

TOKEN will be on response header 'Authorization', just get it at frontend

------------------------------------------------------------------------------------------------------------------------

# Cors error
1. 

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class Adhdfl5Application {

	public static void main(String[] args) {
		SpringApplication.run(Adhdfl5Application.class, args);
	}
	
	/**
	 * 
	 * CORS Handler
	 */
	@Bean
	public WebMvcConfigurer configureCORS() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedHeaders("*")
						.allowedMethods("*")
						.allowedOrigins("*");
			}
		};
	}
}

2. If You are using a WebSecurityConfigurerAdapter on class

@Override
	protected void configure(HttpSecurity http) throws Exception {
		// Some http code
		
		/*When Error Cors appear on login*/
		http.cors();
	}

------------------------------------------------------------------------------------------------------------------------

# Example ResponserRest
```
import java.util.List;

public class RestResponse<M> {

    private boolean ok;

    private M data;
    private List<M> list;
    private String error;

    public RestResponse(){
        this.ok = true;
    }

    public RestResponse<M> buildError(String error){
        this.ok = false;
        this.error = error;
        return this;
    }

    public RestResponse<M> buildData(M data){
        this.data = data;
        return this;
    }

    public RestResponse<M> buildList(List<M> data){
        this.list = data;
        return this;
    }

    public boolean isOk() {
        return ok;
    }

    public void setOk(boolean ok) {
        this.ok = ok;
    }

    public M getData() {
        return data;
    }

    public void setData(M data) {
        this.data = data;
    }

    public List<M> getList() {
        return list;
    }

    public void setList(List<M> list) {
        this.list = list;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
```

------------------------------------------------------------------------------------------------------------------------

# Pagination on Spring Boot like urlapi.com/profesiones?page=0&size=10
# Using SELECT profesion.nom_profesion,profesion.val_hora FROM profesion LIMIT <startPOS>,<recordsQuantity>

1. application.properties add
spring.data.rest.page-param-name=page
spring.data.rest.limit-param-name=limit
spring.data.rest.sort-param-name=sort
spring.data.rest.default-page-size=5
spring.data.rest.max-page-size=20

2. Repository add extends PagingAndSortingRepository<Class,Serializable>
package com.vitisystems.SpringBootAPIexample.repository;

import java.io.Serializable;
import java.util.List;
+import org.springframework.data.domain.Page;
+import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.vitisystems.SpringBootAPIexample.entity.Profesion;

@Repository("profesionrepo")
public interface ProfesionRepo extends JpaRepository<Profesion, Integer>,+ PagingAndSortingRepository<Profesion, Integer>{
	public abstract Profesion findByCodigo(int codigo);
	public abstract List<Profesion> findByValorHora(double valorHora);
	public abstract Profesion findByValorHoraAndNombre (double valorHora,String nombre);
	+public abstract Page<Profesion> findAll(Pageable pageable);
}

3. Service add
import org.springframework.data.domain.Page;
...
	public List<ProfesionModel> findByPage(Pageable pageable)
	{
		return converter.convertList(repo.findAll(pageable).getContent());
	}

4. Controller
import org.springframework.data.domain.Page;
...
	@GetMapping("/profesiones")
	public List<ProfesionModel> listar(Pageable pageable)
	{
		return service.findByPage(pageable);
	}

------------------------------------------------------------------------------------------------------------------------

# Use Entities on different project
If you create a project to generate Entities and import it
on Spring Boot as maven dependnecy, you need to Specify this on MainApp
```
@EntityScan("com.group.id.entities") // THIS to scan all @Entity annotation
@SpringBootApplication
public class PetsappCoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetsappCoreApplication.class, args);
	}

}
```


------------------------------------------------------------------------------------------------------------------------

# BCrypt usage

Need Spring ecurity core
```
		<!-- https://mvnrepository.com/artifact/org.springframework.security/spring-security-core -->
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-core</artifactId>
			<version>5.3.2.RELEASE</version>
		</dependency>
```

Then, create util class
```
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public final class SecurityEncoderHelper {

    private SecurityEncoderHelper(){}

    public static String encodePasswordBCrypt(String password){
        return new BCryptPasswordEncoder().encode(password);
    }

    public static boolean comparePasswordBCrypt(String plainPassword, String hashedPassword){
        return new BCryptPasswordEncoder().matches(plainPassword,hashedPassword);
    }

}
```

------------------------------------------------------------------------------------------------------------------------

# Mapping with map struct


0. Intall
In POM
```
	<properties>
		<java.version>1.8</java.version>
		<org.mapstruct.version>1.3.1.Final</org.mapstruct.version>
		<org.projectlombok.version>1.18.10</org.projectlombok.version>
	</properties>
	
	<dependencies>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<version>${org.projectlombok.version}</version>
			<optional>true</optional>
		</dependency>

		<dependency>
			<groupId>org.mapstruct</groupId>
			<artifactId>mapstruct</artifactId>
			<version>${org.mapstruct.version}</version>
		</dependency>
	</dependencies>
	
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>

			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>3.5.1</version>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
					<annotationProcessorPaths>
						<path>
							<groupId>org.projectlombok</groupId>
							<artifactId>lombok</artifactId>
							<version>${org.projectlombok.version}</version>
						</path>
						<path>
							<groupId>org.mapstruct</groupId>
							<artifactId>mapstruct-processor</artifactId>
							<version>${org.mapstruct.version}</version>
						</path>
					</annotationProcessorPaths>
				</configuration>
			</plugin>
		</plugins>

		<resources>
			<resource>
				<directory>src/main/resources</directory>
				<filtering>true</filtering>
			</resource>
		</resources>
	</build>
```

1. Generic Mapper
```
public interface GenericMapper<E,DI,DO> {

    E domainToEntity(DI input);

    DO entityToDomain(E entity);
}
```

2. Example mapping User entity and UserOutput
https://github.com/mapstruct/mapstruct-examples/tree/master/mapstruct-nested-bean-mappings
https://stackoverflow.com/questions/41376695/mapstruct-send-nested-entity-having-one-to-many-relation-in-the-response
**Entities**
User
```
@Entity
@Table(name = "users")
@Data
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @ManyToOne(fetch=FetchType.LAZY,targetEntity=UserState.class)
    @JoinColumn(name="state",nullable=false)
    private UserState state;

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(
            name = "user_profile",
            joinColumns = @JoinColumn(name = "user"),
            inverseJoinColumns = @JoinColumn(name = "profile"))
    private List<Profile> profiles;

    @Column(name = "username")
    private String username;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;
}
```
UserState
```
@Entity
@Table(name = "state_user")
@Data
public class UserState implements Serializable {

    @Id
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;
}
```
Profile
```
@Entity
@Table(name = "profile")
@Data
public class Profile {

    @Id
    @Column(name = "code", nullable = false)
    private String code;

    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(
            name = "profile_rol",
            joinColumns = @JoinColumn(name = "profile"),
            inverseJoinColumns = @JoinColumn(name = "rol"))
    private List<Rol> roles;

    @Column(name = "name")
    private String name;
}
```
Rol
```
@Entity
@Table(name = "rol")
@Data
public class Rol {

    @Id
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "name")
    private String name;
}
```

**Domains**
UserOutput
```
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserOutput implements Serializable {

    private int id;
    private UserStateOutput state;
    private List<ProfileOutput> profiles;
    private String username;
    private String name;
    private String email;
    private String phone;
}
```
UserInput
```
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInput implements Serializable {

    private int id;
    private String stateCode;
    private String username;
    private String name;
    private String password;
    private String email;
    private String phone;
    private List<ProfileOutput> profiles;
}
```
ProfileOutput
```
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileOutput implements Serializable {

    private String code;
    private List<RolOutput> roles;
    private String name;
}
```
RolOuput
```
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RolOutput implements Serializable {

    private String code;
    private String name;
}
```

**Mapper**
```
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
@Component
public interface UserMapper extends GenericMapper<User, UserInput, UserOutput> {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @SuppressWarnings("UnmappedTargetProperties")
    @Override
    @Mapping(source = "stateCode", target = "state.code")
    @Mapping(source = "profiles", target = "profiles")
    User domainToEntity(UserInput input);

    @Override
    @Mapping(source = "state.code", target = "state.code")
    @Mapping(source="profiles",target = "profiles")
    UserOutput entityToDomain(User entity);

    //This line is needed because ProfileOutput list has nested RolOutput list
    @Mapping(target = "roles", source = "roles")
    ProfileOutput profileToProfileOutput(Profile source);

}
```

3. To list with lambda
```
	@Override
    public List<UserOutput> mapToDomainList(List<User> entities) {
        return entities.stream().map(this::mapToDomain).collect(Collectors.toList());
    }
	
	@Override
    public UserOutput mapToDomain(User entity) {
        return mapper.entityToDomain(entity);
    }
```


------------------------------------------------------------------------------------------------------------------------


# Use spring profiles in SpringBoot and Maven
http://dolszewski.com/spring/spring-boot-properties-per-maven-profile/

1. Create maven profiles in your pom.xml
```
<project>

...

    <profiles>
		<profile>
			<id>dev</id>
			<properties>
				<activatedProperties>dev</activatedProperties>
			</properties>
			<activation>
				<activeByDefault>true</activeByDefault>
				<property>
					<name>dev</name>
				</property>
			</activation>
		</profile>
		<profile>
			<id>prod</id>
			<properties>
				<activatedProperties>prod</activatedProperties>
			</properties>
			<activation>
				<property>
					<name>prod</name>
				</property>
			</activation>
		</profile>
	</profiles>

...

</project>
```

2. Allow Maven to manipulate resource files, so paste this inside build tag
```
<build>

    ...

    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```

3. Create profile properties with sintax ``application-[profileName].properties``
```
application-dev.properties
application-prod.properties
```

Note that [profileName] must be the same you put in pom.xl inside
```
    <profiles>
		<profile>
			<properties>
				<activatedProperties>
```

4. In application.properties specify which profile use or put a default with ${some:default}
```
spring.profiles.active=@activatedProperties@
```

5. Run or package application specifying profile:
```
$ mvn package -Pprod
```

5. Run or package application using default profile:
```
$ mvn clean package
```



------------------------------------------------------------------------------------------------------------------------

# SpringBoot and Swagger documentation
https://dzone.com/articles/spring-boot-2-restful-api-documentation-with-swagg

1. Dependencies
		<dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.8.0</version>
        </dependency>

        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>2.8.0</version>
        </dependency>

        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-bean-validators</artifactId>
            <version>2.8.0</version>
        </dependency>
		
2. Folder config
```
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.google.common.base.Predicate;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import static springfox.documentation.builders.PathSelectors.regex;
import static com.google.common.base.Predicates.or;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Bean
    public Docket postsApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("Software Engineering Team")
                .apiInfo(apiInfo()).select().paths(allPaths()).paths(excludePaths()).build();
    }

    private Predicate<String> specificPaths() {
        return or(regex("/users.*"), regex("/login*"));
    }

    private Predicate<String> allPaths() {
        return or(regex("/.*"));
    }
	
	private Predicate<String> excludePaths() {
        return or(regex("(?!/error).+"));
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("Application name")
                .description("Description app")
                .termsOfServiceUrl("http://example.com")
                .contact(new Contact("Name Dev Team",
                        "http://example.com", "development@example.com"))
                .license("MIT")
                .licenseUrl("http://example.com")
                .version("1.0")
                .build();
    }

}
```

3. Now you can deploy app and go to
```
http://host:port/swagger-ui.html
```

4. Description of endpoints. In controllers request methods
```
//CODE
@RestController
@RequestMapping("/api")
@Api(tags = {"Employee resources"})
public class AgreementController{

//CODE

	@ApiOperation(value = "Response with data and a list of available employees")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "Successfully retrieved list"),
		@ApiResponse(code = 401, message = "You are not authorized to view the resource"),
		@ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
		@ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
	})
	@GetMapping("/employees")
	public List <EmployeeOutput> getAllEmployees() {
		return employeeService.findAll();
	}

	@ApiOperation(value = "Get an employee by Id")
    @GetMapping("/employees/{id}")
    public ResponseEntity < Employee > getEmployeeById(
        @ApiParam(value = "Employee id from which employee object will retrieve", required = true) @PathVariable(value = "id") Long employeeId)
    throws ResourceNotFoundException {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() - > new ResourceNotFoundException("Employee not found for this id :: " + employeeId));
        return ResponseEntity.ok().body(employee);
    }
	
    @ApiOperation(value = "Add an employee")
    @PostMapping("/employees")
    public Employee createEmployee(
        @ApiParam(value = "Employee object store in database table", required = true) @Valid @RequestBody EmployeeInput employee) {
        return employeeRepository.save(employee);
    }

//CODE
```

5. Descriptions if swagger models. In domains
```
public class EmployeeOutput {

    @ApiModelProperty(notes = "The database generated employee ID")
    private long id;
    
	@ApiModelProperty(notes = "The employee first name")
    private String firstName;
    
	@ApiModelProperty(notes = "The employee last name")
    private String lastName;
    
	@ApiModelProperty(notes = "The employee email id")
    private String emailId;
    
	public Employee() {
    }
	
//CODE
```

6. Deploy app and go to
```
http://host:port/swagger-ui.html
```
		
		
------------------------------------------------------------------------------------------------------------------------
		
# Generate jar with dependencies

Add in POM build >> plugins section		
```
<build>
  <plugins>
    <plugin>
      <artifactId>maven-assembly-plugin</artifactId>
      <configuration>
        <archive>
          <manifest>
            <mainClass>path.to.package.MainClass</mainClass>
          </manifest>
        </archive>
        <descriptorRefs>
          <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
      </configuration>
    </plugin>
  </plugins>
</build>
```

OR in Spring Boot

```
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    
	<!-- This if you have System Scope dependencies -->
	
	<configuration>
        <includeSystemScope>true</includeSystemScope>
    </configuration>
	
	<!-- -->
	
    <executions>
        <execution>
            <goals>
                <goal>repackage</goal>
            </goals>
            <configuration>
                <classifier>exec</classifier>
            </configuration>
        </execution>
    </executions>
</plugin>
```

		
------------------------------------------------------------------------------------------------------------------------
		
# Generate jar as maven dependency in .m2/repository

Execute
```
$ mvn install:install-file –Dfile=/absolute/path/to/app.jar -DgroupId=com.vapedraza.group -DartifactId=example-app -Dversion=1.0 -Dpackaging=jar
```		



------------------------------------------------------------------------------------------------------------------------

# Propeties
  <properties>
	  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	  <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
	  <java.version>1.8</java.version>
	  <jaxb-api.version>2.2.11</jaxb-api.version>
  </properties>

# MAVEN Dependencies
  <dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		
		**IF YOU USE MySQL 5.x**
		<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
		<dependency>
			 <groupId>mysql</groupId>
			 <artifactId>mysql-connector-java</artifactId>
			 <version>5.1.38</version>
		</dependency>

		**IF YOU USE PostgreQL**
		<!-- https://mvnrepository.com/artifact/org.postgresql/postgresql -->
		<dependency>
			<groupId>org.postgresql</groupId>
			<artifactId>postgresql</artifactId>
			<version>42.2.8</version>
		</dependency>

		
		<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
		<dependency>
		    <groupId>com.fasterxml.jackson.core</groupId>
		    <artifactId>jackson-databind</artifactId>
		    <version>2.9.4</version>
		</dependency>
		
		<!-- https://mvnrepository.com/artifact/javax.xml.bind/jaxb-api -->
		<dependency>
		    <groupId>javax.xml.bind</groupId>
		    <artifactId>jaxb-api</artifactId>
		    <version>${jaxb-api.version}</version>
		    <scope>runtime</scope>
		</dependency>		
			
	</dependencies>