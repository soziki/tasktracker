package com.emres.tasktracker.service;

import com.emres.tasktracker.jwt.RefreshTokenRequest;
import com.emres.tasktracker.jwt.RefreshTokenResponse;

public interface IRefreshTokenService {
  
  RefreshTokenResponse refreshToken(RefreshTokenRequest request);
}
