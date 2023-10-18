package com.shop.oniamey.core.admin.customer.service;

import com.shop.oniamey.core.common.model.request.ChangePasswordRequest;
import com.shop.oniamey.core.admin.customer.model.request.ModifyCustomerRequest;
import com.shop.oniamey.core.admin.customer.model.response.CustomerDetailResponse;
import com.shop.oniamey.core.admin.customer.model.response.CustomerResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {

    List<CustomerResponse> getAllCustomers(Pageable pageable);

    List<CustomerResponse> getAllCustomers();

    CustomerDetailResponse getCustomerById(Long id);

    Object createCustomer(ModifyCustomerRequest modifyUserRequest);

    String updateCustomer(Long id, ModifyCustomerRequest modifyUserRequest);

    String updateStatus(Long id);

    String changePassword(Long id, ChangePasswordRequest changePasswordRequest);

    Long getTotalPage();

    Long getTotalPageDeleted();

    Long getTotalPageActive();

    List<CustomerResponse> getTotalPageInactive(Pageable pageable);

    List<CustomerResponse> getTotalPageActive(Pageable pageable);

}
