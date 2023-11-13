package com.shop.oniamey.core.admin.customer.service.impl;

import com.shop.oniamey.core.admin.customer.model.request.ModifyCustomerRequest;
import com.shop.oniamey.core.admin.customer.model.response.CustomerDetailResponse;
import com.shop.oniamey.core.admin.customer.model.response.CustomerResponse;
import com.shop.oniamey.core.admin.customer.service.CustomerService;
import com.shop.oniamey.core.common.model.request.ChangePasswordRequest;
import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.repository.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public Page<List<CustomerResponse>> getAllCustomers(Pageable pageable) {
        return customerRepository.getAllCustomers(pageable);
    }

    @Override
    public CustomerDetailResponse getCustomerById(Long id) {
        return customerRepository.getCustomerById(id);
    }

    /**
     * @param modifyUserRequest - hứng request thêm user từ client
     * @return result - trả về kết quả thêm user
     */
    @Override
    public Object createCustomer(ModifyCustomerRequest modifyUserRequest) {

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
        getDataRequest(modifyUserRequest, customer);

        Long id = customerRepository.findByEmail(customer.getEmail()).get().getId();
        System.out.println(id);
        return id;
    }

    /**
     * @param id                - nhận id của user cần update
     * @param modifyUserRequest - hứng request update user từ client
     * @return result - trả về kết quả update user
     */
    @Override
    public String updateCustomer(Long id, ModifyCustomerRequest modifyUserRequest) {
        Optional<Customer> checkUser = customerRepository.findById(id);

        if (checkUser.isEmpty()) {
            return "Customer not found";
        }

        Customer customer = checkUser.get();
        customer.setId(id);
        getDataRequest(modifyUserRequest, customer);
        return "Update customer successfully";
    }

    /**
     * @param modifyUserRequest - hứng request thông tin user từ client
     * @param customer          - hứng thông tin user từ database
     */
    private void getDataRequest(ModifyCustomerRequest modifyUserRequest, Customer customer) {
        customer.setUsername(modifyUserRequest.getUsername());
        customer.setIdentityCard(modifyUserRequest.getIdentityCard());
        customer.setFullName(modifyUserRequest.getFullName());
        customer.setEmail(modifyUserRequest.getEmail());
        customer.setPhoneNumber(modifyUserRequest.getPhoneNumber());
        customer.setGender(modifyUserRequest.getGender());
        customer.setAvatar(modifyUserRequest.getAvatar());
        customer.setBirthDate(modifyUserRequest.getBirthDate());
        customer.setDeleted(modifyUserRequest.getIsDeleted());
        customerRepository.save(customer);
    }


    /**
     * @param id - nhận id của user cần cập nhật trạng thái
     * @return result - trả về kết quả cập nhật trạng thái
     */
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

    /**
     * @param id                    - nhận id của customer cần đổi mật khẩu
     * @param changePasswordRequest - hứng request đổi mật khẩu từ client
     * @return result - trả về kết quả đổi mật khẩu
     */
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

}
