package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.ModifyUserRequest;
import com.shop.oniamey.core.admin.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.model.response.UserResponse;
import com.shop.oniamey.core.admin.service.UserService;
import com.shop.oniamey.entity.Role;
import com.shop.oniamey.entity.User;
import com.shop.oniamey.infrastructure.constant.RoleName;
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
        Optional<User> optionalUser = userRepository.findByEmail(modifyUserRequest.getEmail());
        Optional<User> optionalUserByPhoneNumber = userRepository.findByPhoneNumber(modifyUserRequest.getPhoneNumber());
        Role role = roleRepository.findByName(RoleName.ROLE_USER);

        if (optionalUser.isPresent()) {
            return "Email is already exist";
        }

        if (optionalUserByPhoneNumber.isPresent()) {
            return "Phone number is already exist";
        }

        User user = new User();
        user.setFullName(modifyUserRequest.getFullName());
        user.setEmail(modifyUserRequest.getEmail());
        user.setAddress(modifyUserRequest.getAddress());
        user.setAvatar(modifyUserRequest.getAvatar());
        user.setBirthDate(modifyUserRequest.getBirthDate());
        user.setGender(modifyUserRequest.getGender());
        user.setPhoneNumber(modifyUserRequest.getPhoneNumber());
        user.setRole(role);
        user.setPassword(modifyUserRequest.getPassword());
        user.setStatus(modifyUserRequest.getStatus());
        userRepository.save(user);
        return "Create user success";
    }

    @Override
    public String updateStaff(Long id, ModifyUserRequest modifyUserRequest) {
        Optional<User> optionalUser = userRepository.findById(id);
        Optional<User> optionalUserByPhoneNumber = userRepository.findByPhoneNumber(modifyUserRequest.getPhoneNumber());

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        if (optionalUserByPhoneNumber.isPresent()) {
            return "Phone number is already exist";
        }

        User user = optionalUser.get();
        user.setFullName(modifyUserRequest.getFullName());
        user.setEmail(modifyUserRequest.getEmail());
        user.setAddress(modifyUserRequest.getAddress());
        user.setAvatar(modifyUserRequest.getAvatar());
        user.setBirthDate(modifyUserRequest.getBirthDate());
        user.setGender(modifyUserRequest.getGender());
        user.setPhoneNumber(modifyUserRequest.getPhoneNumber());
        user.setPassword(modifyUserRequest.getPassword());
        user.setStatus(modifyUserRequest.getStatus());
        userRepository.save(user);
        return "Update staff success";
    }

    @Override
    public String updateStatus(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();
        Integer currentStatus = user.getStatus();
        if (currentStatus == 0) {
            user.setStatus(1);
        } else {
            user.setStatus(0);
        }
        userRepository.save(user);
        return "Update status success";
    }

}
