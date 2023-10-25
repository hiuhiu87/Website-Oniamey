package com.shop.oniamey.security.securitymodel;

import com.shop.oniamey.core.admin.customer.service.impl.CustomerServiceImpl;
import com.shop.oniamey.core.admin.user.service.impl.UserServiceImpl;
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

    private UserServiceImpl userServiceImpl = new UserServiceImpl();

    private CustomerServiceImpl customerServiceImpl = new CustomerServiceImpl();

    public AuthUser(OAuth2User oAuth2User, String clientProvider) {
        this.oAuth2User = oAuth2User;
        this.clientProvider = clientProvider;
    }

    public AuthUser(User user) {
        this.user = user;
    }

    public AuthUser(Customer customer) {
        this.customer = customer;
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
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(getRole());
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
            return oAuth2User.getAttribute("name");
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

    public Long getId() {
        if (oAuth2User != null) {
            if (userServiceImpl.checkByEmail(oAuth2User.getAttribute("email"))) {
                return userServiceImpl.getUserByEmail(oAuth2User.getAttribute("email")).getId();
            } else if (customerServiceImpl.checkByEmail(oAuth2User.getAttribute("email"))) {
                return customerServiceImpl.getCustomerByEmail(oAuth2User.getAttribute("email")).getId();
            } else {
                return null;
            }
        } else if (customer != null) {
            return customer.getId();
        } else {
            return user.getId();
        }
    }

    public String getRole() {
        if (customer != null) {
            return RoleType.ROLE_CUSTOMER.name();
        } else if (user != null) {
            return user.getRole().name();
        } else if (oAuth2User != null) {
            String email = oAuth2User.getAttribute("email");
            if (userServiceImpl.checkByEmail(email)) {
                return userServiceImpl.getUserByEmail(email).getRole().name();
            } else if (customerServiceImpl.checkByEmail(email)) {
                return RoleType.ROLE_CUSTOMER.name();
            } else {
                return null;
            }

        } else {
            return null;
        }
    }


}
