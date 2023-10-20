package com.example.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@ComponentScan(basePackages= {"com.example.demo", "main.controller", "user.*"})
@EnableTransactionManagement
@MapperScan("user.dao")
public class Chapter02OracleApplication {

	public static void main(String[] args) {
		SpringApplication.run(Chapter02OracleApplication.class, args);
	}
}