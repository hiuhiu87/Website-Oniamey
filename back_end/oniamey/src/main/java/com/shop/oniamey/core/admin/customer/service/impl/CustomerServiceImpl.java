package com.shop.oniamey.core.admin.customer.service.impl;

import com.shop.oniamey.core.common.model.request.ChangePasswordRequest;
import com.shop.oniamey.core.admin.customer.model.request.ModifyCustomerRequest;
import com.shop.oniamey.core.admin.customer.model.response.CustomerDetailResponse;
import com.shop.oniamey.core.admin.customer.model.response.CustomerResponse;
import com.shop.oniamey.core.admin.customer.service.CustomerService;
import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.repository.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository customerRepository;

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<CustomerResponse> getAllCustomers(Pageable pageable) {
        return customerRepository.getAllCustomers(pageable);
    }

    @Override
    public CustomerDetailResponse getCustomerById(Long id) {
        return customerRepository.getCustomerById(id);
    }

    @Override
    public String createCustomer(ModifyCustomerRequest modifyUserRequest) {

        Optional<Customer> checkUser = customerRepository.findByEmail(modifyUserRequest.getEmail());

        if (checkUser.isPresent()) {
            return "Email already exists";
        }

        if (modifyUserRequest.getPhoneNumber() != null) {
            checkUser = customerRepository.findByPhoneNumber(modifyUserRequest.getPhoneNumber());
            if (checkUser.isPresent()) {
                return "Phone number already exists";
            }
        }


        Customer customer = new Customer();
        customer.setFullName(modifyUserRequest.getFullName());
        customer.setEmail(modifyUserRequest.getEmail());
        customer.setPhoneNumber(modifyUserRequest.getPhoneNumber());
        customer.setGender(modifyUserRequest.getGender());
        customer.setAvatar(modifyUserRequest.getAvatar());
        customer.setBirthDate(modifyUserRequest.getBirthDate());
        customer.setDeleted(modifyUserRequest.getIsDeleted());
        customerRepository.save(customer);
        return "Create customer successfully";
    }

    @Override
    public String updateCustomer(Long id, ModifyCustomerRequest modifyUserRequest) {
        Optional<Customer> checkUser = customerRepository.findById(id);

        if (checkUser.isEmpty()) {
            return "Customer not found";
        }

        Customer customer = checkUser.get();
        customer.setId(id);
        customer.setFullName(modifyUserRequest.getFullName());
        customer.setEmail(modifyUserRequest.getEmail());
        customer.setPhoneNumber(modifyUserRequest.getPhoneNumber());
        customer.setGender(modifyUserRequest.getGender());
        customer.setAvatar(modifyUserRequest.getAvatar());
        customer.setBirthDate(modifyUserRequest.getBirthDate());
        customer.setDeleted(modifyUserRequest.getIsDeleted());
        customerRepository.save(customer);
        return "Update customer successfully";
    }


    @Override
    public String updateStatus(Long id) {
        Optional<Customer> checkUser = customerRepository.findById(id);
        if (checkUser.isEmpty()) {
            return "Customer not found";
        }
        Customer customer = checkUser.get();
        Boolean status = customer.getDeleted();
        customer.setDeleted(!status);
        customerRepository.save(customer);
        return "Update status successfully";
    }

    @Override
    public String changePassword(Long id, ChangePasswordRequest changePasswordRequest) {
        Optional<Customer> checkUser = customerRepository.findById(id);
        if (checkUser.isEmpty()) {
            return "Customer not found";
        }

        String oldPassword = changePasswordRequest.getOldPassword();
        if (!checkUser.get().getPassword().equals(oldPassword)) {
            return "Old password is incorrect";
        }
        String newPassword = changePasswordRequest.getNewPassword();
        Customer customer = checkUser.get();
        customer.setPassword(newPassword);
        customerRepository.save(customer);
        return "Change password successfully";
    }

    @Override
    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.getAllCustomers();
    }

    @Override
    public Long getTotalPage() {
        long totalPage = customerRepository.count();
        Long endPage = totalPage / 10;
        if (totalPage % 10 != 0) {
            endPage = endPage + 1;
        }
        System.out.println(endPage);
        return endPage;
    }

    @Override
    public Long getTotalPageDeleted() {
        return null;
    }

    @Override
    public Long getTotalPageActive() {
        return null;
    }

    @Override
    public List<CustomerResponse> getTotalPageInactive(Pageable pageable) {
        return null;
    }

    @Override
    public List<CustomerResponse> getTotalPageActive(Pageable pageable) {
        return null;
    }

}
