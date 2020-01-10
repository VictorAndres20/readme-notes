############ USING Spring Tool Suite ################
Make sure MAVEN installed and configured

######################################################################

# Spring Starter Project 
New Spring Starter Project >> Web

######################################################################
#  Configutarions thymeleaf(motor de plantillas)
https://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html

1. on application.properties

spring.thymeleaf.cache=true
spring.thymeleaf.encoding=UTF-8
spring.thymeleaf.mode=HTML
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.render-hidden-markers-before-checkboxes=false
spring.thymeleaf.servlet.content-type=text/html
spring.thymeleaf.servlet.produce-partial-output-while-processing=true
spring.thymeleaf.suffix=.html
server.port=8080

2. Package base structure

com.example.app
	components
	controllers
	entities
	models
	repository
	services

3. On POM.xml

		<dependency>
		    <groupId>org.springframework.boot</groupId>
		    <artifactId>spring-boot-starter-thymeleaf</artifactId>
		</dependency>

4. Javascripts, css, images

src/main/resources/static
	js
	css
	images

######################################################################

# Create View

on src/main/resources/templates

index.html

# Headers using css and js on resources/static folder

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
<head>
	<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
	
	<link th:href="@{/css/bootstrap.min.css}" rel="stylesheet" href="../static/css/bootstrap.min.css" />
	<script th:src="@{/js/jquery.js}" src="../static/js/jquery.js" ></script>
	<script th:src="@{/js/popper.js}" src="../static/js/popper.js" ></script>
	<script th:src="@{/js/bootstrap.min.js}" src="../static/js/bootstrap.min.js" ></script>
	
	<title>Ej1 Spring Boot</title>
</head>

# HREF to controller RequestMapping and method

<a class="nav-link" th:href="@{/basic/inicio}" href="#">Saludo</a>

# Using images

<img th:src="@{/images/imagen.png}" src="../static/images/imagen.png" alt="..." />

######################################################################

# Create Controller

package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/basic") //ROUTE to controller
public class BasicController {
	
	/**
	 * Method to return view index
	 * @return name of View
	 */
	@GetMapping(path="/inicio") //ROUTE to method
	public String inicio()
	{
		return "index";
	}

}

######################################################################

# Bucle foreach with list passed from controller to view

1. Model

import java.util.Date;
public class Modelo {	
	private int codigo;
	private String descripcion;
	private String imagen;
	private Date fecha;	
	public Modelo() {
	}	
	public Modelo(int codigo, String descripcion, String imagen, Date fecha) {
		super();
		this.codigo = codigo;
		this.descripcion = descripcion;
		this.imagen = imagen;
		this.fecha = fecha;
	}
	public int getCodigo() {
		return codigo;
	}	
	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}	
	public String getDescripcion() {
		return descripcion;
	}	
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}	
	public Date getFecha() {
		return fecha;
	}	
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public String getImagen() {
		return imagen;
	}
	public void setImagen(String imagen) {
		this.imagen = imagen;
	}
}

2. Controller

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.demo.models.Modelo;
@Controller
@RequestMapping("/basic")
public class BasicController {	
	/**
	 * Method to return view index
	 * @return name of View
	 */
	@GetMapping(path="/inicio")
	public String inicio(Model model)
	{
		/**
		 * Enviar lista de modelos a la vista
		 */
		model.addAttribute("paramModelos",this.getModels());
		return "index";
	}	
	public List<Modelo> getModels()
	{
		ArrayList<Modelo> modelos=new ArrayList<Modelo>();
		modelos.add(new Modelo(1,"Primer modelo","/images/springboot.png",new Date()));
		modelos.add(new Modelo(2,"Segundo modelo","/images/springboot.png",new Date()));
		modelos.add(new Modelo(3,"Trecer modelo","/images/springboot.png",new Date()));
		modelos.add(new Modelo(4,"Cuarto modelo","/images/springboot.png",new Date()));
		modelos.add(new Modelo(5,"Quinto modelo","/images/springboot.png",new Date()));
		return modelos;
	}
}

3. View<!DOCTYPE html>
<html lang="es">
<head>
	<link th:href="@{/css/bootstrap.min.css}" rel="stylesheet" href="../static/css/bootstrap.min.css" />
	<script th:src="@{/js/jquery.js}" src="../static/js/jquery.js" ></script>
	<script th:src="@{/js/popper.js}" src="../static/js/popper.js" ></script>
	<script th:src="@{/js/bootstrap.min.js}" src="../static/js/bootstrap.min.js" ></script>
	<title>Ej1 Spring Boot</title>
</head>
<body>
	<ul>
		<li th:each="modelo : ${paramModelos}">
			<img th:src="${modelo.imagen}" alt="..." />
			<p th:text="${modelo.descripcion}"></p>
			<p th:text="${modelo.fecha}"></p>
		</li>
	</ul>
</body>
</html>

# Return ModelAndView on controller

	/**
	 * Method to return ModelAndView
	 * @return Object ModelAndView that specified view
	 */
	@GetMapping(path="/home")
	public ModelAndView inicio()
	{
		/**
		 * Se pasa en el constructor el nombre de la vista
		 */
		ModelAndView modelView = new ModelAndView("index");
		modelView.addObject("paramModelos",this.getModels());
		return modelView;
	}

######################################################################

# Passing params on url

/basic/filter/2

