package com.emres.tasktracker.service.impl;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.scripting.support.RefreshableScriptTargetSource;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import com.emres.tasktracker.config.AppConfig;
import com.emres.tasktracker.dto.DtoUser;
import com.emres.tasktracker.enums.UserRole;
import com.emres.tasktracker.jwt.AuthRequest;
import com.emres.tasktracker.jwt.AuthResponse;
import com.emres.tasktracker.jwt.JwtService;
import com.emres.tasktracker.model.RefreshToken;
import com.emres.tasktracker.model.User;
import com.emres.tasktracker.repository.RefreshTokenRepository;
import com.emres.tasktracker.repository.UserRepository;
import com.emres.tasktracker.service.IAuthService;

import jakarta.validation.Valid;

@Service
public class AuthServiceImpl implements IAuthService{
  
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Autowired
  private AuthenticationProvider authenticationProvider;

  @Autowired
  private JwtService jwtService;

  @Autowired
  private RefreshTokenRepository refreshTokenRepository;

  @Override
  public RefreshToken createRefreshToken(User user){
    RefreshToken refreshToken = new RefreshToken();
    refreshToken.setRefreshToken(UUID.randomUUID().toString());
    refreshToken.setExpireDate(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 2));
    refreshToken.setUser(user);
    return refreshToken;
  }
  
  @Override
  public DtoUser register(AuthRequest request) {
    User newUser = new User();
    newUser.setUsername(request.getUsername());
    newUser.setUserPassword(passwordEncoder.encode(request.getPassword()));
    newUser.setUserRole(UserRole.USER);
    
    try {
      User savedUser = userRepository.save(newUser);
      DtoUser dto = new DtoUser();

      BeanUtils.copyProperties(savedUser, dto);
      return dto;
    } catch (DataIntegrityViolationException e) {
      // TODO: handle exception
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists.");
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong");
    } 

  }

  @Override
  @Transactional
  public AuthResponse authenticate(@Valid @RequestBody AuthRequest request) {
    try {
      UsernamePasswordAuthenticationToken auth =
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
      authenticationProvider.authenticate(auth); // db check
      
      Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());
      String token = jwtService.generateToken(optionalUser.get());
      //delete the other refresh tokens
      refreshTokenRepository.deleteByUser(optionalUser.get());
      //create a refresh token
      RefreshToken refreshToken = createRefreshToken(optionalUser.get());
      refreshTokenRepository.save(refreshToken);
      return new AuthResponse(token, refreshToken.getRefreshToken());

    } catch (Exception e) {
        System.out.println("[INFO] Wrong username or password.");
        //return new AuthResponse("[ERROR] Token can not be generated.");
        return null;
    }
  }
}
