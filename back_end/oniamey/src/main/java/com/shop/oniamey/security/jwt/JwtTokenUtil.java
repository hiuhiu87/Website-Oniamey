package com.shop.oniamey.security.jwt;

import com.shop.oniamey.core.admin.customer.service.CustomerService;
import com.shop.oniamey.core.admin.user.service.UserService;
import com.shop.oniamey.security.securitymodel.AuthUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Objects;

@Component
public class JwtTokenUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);
    private static final Long EXPIRE_DURATION = (long) (24 * 60 * 60 * 1000); //24 HOURS


    private UserService userService;

    private CustomerService customerService;

    @Value("${app.jwt.secret}")
    private String secretKey;

    @Autowired
    public void setCustomerService(CustomerService customerService) {
        this.customerService = customerService;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public String generateAccessToken(AuthUser authUser) {
        String role = "";
        Long id = null;
        if (Objects.equals(authUser.getClientProvider(), "Facebook") || Objects.equals(authUser.getClientProvider(), "Google")) {
            String email = authUser.getEmail();
            boolean isUser = userService.checkByEmail(email);
            boolean isCustomer = customerService.checkByEmail(email);
            if (isUser) {
                role = "ROLE_USER";
            } else if (isCustomer) {
                role = "ROLE_CUSTOMER";
            } else {
                role = "ROLE_ADMIN";
            }
        } else {
            if (authUser.getUser().getRole().name().equals("ROLE_ADMIN")) {
                role = "ROLE_ADMIN";
            } else if (authUser.getUser().getRole().name().equals("ROLE_USER")) {
                role = "ROLE_USER";
            } else {
                role = "ROLE_CUSTOMER";
            }
        }

        if (authUser.getUser() != null) {
            id = authUser.getUser().getId();
        } else if (authUser.getCustomer() != null) {
            id = authUser.getCustomer().getId();
        }

        return Jwts.builder().setSubject(id + "," + authUser.getUsername()).claim("roles", role).setIssuer("NMH").setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION)).signWith(SignatureAlgorithm.HS256, secretKey).compact();
    }

    public boolean validateAccessToken(String accessToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken);
            return true;
        } catch (ExpiredJwtException expiredJwtException) {
            LOGGER.error("Access token expired", expiredJwtException);
        } catch (IllegalArgumentException illegalArgumentException) {
            LOGGER.error("Access token null", illegalArgumentException);
        } catch (MalformedJwtException malformedJwtException) {
            LOGGER.error("Access token invalid", malformedJwtException);
        } catch (UnsupportedJwtException unsupportedJwtException) {
            LOGGER.error("JWT is not supported", unsupportedJwtException);
        } catch (SignatureException signatureException) {
            LOGGER.error("Signature error", signatureException);
        }
        return false;
    }

    public String getSubject(String accessToken) {
        return parseClaims(accessToken).getSubject();
    }

    public Claims parseClaims(String accessToken) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody();
    }

}
