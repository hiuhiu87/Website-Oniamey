package com.shop.oniamey.infrastructure.config;

import com.shop.oniamey.entity.base.BaseModel;
import com.shop.oniamey.repository.customer.CustomerRepository;
import com.shop.oniamey.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<Long> {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuditorAwareImpl.class);

    private UserRepository userRepository;

    private CustomerRepository customerRepository;

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<Long> getCurrentAuditor() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("email: " + email);
        return Optional.ofNullable(userRepository.findByEmail(email).map(BaseModel::getId).orElseGet(() -> customerRepository.findByEmail(email).map(BaseModel::getId).orElse(null)));
    }

}
