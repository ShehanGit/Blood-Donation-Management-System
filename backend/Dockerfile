# Build Stage
FROM maven:3-openjdk-17 AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean install -DskipTests

# Runtime Stage
FROM openjdk:17-alpine
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8082
CMD ["java", "-jar", "app.jar"]
