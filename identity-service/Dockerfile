# Sử dụng hình ảnh Maven chính thức để xây dựng ứng dụng
FROM maven:3.9.9-amazoncorretto-21 AS build

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file pom.xml và các file cần thiết khác để tải các phụ thuộc
COPY pom.xml ./
COPY .mvn .mvn
COPY mvnw ./
COPY mvnw.cmd ./

# Tải các phụ thuộc Maven
RUN ./mvnw dependency:go-offline

# Sao chép toàn bộ mã nguồn vào container
COPY src ./src

# Biên dịch và đóng gói ứng dụng
RUN ./mvnw package -DskipTests

# Sử dụng hình ảnh JDK chính thức để chạy ứng dụng
FROM amazoncorretto:21.0.4

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file JAR từ giai đoạn build vào container
COPY --from=build /app/target/identity-0.0.2.jar /app/identity.jar

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "/app/identity.jar"]