package com.shop.oniamey.security.jwt;

import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.entity.User;
import com.shop.oniamey.infrastructure.constant.AuthenticationProvider;
import com.shop.oniamey.infrastructure.constant.RoleType;
import com.shop.oniamey.security.securitymodel.AuthUser;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    public void setJwtTokenUtil(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!hasAuthorizationHeader(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        String accessToken = getAccessToken(request);
        if (!jwtTokenUtil.validateAccessToken(accessToken)) {
            filterChain.doFilter(request, response);
            return;
        }

        setAuthenticationContext(accessToken, request);
        filterChain.doFilter(request, response);
    }

    private void setAuthenticationContext(String accessToken, HttpServletRequest request) {
        UserDetails userDetails = getUserDetails(accessToken);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private UserDetails getUserDetails(String accessToken) {

        AuthUser authUser = new AuthUser();
        Claims claims = jwtTokenUtil.parseClaims(accessToken);
        String subject = (String) claims.get(Claims.SUBJECT);
        String role = (String) claims.get("roles");
        System.out.println("roles: " + role);
        String[] jwtsSubjects = subject.split(",");
        System.out.println("jwtsSubjects: " + jwtsSubjects[0] + " " + jwtsSubjects[1]);
        Long userId = Long.parseLong(jwtsSubjects[0]);
        String email = jwtsSubjects[1];

        if (role.equals("ROLE_CUSTOMER")) {
            Customer customer = new Customer();
            customer.setId(userId);
            customer.setEmail(email);
            authUser.setCustomer(customer);
            return authUser;
        } else if (role.equals("ROLE_USER") || role.equals("ROLE_ADMIN")) {
            User user = new User();
            user.setId(userId);
            user.setEmail(email);
            user.setRole(RoleType.valueOf(role));
            authUser.setUser(user);
            return authUser;
        } else {
            return null;
        }
    }

    private boolean hasAuthorizationHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        return !ObjectUtils.isEmpty(header) && header.startsWith("Bearer");
    }

    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        return header.split(" ")[1].trim();
    }


}
