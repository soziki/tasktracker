package com.emres.tasktracker.jwt;

import org.springframework.stereotype.Component;
import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken>{

  private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

  @Value("${jwt.auth.converter.principle-attribute}")
  private String principleAttribute;

  @Value("${jwt.auth.converter.resource-id}")
  private String resourceId;

  @Override
  public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
    Set<GrantedAuthority> authorities = Stream.concat(jwtGrantedAuthoritiesConverter.convert(jwt).stream(),   //Collectors.toSet() ? 
                            extractResourceRoles(jwt).stream()).collect(Collectors.toSet());
    
    return new JwtAuthenticationToken(jwt, authorities, getPrincipleClaimName(jwt));
    
  } 

  private String getPrincipleClaimName(Jwt jwt) {
    String claimName = JwtClaimNames.SUB;
    if(null != principleAttribute) {
      claimName = principleAttribute;
    }
    return jwt.getClaim(claimName);
  }

  private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
    Map<String, Object> resourceAccess; // resource access in json
    Map<String, Object> resource;       // myclient in json
    Collection<String> resourceRoles;   // resourceAccess -> roles in json

    if(null == jwt.getClaim("resource_access")) {
      return Set.of();
    }
    resourceAccess = jwt.getClaim("resource_access");

    if(null == resourceAccess.get(resourceId)) {
      return Set.of();
    }
    resource = (Map<String, Object>) resourceAccess.get(resourceId);

    if(null == resource.get("roles")) {
      return Set.of();
    }
    resourceRoles = (Collection<String>) resource.get("roles");
    
    return resourceRoles.stream()
            .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
            .collect(Collectors.toSet());
  }


  
}
