package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.ChangePasswordRequest;
import com.shop.oniamey.core.admin.model.request.ModifyUserRequest;
import com.shop.oniamey.core.admin.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.model.response.UserResponse;
import com.shop.oniamey.core.admin.service.UserService;
import com.shop.oniamey.entity.Role;
import com.shop.oniamey.entity.User;
import com.shop.oniamey.repository.RoleRepository;
import com.shop.oniamey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<UserResponse> getAllStaffs(Pageable pageable) {
        return userRepository.getAllUsers(pageable);
    }

    @Override
    public UserDetailResponse getUserById(Long id) {
        return userRepository.getUserDetailById(id);
    }

    @Override
    public String createStaff(ModifyUserRequest modifyUserRequest) {
        Optional<User> checkUser = userRepository.findByEmail(modifyUserRequest.getEmail());
        Optional<Role> role = roleRepository.findById(modifyUserRequest.getRoleId());

        if (checkUser.isPresent()) {
            return "Email already exists";
        }

        if (modifyUserRequest.getPhoneNumber() != null) {
            checkUser = userRepository.findByPhoneNumber(modifyUserRequest.getPhoneNumber());
            if (checkUser.isPresent()) {
                return "Phone number already exists";
            }
        }

        if (!role.isPresent()) {
            return "Role not found";
        }

        User user = new User();
        user.setFullName(modifyUserRequest.getFullName());
        user.setEmail(modifyUserRequest.getEmail());
        user.setPhoneNumber(modifyUserRequest.getPhoneNumber());
        user.setGender(modifyUserRequest.getGender());
        user.setPassword(modifyUserRequest.getPassword());
        user.setAddress(modifyUserRequest.getAddress());
        user.setBirthDate(modifyUserRequest.getBirthDate());
        user.setAvatar(modifyUserRequest.getAvatar());
        user.setRole(role.get());
        user.setStatus(modifyUserRequest.getStatus());
        userRepository.save(user);
        return "Create staff success";
    }

    @Override
    public String updateStaff(Long id, ModifyUserRequest modifyUserRequest) {
        Optional<User> checkUser = userRepository.findById(id);
        Optional<Role> role = roleRepository.findById(modifyUserRequest.getRoleId());

        if (checkUser.isEmpty()) {
            return "User not found";
        }

        if (role.isEmpty()) {
            return "Role not found";
        }

        User user = checkUser.get();
        user.setFullName(modifyUserRequest.getFullName());
        user.setEmail(modifyUserRequest.getEmail());
        user.setPhoneNumber(modifyUserRequest.getPhoneNumber());
        user.setGender(modifyUserRequest.getGender());
        user.setAddress(modifyUserRequest.getAddress());
        user.setBirthDate(modifyUserRequest.getBirthDate());
        user.setAvatar(modifyUserRequest.getAvatar());
        user.setRole(role.get());
        user.setStatus(modifyUserRequest.getStatus());
        userRepository.save(user);
        return "Update staff success";
    }

    @Override
    public String changePassword(Long id, ChangePasswordRequest changePasswordRequest) {
        Optional<User> checkUser = userRepository.findById(id);
        if (checkUser.isEmpty()) {
            return "User not found";
        }
        User user = checkUser.get();
        if (!user.getPassword().equals(changePasswordRequest.getOldPassword())) {
            return "Old password is incorrect";
        }
        user.setPassword(changePasswordRequest.getNewPassword());
        userRepository.save(user);
        return "Change password success";
    }

    @Override
    public String updateStatus(Long id) {
        Optional<User> checkUser = userRepository.findById(id);
        if (checkUser.isEmpty()) {
            return "User not found";
        }
        User user = checkUser.get();
        if (user.getStatus() == 1) {
            user.setStatus(0);
        } else {
            user.setStatus(1);
        }
        userRepository.save(user);
        return "Update status success";
    }

}
