package com.shop.oniamey.core.admin.service;

import com.shop.oniamey.core.admin.model.request.ChangePasswordRequest;
import com.shop.oniamey.core.admin.model.request.ModifyUserRequest;
import com.shop.oniamey.core.admin.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.model.response.UserResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllStaffs(Pageable pageable);

    UserDetailResponse getUserById(Long id);

    String createStaff(ModifyUserRequest modifyUserRequest);

    String updateStaff(Long id, ModifyUserRequest modifyUserRequest);

    String updateStatus(Long id);

    String changePassword(Long id, ChangePasswordRequest changePasswordRequest);

}
