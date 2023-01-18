<p align="center"">
<h2>SICPA Technical Proposal</h2>
</p>

Implementation of a technical proposal for the management of Employees, Companies and Departments. The system is made up of two parts:

Backend : Spring Boot 2.7.7

FrontEnd : Angular 14.0.1


Contents
=================
- [Contents](#contents)
	- [Required software](#required-software)
  - [Repositories](#repositories)
	- [Previous steps](#previous-steps)
	- [Installation](#installation)
		- [Deployment](#deployment)
	- [Security](#security)
		- [BDD scripts users and roles](#bdd-scripts-users-and-roles)
		- [OAuth2.0 tokens](#oauth20-tokens)
	- [Documentation](#documentation)
		- [Swagger](#swagger)
		- [Postman](#postman)
	- [Autor](#autor)

## Required software
BackEnd
- JDK 1.8.0_121
- Apache Maven 3.5.3
- MariaDB 10.0.0

FrontEnd
- Node 16.17.0 en adelante
- npm 8.15.0 en adelante
- Angular CLI 14.2.2

## Repositories
- [BackEnd](https://github.com/LuisChica18/backend_sicpa)
- [FrondEnd](https://github.com/LuisChica18/frontend_employees)

## Previous steps
- [Install and configure Maven](https://www.mkyong.com/maven/how-to-install-maven-in-windows/)

## Installation
The project can be run as a Spring-Boot application which requires the prior installation of MariaDB.

### Deployment

1. Open a console or shell and create the database.
```bash
$ mysql -u root -p 
# CREATE DATABASE "backend_employees";
```
2. Change the database connection key in the `src/main/resources/application.properties`

3. Install
```bash
$ cd backend_sicpa
$ mvn clean package install
```
4. Run
```bash
$ mvn spring-boot:run 
```

## Security

### BDD scripts users and roles

To generate tokens, it is necessary to execute the scripts in the DB that are located in the folder `src/main/resources/scripts.sql`

### OAuth2.0 tokens

To generate a token for the admin user, for example, we can execute with:
```bash
curl --location --request POST http://localhost:8081/oauth/token -H "Accept:application/json" -d "username=admin&password=123&grant_type=password"
```
Also in the postman file **/backend_sicpa/src/postman/Rest API.postman_collection.json** we can find an example of calling this endpoint.

With the generated token we can make use of any of the endpoints that the solution offers through its Rest API. For this, we must use the token generated through a call with Bearer authentication, as shown below:
```bash
curl --location --request GET http://localhost:8081/api/employees -H "Authorization: Bearer saddsGFGFGKRTLRELRKERLFDFsdñkdsñeerwqeJEWEKN......"
```

## Documentation
### Swagger
To access, we must use the users indicated in the previous section.

http://localhost:8081/swagger-ui.html

### Postman
It also makes available to users a collection of calls and examples found in the path **/src/postman/Rest API.postman_collection.json**.

## Autor
| [![](https://avatars.githubusercontent.com/u/12874292?s=40&v=4)](https://github.com/LuisChica18)| 
|-|
| [@LuisChica18](https://github.com/LuisChica18)|
