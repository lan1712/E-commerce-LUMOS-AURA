package com.example.be.config;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@ConditionalOnProperty(prefix = "spring.flyway", name = "enabled", havingValue = "true", matchIfMissing = true)
public class FlywayConfig {

    @Bean(initMethod = "migrate")
    public Flyway flyway(DataSource dataSource, Environment environment) {
        String locations = environment.getProperty("spring.flyway.locations", "classpath:db/migration");
        boolean baselineOnMigrate = environment.getProperty("spring.flyway.baseline-on-migrate", Boolean.class, true);
        boolean validateOnMigrate = environment.getProperty("spring.flyway.validate-on-migrate", Boolean.class, true);
        String baselineVersion = environment.getProperty("spring.flyway.baseline-version", "0");

        return Flyway.configure()
                .dataSource(dataSource)
                .locations(locations)
                .baselineOnMigrate(baselineOnMigrate)
                .baselineVersion(baselineVersion)
                .validateOnMigrate(validateOnMigrate)
                .load();
    }

    @Bean
    public static BeanFactoryPostProcessor entityManagerDependsOnFlyway() {
        return beanFactory -> {
            if (!beanFactory.containsBeanDefinition("entityManagerFactory")
                    || !beanFactory.containsBeanDefinition("flyway")) {
                return;
            }

            BeanDefinition entityManager = beanFactory.getBeanDefinition("entityManagerFactory");
            List<String> dependsOn = new ArrayList<>();
            if (entityManager.getDependsOn() != null) {
                dependsOn.addAll(Arrays.asList(entityManager.getDependsOn()));
            }
            if (!dependsOn.contains("flyway")) {
                dependsOn.add("flyway");
                entityManager.setDependsOn(dependsOn.toArray(String[]::new));
            }
        };
    }
}
