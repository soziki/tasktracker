package com.emres.tasktracker.service.impl;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.emres.tasktracker.jwt.JwtService;
import com.emres.tasktracker.jwt.RefreshTokenRequest;
import com.emres.tasktracker.jwt.RefreshTokenResponse;
import com.emres.tasktracker.model.RefreshToken;
import com.emres.tasktracker.repository.RefreshTokenRepository;
import com.emres.tasktracker.service.IAuthService;
import com.emres.tasktracker.service.IRefreshTokenService;

@Service
public class RefreshTokenServiceImpl implements IRefreshTokenService{

  @Autowired
  private RefreshTokenRepository refreshTokenRepository;

  @Autowired
  private JwtService jwtService;

  @Autowired
  private IAuthService authService;

  public boolean isRefreshTokenValid(RefreshToken refreshToken) {
    return refreshToken.getExpireDate().after(new Date());
  }

  @Override
  @Transactional
  public RefreshTokenResponse refreshToken(RefreshTokenRequest request) {
    Optional<RefreshToken> optionalRefreshToken = refreshTokenRepository.findByRefreshToken(request.getRefreshToken());
    if(optionalRefreshToken.isPresent()) {
      //ok
      RefreshToken refreshToken = optionalRefreshToken.get();
      if(isRefreshTokenValid(refreshToken)) {
        // valid refresh token
        String token = jwtService.generateToken(refreshToken.getUser()); // new token
        refreshTokenRepository.deleteByUser(refreshToken.getUser()); // deletes other instances of refresh token in the table 
        RefreshToken newRefreshToken = refreshTokenRepository.save(authService.createRefreshToken(refreshToken.getUser())); //new refresh token

        return new RefreshTokenResponse(token, newRefreshToken.getRefreshToken());

      } else {
        // refresh token time out
        System.out.println("Refresh token has been expired.");
      }

    } else {
      System.out.println("Invalid refresh token." + request.getRefreshToken());
    }
    
    return null;
  }

}
