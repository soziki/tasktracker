package com.emres.tasktracker.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.emres.tasktracker.util.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
  
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException e) {
    ErrorResponse r = new ErrorResponse(404, e.getMessage(), LocalDateTime.now());
    return new ResponseEntity<ErrorResponse>(r, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(ForbiddenException.class)
  public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e) {
    ErrorResponse r = new ErrorResponse(403, e.getMessage(), LocalDateTime.now());
    return new ResponseEntity<ErrorResponse>(r, HttpStatus.FORBIDDEN);
  }



}
