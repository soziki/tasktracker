package com.emres.tasktracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emres.tasktracker.model.RefreshToken;
import com.emres.tasktracker.model.User;

import java.util.Optional;


public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer>{

  Optional<RefreshToken> findByRefreshToken(String refreshToken);
  void deleteByUser(User user);  

}
