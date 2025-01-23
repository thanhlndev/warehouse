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
docker run --network warehouse-network --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=identity -p 3306:3306 -d mysql:latest

# Run your application in warehouse-network
docker run --name identity-service --network warehouse-network -p 8080:8080 -e DBMS_CONNECTION=jdbc:mysql://mysql:3306/identity identity-service
