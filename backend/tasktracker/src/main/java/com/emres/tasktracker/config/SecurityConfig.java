package com.emres.tasktracker.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.emres.tasktracker.jwt.AuthEntryPoint;
import com.emres.tasktracker.jwt.JwtAuthFilter;

@Configuration
@EnableWebSecurity //!
public class SecurityConfig {

  public static final String LOGIN = "/api/auth/login";
  public static final String REGISTER = "/api/auth/register";
  public static final String REFRESH = "/api/auth/refresh";

  @Autowired
  private AuthenticationProvider authenticationProvider;

  @Autowired
  private JwtAuthFilter jwtAuthFilter;

  @Autowired
  private AuthEntryPoint authEntryPoint;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) {
    http.csrf((csrf) -> csrf.disable())
    .authorizeHttpRequests((request) -> request.requestMatchers(LOGIN, REGISTER, REFRESH) //auth and reg OK, otherwise put them into filter
    .permitAll()
    .anyRequest()
    .authenticated())
    .exceptionHandling((exceptionHandling) -> exceptionHandling.authenticationEntryPoint(authEntryPoint)) //setting for the authentrypoint
    .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    .authenticationProvider(authenticationProvider)
    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
  }
}
