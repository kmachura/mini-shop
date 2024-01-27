package com.microservices.minishop.deliveries;

import org.h2.tools.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.SQLException;

@SpringBootApplication
@EnableCaching
@EnableDiscoveryClient
@CrossOrigin
@EnableJms
public class DeliveriesApplication {

	public static void main(String[] args) {
		SpringApplication.run(DeliveriesApplication.class, args);
	}

	@Bean(initMethod = "start", destroyMethod = "stop")
	public Server h2Server() throws SQLException {
		return Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9090");
	}
}
