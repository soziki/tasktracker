package com.emres.tasktracker.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "refresh_token_table")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "refresh_token", nullable = false)
  private String refreshToken;

  @Column(name = "expire_date", nullable = false)
  private Date expireDate;

  @ManyToOne
  private User user;

}