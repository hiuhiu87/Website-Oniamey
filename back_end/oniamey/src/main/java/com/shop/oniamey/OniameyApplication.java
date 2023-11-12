package com.shop.oniamey;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class OniameyApplication {

    public static void main(String[] args) {
        SpringApplication.run(OniameyApplication.class, args);
    }

}
