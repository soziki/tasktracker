package com.emres.tasktracker.jwt;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
  
  public static final String SECRET_KEY = "Q4X5S6EgwPOQgYHq9yTmezZz+l3EXukxW5kDKAVRcbM="; // vercoskuyu1773

  public String generateToken(UserDetails userDetails) { // claims kısmı var
    // Map<String, UserRole> claimsMap = new HashMap<>();
    // claimsMap.put("role", UserRole.ADMIN);
    
    return Jwts.builder()
    .subject(userDetails.getUsername())
    .issuedAt(new Date())
    .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 2)) // token expiration time 
    .signWith(getKey(), Jwts.SIG.HS256)
    // .claims().add(claimsMap).and()
    .compact();
  }

  public Claims getClaims(String token) {
    Claims claims = Jwts.parser()
    .verifyWith(getKey()) //changed -> decryptWith() is buggy in RT.
    .build()
    .parseSignedClaims(token).getPayload();

    return claims;   
  }

  public <T> T extractToken(String token, Function<Claims, T> claimsFunction) {
    return claimsFunction.apply(getClaims(token));
  }

  public String getUsernameByToken(String token) {
    return extractToken(token, Claims::getSubject);
  }

  public boolean isTokenValid(String token) {
    return extractToken(token, Claims::getExpiration).after(new Date());
  }

  public Object getClaimsByKey(String token, String key) {
    Claims claims = getClaims(token);
    return claims.get(key);
  }

  public SecretKey getKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
