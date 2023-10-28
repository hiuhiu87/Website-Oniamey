package com.shop.oniamey.core.admin.user.service;

import com.shop.oniamey.core.admin.user.model.response.CurrentUserResponse;
import com.shop.oniamey.core.common.model.request.ChangePasswordRequest;
import com.shop.oniamey.core.admin.user.model.request.ModifyUserRequest;
import com.shop.oniamey.core.admin.user.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.user.model.response.UserResponse;
import com.shop.oniamey.entity.User;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<UserResponse> getAllStaffs(Pageable pageable);

    List<UserResponse> getAllUsers();

    UserDetailResponse getUserById(Long id);

    String createStaff(ModifyUserRequest modifyUserRequest);

    String updateStaff(Long id, ModifyUserRequest modifyUserRequest);

    String updateStatus(Long id);

    String changePassword(Long id, ChangePasswordRequest changePasswordRequest);

    Long getTotalPage();

    boolean checkByEmail(String email);

    User getUserByEmail(String email);

    String registerUserFacebook(User user);

    String getRoleByEmail(String email);

    CurrentUserResponse getCurrentUser(String email);

}
