<p align="center"">
<h2>Propuesta Técnica SICPA</h2>
</p>

Implementación de una propuesta técnica de gestión de Empleados, Compañias y Departamentos. El sistema está conformado por dos partes:

Backend : Spring Boot 2.7.7

FrontEnd : Angular 14.0.1


Cotenidos
=================
- [Cotenidos](#cotenidos)
	- [Software requerido](#software-requerido)
  - [Repositorios](#repositorios)
	- [Pasos previos](#pasos-previos)
	- [Instalación](#instalación)
		- [Despliegue estándar](#despliegue-estándar)
	- [Seguridad](#seguridad)
		- [Obtención de tokens OAuth2.0](#obtención-de-tokens-oauth20)
	- [Documentación](#documentación)
		- [Swagger](#swagger)
		- [Postman](#postman)
	- [Autor](#autor)

## Software requerido
- JDK 1.8.0_121
- Apache Maven 3.5.3
- MariaDB 10.0.0

FrontEnd
- Node 16.17.0 en adelante
- npm 8.15.0 en adelante
- Angular CLI 14.2.2

## Repositorios
- [BackEnd](https://github.com/LuisChica18/backend_sicpa)
- [FrondEnd](https://github.com/LuisChica18/frontend_employees)

## Pasos previos
- [Instalar y configurar Maven](https://www.mkyong.com/maven/how-to-install-maven-in-windows/)

## Instalación
La solución puede ser ejecutado como una aplicación Spring-Boot la cual requiere la instalación previa de MariaDB.

### Despliegue estándar

1. Abrir una consola o shell y crear la base de datos.
```bash
$ mysql -u root -p 
# CREATE DATABASE "backend_employees";
```
2. Cambiar la clave de conexión de la base de datos en la carpeta `src/main/resources/application.properties`

3. Instalar solución.
```bash
$ cd backend_sicpa
$ mvn clean package install
```
4. Ejecutar la solución
```bash
$ mvn spring-boot:run 
```

### Obtención de tokens OAuth2.0
Para generar un token para el usuario admin, por ejemplo, podermos ejecutar el siguiente comando curl:
```bash
curl --location --request POST http://localhost:8081/oauth/token -H "Accept:application/json" -d "username=admin&password=123&grant_type=password"
```
También en el archivo **/backend_sicpa/src/postman/Rest API.postman_collection.json** de postman podemos encontrar un ejemplo de llamada a este endpoint.

Con el token generado podemos hacer uso de cualquier de los endpoints que ofrece la solución a través de su API Rest. Para esto, debemos utilizar el token generado a través de una llamada con autenticación Bearer, tal como se muestra a continuación:
```bash
curl --location --request GET http://localhost:8081/api/employees -H "Authorization: Bearer saddsGFGFGKRTLRELRKERLFDFsdñkdsñeerwqeJEWEKN......"
```

## Documentación
### Swagger
Para acceder, debemos utilizar los usuarios indicados en la sección anterior.

http://localhost:8081/swagger-ui.html

### Postman
También pone a disposición de los usuarios una colección de llamadas y ejemplos que se encuentra en la ruta **/src/postman/Rest API.postman_collection.json**.

## Autor
| [![](https://avatars.githubusercontent.com/u/12874292?s=40&v=4)](https://github.com/LuisChica18)| 
|-|
| [@LuisChica18](https://github.com/LuisChica18)|
