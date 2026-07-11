package com.emres.tasktracker.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenResponse {
  
  private String token;

  private String refreshToken;
  
}
