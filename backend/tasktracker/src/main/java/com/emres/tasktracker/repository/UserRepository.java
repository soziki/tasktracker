package com.emres.tasktracker.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.emres.tasktracker.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
  Optional<User> findByUsername(String username);
}
