package com.emres.tasktracker.controller.impl;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emres.tasktracker.controller.IAuthController;
import com.emres.tasktracker.dto.DtoUser;
import com.emres.tasktracker.jwt.AuthRequest;
import com.emres.tasktracker.jwt.AuthResponse;
import com.emres.tasktracker.jwt.RefreshTokenRequest;
import com.emres.tasktracker.jwt.RefreshTokenResponse;
import com.emres.tasktracker.service.IAuthService;
import com.emres.tasktracker.service.IRefreshTokenService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/auth")
public class AuthControllerImpl implements IAuthController {
  
  @Autowired
  private IAuthService authService;

  @Autowired
  private IRefreshTokenService refreshTokenService;

  @PostMapping("/register")
  @Override
  public DtoUser register(@Valid @RequestBody AuthRequest request) {
    return authService.register(request);
  }

  @PostMapping("/login")
  @Override
  public AuthResponse authenticate(@Valid @RequestBody AuthRequest request){
    return authService.authenticate(request);
  }

  @PostMapping("/refresh")
  @Override
  public RefreshTokenResponse refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
    return refreshTokenService.refreshToken(request);
  }


}
