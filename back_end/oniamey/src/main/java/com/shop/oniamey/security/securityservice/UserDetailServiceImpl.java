package com.shop.oniamey.security.securityservice;

import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.entity.User;
import com.shop.oniamey.infrastructure.constant.AuthenticationProvider;
import com.shop.oniamey.repository.customer.CustomerRepository;
import com.shop.oniamey.repository.user.UserRepository;
import com.shop.oniamey.security.securitymodel.AuthUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailServiceImpl extends DefaultOAuth2UserService implements UserDetailsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailServiceImpl.class);
    private UserRepository userRepository;

    private CustomerRepository customerRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        Optional<Customer> customer = customerRepository.findByEmail(email);
        LOGGER.info("basic login");

        if (user.isPresent()) {
            LOGGER.info("user login");
            user.get().setAuthProvider(AuthenticationProvider.LOCAL);
            return new AuthUser(user.get());
        } else if (customer.isPresent()) {
            LOGGER.info("customer login");
            customer.get().setAuthProvider(AuthenticationProvider.LOCAL);
            return new AuthUser(customer.get());
        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String clientName = userRequest.getClientRegistration().getClientName();
        OAuth2User oAuth2User = super.loadUser(userRequest);
        LOGGER.info("oAuth2User login");
        return new AuthUser(oAuth2User, clientName);
    }

}
