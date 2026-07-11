package com.emres.tasktracker.controller;

import com.emres.tasktracker.dto.DtoUser;
import com.emres.tasktracker.jwt.AuthRequest;
import com.emres.tasktracker.jwt.AuthResponse;
import com.emres.tasktracker.jwt.RefreshTokenRequest;
import com.emres.tasktracker.jwt.RefreshTokenResponse;

public interface IAuthController {
  
  DtoUser register(AuthRequest request);

  AuthResponse authenticate(AuthRequest request);

  RefreshTokenResponse refreshToken(RefreshTokenRequest request);
}
