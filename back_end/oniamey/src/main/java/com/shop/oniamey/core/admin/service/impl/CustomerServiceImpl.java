package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.ChangePasswordRequest;
import com.shop.oniamey.core.admin.model.request.ModifyCustomerRequest;
import com.shop.oniamey.core.admin.model.response.CustomerDetailResponse;
import com.shop.oniamey.core.admin.model.response.CustomerResponse;
import com.shop.oniamey.core.admin.service.CustomerService;
import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.repository.CustomerRepository;
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
        customer.setIsDeleted(modifyUserRequest.getIsDeleted());
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
        customer.setIsDeleted(modifyUserRequest.getIsDeleted());
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
        Boolean status = customer.getIsDeleted();
        customer.setIsDeleted(!status);
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
        Long endPage = totalPage / 5;
        if (totalPage % 5 != 0) {
            endPage = endPage + 1;
        }
        System.out.println(endPage);
        return endPage;
    }

}
