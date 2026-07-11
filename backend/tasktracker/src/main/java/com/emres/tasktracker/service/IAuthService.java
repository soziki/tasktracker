package com.emres.tasktracker.service;

import com.emres.tasktracker.dto.DtoUser;
import com.emres.tasktracker.jwt.AuthRequest;
import com.emres.tasktracker.jwt.AuthResponse;
import com.emres.tasktracker.model.RefreshToken;
import com.emres.tasktracker.model.User;

public interface IAuthService {
  
  DtoUser register(AuthRequest request);

  AuthResponse authenticate(AuthRequest request);

  RefreshToken createRefreshToken(User user);
}
