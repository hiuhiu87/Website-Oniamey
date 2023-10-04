package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.ModifyUserRequest;
import com.shop.oniamey.core.admin.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.model.response.UserResponse;
import com.shop.oniamey.core.admin.service.CustomerService;
import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.entity.Role;
import com.shop.oniamey.entity.User;
import com.shop.oniamey.infrastructure.constant.RoleName;
import com.shop.oniamey.repository.CustomerRepository;
import com.shop.oniamey.repository.RoleRepository;
import com.shop.oniamey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private CustomerRepository customerRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<UserResponse> getAllCustomers(Pageable pageable) {
        return customerRepository.getAllUsers(pageable);
    }

    @Override
    public UserDetailResponse getCustomerById(Long id) {
        return null;
    }

    @Override
    public String createCustomer(ModifyUserRequest modifyUserRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(modifyUserRequest.getEmail());
        Optional<User> optionalUserByPhoneNumber = userRepository.findByPhoneNumber(modifyUserRequest.getPhoneNumber());
        Role role = roleRepository.findByName(RoleName.ROLE_CUSTOMER);

        if (optionalUser.isPresent()) {
            return "Email is already exist";
        }

        if (optionalUserByPhoneNumber.isPresent()) {
            return "Phone number is already exist";
        }

        User user = new User();
        user.setFullName(modifyUserRequest.getFullName());
        user.setEmail(modifyUserRequest.getEmail());
        user.setAddress(modifyUserRequest.getAddress());
        user.setAvatar(modifyUserRequest.getAvatar());
        user.setBirthDate(modifyUserRequest.getBirthDate());
        user.setGender(modifyUserRequest.getGender());
        user.setPhoneNumber(modifyUserRequest.getPhoneNumber());
        user.setRole(role);
        user.setPassword(modifyUserRequest.getPassword());
        user.setStatus(modifyUserRequest.getStatus());
        Customer customer = new Customer();
        customer.setUser(user);
        customer.setStatus(modifyUserRequest.getStatus());
        userRepository.save(user);
        customerRepository.save(customer);
        return "Create customer success";
    }

    @Override
    public String updateCustomer(Long id, ModifyUserRequest modifyUserRequest) {
        Optional<User> optionalUser = userRepository.findById(id);
        Optional<User> optionalUserByPhoneNumber = userRepository.findByPhoneNumber(modifyUserRequest.getPhoneNumber());
        Optional<Customer> optionalCustomer = customerRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        if (optionalUserByPhoneNumber.isPresent()) {
            return "Phone number is already exist";
        }

        if (optionalCustomer.isEmpty()) {
            return "Customer not found";
        }

        User user = optionalUser.get();
        user.setFullName(modifyUserRequest.getFullName());
        user.setEmail(modifyUserRequest.getEmail());
        user.setAddress(modifyUserRequest.getAddress());
        user.setAvatar(modifyUserRequest.getAvatar());
        user.setBirthDate(modifyUserRequest.getBirthDate());
        user.setGender(modifyUserRequest.getGender());
        user.setPhoneNumber(modifyUserRequest.getPhoneNumber());
        user.setPassword(modifyUserRequest.getPassword());
        user.setStatus(modifyUserRequest.getStatus());
        userRepository.save(user);
        Customer customer = optionalCustomer.get();
        customer.setStatus(modifyUserRequest.getStatus());
        customerRepository.save(customer);
        return "Update customer success";
    }

    @Override
    public String updateStatus(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        Optional<Customer> optionalCustomer = customerRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        if (optionalCustomer.isEmpty()) {
            return "Customer not found";
        }

        User user = optionalUser.get();
        Customer customer = optionalCustomer.get();
        if (user.getStatus() == 1) {
            user.setStatus(0);
            customer.setStatus(0);
        } else {
            user.setStatus(1);
            customer.setStatus(1);
        }
        userRepository.save(user);
        customerRepository.save(customer);
        return "Update status success";
    }

}
