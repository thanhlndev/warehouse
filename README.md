<<<<<<< HEAD
# Warehouse Management System
=======
>>>>>>> 9a1dded (web-app)

## Table of Contents

- Introduction
- Project Structure
- Services
- Getting Started
- Running the Application
- Building the Application
- Docker
- Security
- API Documentation

## Introduction

This project is a Warehouse Management System composed of multiple microservices. Each service is responsible for a specific domain within the warehouse management system.

## Project Structure

```
.classpath
.gitignore
.project
.settings/
.vscode/
api-gateway/
config-service/
discovery-service/
docker-compose.yml
identity-service/
inventory-service/
mobile-app/
notification-service/
order-service/
order-tracking-service/
post-service/
product-service/
profile-service/
README.md
reporting-service/
search-service/
supplier-service/
web-app/
```

## Services

- **API Gateway**: Handles routing and load balancing.
- **Config Service**: Centralized configuration management.
- **Discovery Service**: Service discovery using Eureka.
- **Identity Service**: Manages user authentication and authorization.
- **Inventory Service**: Manages inventory data.
- **Notification Service**: Sends notifications.
- **Order Service**: Manages orders.
- **Product Service**: Manages product data.
- **Profile Service**: Manages user profiles.
- **Supplier Service**: Manages supplier data.

## Getting Started

### Prerequisites

- Java 21
- Maven 3.9.9
- Docker

### Clone the Repository

```sh
git clone https://github.com/thanhlndev/warehouse.git
cd warehouse
```

## Running the Application
### Pull Image
```sh
docker pull bitnami/kafka:latest
docker pull bitnami/postgresql:latest
docker pull mysql:latest
docker pull neo4j:latest
```
### Using Docker Compose

```sh
docker-compose up -d
```

### Running Individual Services

Navigate to the service directory and run:

```sh
mvn spring-boot:run
```

## Building the Application

```sh
mvn clean package
```

## Docker

### Build Docker Images

```sh
docker build -t <service-name> .
```

### Run Docker Containers

```sh
docker run -p <port>:<port> --name <container-name> <image-name>
```

### Push Docker Images to Docker Hub

```sh
docker image push <account>/<service-name>:<tag>
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
docker run --name <service-name> --network warehouse-network -p <port>:<port> -e DBMS_CONNECTION=jdbc:mysql://mysql:3306/identity <image-name>
```

## Security

Security configurations are managed in each service's `SecurityConfig` class. For example, see SecurityConfig.java.

## API Documentation

API documentation for each service can be found in their respective README.md files or by accessing the Swagger UI endpoint if available.

For example, the Identity Service API documentation can be accessed at:

```
http://localhost:8080/swagger-ui.html
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
