FROM maven:3.8.4-openjdk-17 AS build

COPY . /app

WORKDIR /app

RUN mvn clean package

FROM adoptopenjdk:17-jdk-hotspot

ENV APP_FILE users-0.0.1-SNAPSHOT.jar
ENV APP_HOME /usr/app

EXPOSE 8084

COPY --from=build /app/target/$APP_FILE $APP_HOME/

WORKDIR $APP_HOME

ENTRYPOINT ["sh", "-c"]

CMD ["exec java -jar $APP_FILE"]
