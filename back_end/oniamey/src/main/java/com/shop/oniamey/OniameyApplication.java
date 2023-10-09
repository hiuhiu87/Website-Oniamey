package com.shop.oniamey;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class OniameyApplication {

    public static void main(String[] args) {
        SpringApplication.run(OniameyApplication.class, args);
    }

}
