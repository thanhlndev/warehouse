## identity-service backend

## docker

# Start application

mvn spring-boot:run

# Build application

mvn clean package

# Push docker image to Docker Hub

docker image push <account>/identity-service
docker image push thanhln/identity-service:0.0.2 .

# Xây dựng image Docker

docker build -t identity-service .

# Chạy container Docker

docker run -p 8080:8080 --name identity-service identity-service

# create network:

docker network create warehouse-network

# Start MySQL in warehouse-network

# mysql

docker run --network warehouse-network --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=identity_service -p 3306:3306 -d mysql:latest

# Run your application in warehouse-network

docker run --name identity-service --network warehouse-network -p 8080:8080 -e DBMS_CONNECTION=jdbc:mysql://mysql:3306/identity_service identity-service

# Identity Service

## Table of Contents

- Introduction
- Project Structure
- Getting Started
- Running the Application
- Building the Application
- Docker
- Configuration
- Security
- API Documentation
- Contributing
- License

## Introduction

The Identity Service is a microservice responsible for managing user authentication, authorization, and user profiles within the Warehouse Management System.

## Project Structure

```
identity-service/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── cloud/
│   │   │       └── thanhln/
│   │   │           └── identity/
│   │   │               ├── configuration/
│   │   │               ├── constant/
│   │   │               ├── controller/
│   │   │               ├── domain/
│   │   │               ├── dto/
│   │   │               ├── exception/
│   │   │               ├── mapper/
│   │   │               ├── repository/
│   │   │               ├── service/
│   │   │               └── IdentityApplication.java
│   │   └── resources/
│   │       ├── application.yaml
│   │       └── ...
│   └── test/
│       └── java/
│           └── cloud/
│               └── thanhln/
│                   └── identity/
│                       └── IdentityApplicationTests.java
├── Dockerfile
├── README.md
└── pom.xml
```

## Getting Started

### Prerequisites

- Java 21
- Maven 3.9.9
- Docker

### Clone the Repository

```sh
git clone <repository-url>
cd identity-service
```

## Running the Application

### Using Maven

```sh
mvn spring-boot:run
```

### Using Docker Compose

```sh
docker-compose up -d
```

## Building the Application

```sh
mvn clean package
```

## Docker

### Build Docker Image

```sh
docker build -t identity-service .
```

### Run Docker Container

```sh
docker run -p 8080:8080 --name identity-service identity-service
```

### Push Docker Image to Docker Hub

```sh
docker image push <account>/identity-service:0.0.2
```

### Create Docker Network

```sh
docker network create warehouse-network
```

### Run MySQL in Docker Network

```sh
docker run --network warehouse-network --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=identity -p 3306:3306 -d mysql:latest
```

### Run Application in Docker Network

```sh
docker run --name identity-service --network warehouse-network -p 8080:8080 -e DBMS_CONNECTION=jdbc:mysql://mysql:3306/identity identity-service
```

## Configuration

Configuration settings are managed in the application.yaml file located in the `src/main/resources` directory. Key configurations include database connection, JWT settings, and Kafka settings.

## Security

Security configurations are managed in the `SecurityConfig` class. This includes setting up JWT authentication and defining public and protected endpoints.

## API Documentation

API documentation for the Identity Service can be accessed at:

```
http://localhost:8080/swagger-ui.html
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
