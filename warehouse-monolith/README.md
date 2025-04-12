# Warehouse Management System (Monolithic)

This is a monolithic version of the Warehouse Management System, consolidating all microservices into a single application while maintaining the same functionality.

## Features

- User Authentication and Authorization
- Product Management
- Inventory Management
- Order Management
- Supplier Management
- Notification System
- Reporting System
- Search Functionality

## Tech Stack

- Java 21
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- Spring Data Neo4j
- MySQL
- Neo4j
- JWT Authentication
- Lombok
- MapStruct

## Prerequisites

- Java 21
- Maven 3.9.9
- MySQL 8.0
- Neo4j 5.x
- Docker (optional)

## Getting Started

### Database Setup

1. Start MySQL:

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=warehouse -p 3306:3306 -d mysql:latest
```

2. Start Neo4j:

```bash
docker run --name neo4j -e NEO4J_AUTH=neo4j/neo4j612435 -p 7474:7474 -p 7687:7687 -d neo4j:latest
```

### Application Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd warehouse-monolith
```

2. Build the application:

```bash
mvn clean package
```

3. Run the application:

```bash
java -jar target/warehouse-monolith-1.0.0.jar
```

The application will be available at `http://localhost:8080/api`

## API Documentation

Once the application is running, you can access the Swagger UI documentation at:

```
http://localhost:8080/api/swagger-ui.html
```

## Project Structure

```
src/main/java/com/warehouse/
├── common/                 # Common components
│   ├── exception/         # Exception handling
│   └── BaseEntity.java    # Base entity class
├── config/                # Configuration classes
├── controller/            # REST controllers
├── model/                 # Domain models
├── repository/            # Data access layer
├── service/               # Business logic
└── WarehouseApplication.java
```

## Security

The application uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Login to get a JWT token
2. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
