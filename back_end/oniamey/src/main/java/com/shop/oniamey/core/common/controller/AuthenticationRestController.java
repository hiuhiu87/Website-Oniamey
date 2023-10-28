package com.shop.oniamey.core.common.controller;

import com.shop.oniamey.core.admin.customer.service.CustomerService;
import com.shop.oniamey.core.admin.user.service.UserService;
import com.shop.oniamey.security.jwt.JwtTokenUtil;
import com.shop.oniamey.security.model.LoginRequest;
import com.shop.oniamey.security.model.LoginResponse;
import com.shop.oniamey.security.securitymodel.AuthUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationRestController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final UserService userService;

    private final CustomerService customerService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            System.out.println(loginRequest.getEmail());
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            AuthUser user = (AuthUser) authentication.getPrincipal();
            String accessToken = jwtTokenUtil.generateAccessToken(user);
            String role = user.getAuthorities().stream().findFirst().get().getAuthority();
            LoginResponse loginResponse = new LoginResponse(user.getUsername(), accessToken, role);
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } catch (BadCredentialsException badCredentialsException) {
            return new ResponseEntity<>("Login failed with wrong email or password", HttpStatus.UNAUTHORIZED);
        }
    }

}
