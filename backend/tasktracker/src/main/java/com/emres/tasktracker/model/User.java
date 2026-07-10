package com.emres.tasktracker.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.emres.tasktracker.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "user_name", nullable = false)
  private String username;

  @Column(name = "user_password", nullable = false)
  private String userPassword;

  @Column(name = "user_role")
  @Enumerated(EnumType.STRING)
  private UserRole userRole;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    if(userRole == null) {
      return List.of();
    }
    return List.of(new SimpleGrantedAuthority("ROLE_" + userRole.name()));
  }

  @Override
  @org.jspecify.annotations.Nullable
  public String getPassword() {
    return this.userPassword;
  }

  @Override
  public String getUsername() {
    return this.username;
  }
}