1. ModelAndView method on controller

	@GetMapping(path= {"/filter","/filter/{id}"})
	public ModelAndView getModeloPath(
			@PathVariable(required=true,name="id") int id
	){
		/**
		 * Crear ModelAndView a renderizar, especificando nombre de la vista
		 */
		ModelAndView modelView = new ModelAndView("filter");
		List<Modelo> modeloFilter=getModels()
									.stream()
									.filter((m)->
									{
										return m.getCodigo()==id;
									})
									.collect(Collectors.toList());
		modelView.addObject("paramModelo",modeloFilter.get(0));
		return modelView;
	}

2. View

		<li>
			<img th:src="${paramModelo.imagen}" alt="..." />
			<p th:text="${paramModelo.descripcion}"></p>
			<p th:text="${paramModelo.fecha}"></p>
		</li>

# Passing params on url

/basic/filter?id=2

1. ModelAndView method on controller

	@GetMapping(path="/filter")
	public ModelAndView getModelo(
			@RequestParam(defaultValue="1",name="id",required=false) int id
	){
		/**
		 * Enviar lista de modelos a la vista
		 */
		ModelAndView modelView = new ModelAndView("filter");
		List<Modelo> modeloFilter=getModels()
									.stream()
									.filter((m)->
									{
										return m.getCodigo()==id;
									})
									.collect(Collectors.toList());
		modelView.addObject("paramModelo",modeloFilter.get(0));
		return modelView;
	}

2. View

		<li>
			<img th:src="${paramModelo.imagen}" alt="..." />
			<p th:text="${paramModelo.descripcion}"></p>
			<p th:text="${paramModelo.fecha}"></p>
		</li>

######################################################################

# Forms

# Form by Model object

1. Model

public class Modelo {
	
	private int codigo;
	private String descripcion;
	private String imagen;
	private Date fecha;
	... Constructor...
	... Getter and setters ...
}

2. Controller Methods
	@GetMapping(path="/nuevo")
	public ModelAndView nuevo()
	{
		ModelAndView modelView=new ModelAndView("form");
		Modelo modelo=new Modelo();
		modelView.addObject("modelo",modelo);
		return modelView;
	}
	
	@PostMapping(path="/agregar")
	public ModelAndView agregarObjeto(@ModelAttribute("modelo") Modelo modelo)
	{
		modelo.setFecha(new Date());
		// Some other logic, like DAO logic
		return new ModelAndView("form").addObject("modelo",modelo);
	}

3. View Form 'th:field' is same to 'name'
	<form th:action="@{/basic/agregar}" method="POST" th:object="${modelo}">
	  <input th:field="${modelo.codigo}" th:value="${modelo.codigo}" type="number" class="form-control" placeholder="id" />
	  <input th:field="${modelo.descripcion}" th:value="${modelo.descripcion}" type="text" class="form-control" placeholder="descripcion" />
	  <input th:field="${modelo.imagen}" th:value="${modelo.imagen}" type="text" class="form-control" placeholder="imagen" />
	  <button type="submit" class="btn btn-primary">Agregar</button>
	  <input type="text" th:value="${modelo.fecha}" />
	</form>

# Form by Request Params

1. Model

public class Modelo {
	
	private int codigo;
	private String descripcion;
	private String imagen;
	private Date fecha;
	... Constructor...
	... Getter and setters ...
}

2. Controller Methods
	@GetMapping(path="/nuevo")
	public ModelAndView nuevo()
	{
		ModelAndView modelView=new ModelAndView("form");
		Modelo modelo=new Modelo();
		modelView.addObject("modelo",modelo);
		return modelView;
	}
	
	@PostMapping(path="/agregar")
	public ModelAndView agregar(
				@RequestParam("codigo") int id,
				@RequestParam("descripcion") String desc,
				@RequestParam("imagen") String img,
				@RequestParam("fecha") String date
			)
	{
		Modelo modelo=new Modelo();
		modelo.setCodigo(id);
		modelo.setDescripcion(desc);
		modelo.setImagen(img);
		try {
			modelo.setFecha(new SimpleDateFormat("yyyy-MM-dd").parse(date));
		} catch (ParseException e) {
			modelo.setFecha(new Date());
			e.printStackTrace();
		}
		// Some other logic, like DAO logic
		return new ModelAndView("form").addObject("modelo",modelo);
	}

3. View Form 'th:field' is same to 'name'
	<form th:action="@{/basic/agregar}" method="POST" th:object="${modelo}">
	  <input th:field="${modelo.codigo}" th:value="${modelo.codigo}" type="number" class="form-control" placeholder="id" />
	  <input th:field="${modelo.descripcion}" th:value="${modelo.descripcion}" type="text" class="form-control" placeholder="descripcion" />
	  <input th:field="${modelo.imagen}" th:value="${modelo.imagen}" type="text" class="form-control" placeholder="imagen" />
	  <input th:field="${modelo.fecha}" th:value="${modelo.fecha}" type="date" class="form-control" />
	  <button type="submit" class="btn btn-primary">Agregar</button>
	  <input type="text" th:value="${modelo.fecha}" />
	</form>

######################################################################

# Generate .jar and deploy

1. Verify POM. 
   Example POM
   
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.1.6.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.vitich</groupId>
	<artifactId>api-consumer</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>api-consumer</name>
	<description>Project to consume simple APIs</description>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<maven.compiler.source>1.8</maven.compiler.source>
		<maven.compiler.target>1.8</maven.compiler.target>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-thymeleaf</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>

2. Generate .jar. Run mvn inside project root folder

$ mvn package

3. Execute Java -jar

$ java -jar /projects/project/target/project-1.0.jar

######################################################################