package com.shop.oniamey.core.admin.service;

import com.shop.oniamey.core.admin.model.request.ChangePasswordRequest;
import com.shop.oniamey.core.admin.model.request.ModifyCustomerRequest;
import com.shop.oniamey.core.admin.model.response.CustomerDetailResponse;
import com.shop.oniamey.core.admin.model.response.CustomerResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {

    List<CustomerResponse> getAllCustomers(Pageable pageable);

    CustomerDetailResponse getCustomerById(Long id);

    String createCustomer(ModifyCustomerRequest modifyUserRequest);

    String updateCustomer(Long id, ModifyCustomerRequest modifyUserRequest);

    String updateStatus(Long id);

    String changePassword(Long id, ChangePasswordRequest changePasswordRequest);

}
