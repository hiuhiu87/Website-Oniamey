package com.shop.oniamey.core.admin.service;

import com.shop.oniamey.core.admin.model.request.ModifyUserRequest;
import com.shop.oniamey.core.admin.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.model.response.UserResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {

    List<UserResponse> getAllCustomers(Pageable pageable);

    UserDetailResponse getCustomerById(Long id);

    String createCustomer(ModifyUserRequest modifyUserRequest);

    String updateCustomer(Long id, ModifyUserRequest modifyUserRequest);

    String updateStatus(Long id);

}
