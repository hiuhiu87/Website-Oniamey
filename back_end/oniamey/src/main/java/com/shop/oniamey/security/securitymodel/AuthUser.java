package com.shop.oniamey.security.securitymodel;

import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.entity.User;
import com.shop.oniamey.infrastructure.constant.RoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthUser implements UserDetails, OAuth2User {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthUser.class);

    private User user;

    private Customer customer;

    private OAuth2User oAuth2User;

    private String clientProvider;

    public AuthUser(User user) {
        this.user = user;
    }

    public AuthUser(Customer customer) {
        this.customer = customer;
    }

    public AuthUser(Customer customer, OAuth2User oAuth2User, String clientProvider) {
        this.customer = customer;
        this.oAuth2User = oAuth2User;
        this.clientProvider = clientProvider;
    }

    public AuthUser(User user, OAuth2User oAuth2User, String clientProvider) {
        this.user = user;
        this.oAuth2User = oAuth2User;
        this.clientProvider = clientProvider;
    }

    @Override
    public Map<String, Object> getAttributes() {
        if (oAuth2User != null) {
            LOGGER.info("oAuth2User: " + oAuth2User.getAttributes());
            return oAuth2User.getAttributes();
        } else {
            LOGGER.info("oAuth2User: null");
            return null;
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = "";
        if (user != null) {
            role = user.getRole().name();
        } else if (customer != null) {
            role = RoleType.ROLE_CUSTOMER.name();
        } else {
            if (oAuth2User != null) {
                String email = oAuth2User.getAttribute("email");
                if (email != null) {
                    if (email.equals("minhhieu12322132@gmail.com")) {
                        role = RoleType.ROLE_ADMIN.name();
                    } else {
                        role = RoleType.ROLE_USER.name();
                    }
                }
            }
        }
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
        return Set.of(authority);
    }

    @Override
    public String getPassword() {
        if (customer != null) {
            return customer.getPassword();
        } else {
            return user.getPassword();
        }
    }

    @Override
    public String getUsername() {
        if (oAuth2User != null) {
            return oAuth2User.getAttribute("name");
        } else if (customer != null) {
            return customer.getEmail();
        } else {
            return user.getEmail();
        }
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        if (oAuth2User != null) {
            return oAuth2User.getAttribute("email");
        } else if (customer != null) {
            return customer.getEmail();
        } else {
            return user.getEmail();
        }
    }

    public String getEmail() {
        if (oAuth2User != null) {
            return oAuth2User.getAttribute("email");
        } else if (customer != null) {
            return customer.getEmail();
        } else {
            return user.getEmail();
        }
    }

    public String getClientProvider() {
        return clientProvider;
    }


}
