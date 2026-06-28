package com.freetime.allapi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/api/v1/weather/**", "/login/**", "/oauth2/**").permitAll()
                .requestMatchers("/api/todos/**").authenticated()
                .anyRequest().authenticated()
            )
            .oauth2Login(withDefaults()); // Pures OAuth2 Login ohne manuelles JWT Handling
        
        return http.build();
    }
}