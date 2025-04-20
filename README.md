
# Ứng dụng quản lý kho hàng(Warehouse Management System)

## Mục Lục (Table of Contents)

- Giới thiệu (Introduction)
- Cấu trúc của dự án (Project Structure)
- Các dịch vụ trong dự án (Services)
- Bắt đầu dự án (Getting Started)
- Khởi chạy dự án (Running the Application)
- Xây dựng ứng dụng (Building the Application)
- Docker
- Bảo mật (Security)
- API Documentation

## Giới thiệu dự án (Introduction)

Dự án này là một Hệ thống quản lý kho bao gồm nhiều microservices. Mỗi dịch vụ chịu trách nhiệm cho một lĩnh vực cụ thể trong hệ thống quản lý kho.

This project is a Warehouse Management System composed of multiple microservices. Each service is responsible for a specific domain within the warehouse management system.

## Cấu trúc của dự án (Project Structure)

```
.classpath
.gitignore
.project
.settings/
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

## Các dịch vụ trong dự án Services

- **API Gateway**: Chịu trách nhiệm xử lý định tuyến và cân bằng tải - Handles routing and load balancing.
- **Config Service**: Quản lý cấu hình - Centralized configuration management.
- **Discovery Service**: Service discovery using Eureka. 
- **Identity Service**: Quản lý xác thực và ủy quyền(phân quyền) người dùng - Manages user authentication and authorization.
- **Inventory Service**: Manages inventory data.
- **Notification Service**: Sends notifications.
- **Order Service**: Manages orders.
- **Product Service**: Manages product data.
- **Profile Service**: Manages user profiles.
- **Supplier Service**: Manages supplier data.

## Bắt đầu dự án (Getting Started)

### Điều kiện bắt buộc (Prerequisites)

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
docker pull bitnami/mongodb:latest
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

### Run Application in Docker Network

```sh
docker run --name <service-name> --network warehouse-network -p <port>:<port> -e DBMS_CONNECTION=jdbc:mysql://mysql:3306/identity <image-name>
```

## Security

Cấu hình bảo mật được quản lý trong lớp 'SecurityConfig' của mỗi dịch vụ. Ví dụ, xem SecurityConfig.java.

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
