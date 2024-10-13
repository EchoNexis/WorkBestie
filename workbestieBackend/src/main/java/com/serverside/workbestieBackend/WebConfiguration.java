package com.serverside.workbestieBackend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        WebMvcConfigurer.super.addCorsMappings(registry);
        registry.addMapping("/getAllTasks")
                .allowedOrigins("http://localhost:4200/")
                .allowedMethods("GET");
        registry.addMapping("/saveTask")
                .allowedOrigins("http://localhost:4200/")
                .allowedMethods("POST");
        registry.addMapping("/deleteTask/**")
                .allowedOrigins("http://localhost:4200/")
                .allowedMethods("DELETE");



    }
}
