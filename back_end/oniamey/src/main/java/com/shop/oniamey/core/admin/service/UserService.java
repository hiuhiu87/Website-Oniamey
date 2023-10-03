package com.shop.oniamey.core.admin.service;

import com.shop.oniamey.core.admin.model.request.UserRequest;
import com.shop.oniamey.core.admin.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.model.response.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserDetailResponse getUserById(Long id);

    String createUser(UserRequest userRequest);

    String updateUser(Long id, UserRequest userRequest);

    String deleteUser(Long id);

}
