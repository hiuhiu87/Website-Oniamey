package com.shop.oniamey.security.jwt;

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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);
    private static final Long EXPIRE_DURATION = (long) (24 * 60 * 60 * 1000); //24 HOURS

//    private static final Long EXPIRE_DURATION = (long) (60 * 1000); //24 HOURS

    @Value("${app.jwt.secret}")
    private String secretKey;

    public String generateAccessToken(AuthUser authUser) {
        return Jwts.builder().setSubject(authUser.getId() + "," + authUser.getUsername()).claim("roles", authUser.getRole()).setIssuer("NMH").setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION)).signWith(SignatureAlgorithm.HS256, secretKey).compact();
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
