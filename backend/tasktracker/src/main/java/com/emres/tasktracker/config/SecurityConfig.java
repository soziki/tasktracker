package com.emres.tasktracker.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import com.emres.tasktracker.jwt.JwtAuthConverter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  @Autowired
  private JwtAuthConverter jwtAuthConverter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    
    http.csrf((csrf) -> csrf.disable())
    .authorizeHttpRequests((request) -> request.anyRequest().authenticated());
    
    //resource server
    //http.oauth2ResourceServer((server) -> server.jwt(Customizer.withDefaults()));

    //authConverter
    http.oauth2ResourceServer((server) -> server.jwt((jwt) -> jwt.jwtAuthenticationConverter(jwtAuthConverter)));
    
    //session management 
    http.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
  }
}
