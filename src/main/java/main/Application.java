package main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"service", "repository", "entity", "main", "controller", "configuration"})
@EntityScan("entity")
@EnableJpaRepositories("repository")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);

    }
}