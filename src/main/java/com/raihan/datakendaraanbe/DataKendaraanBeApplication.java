package com.raihan.datakendaraanbe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
public class DataKendaraanBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(DataKendaraanBeApplication.class, args);
    }

}
