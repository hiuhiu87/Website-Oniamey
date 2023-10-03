package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.UserRequest;
import com.shop.oniamey.core.admin.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.model.response.UserResponse;
import com.shop.oniamey.core.admin.service.UserService;
import com.shop.oniamey.entity.Role;
import com.shop.oniamey.entity.User;
import com.shop.oniamey.repository.RoleRepository;
import com.shop.oniamey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<UserResponse> getAllUsers() {
        return userRepository.getAllUsers();
    }

    @Override
    public UserDetailResponse getUserById(Long id) {
        return userRepository.getUserDetailById(id);
    }

    @Override
    public String createUser(UserRequest userRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(userRequest.getEmail());
        Optional<Role> optionalRole = roleRepository.findById(Long.valueOf(userRequest.getRole()));
        Optional<User> optionalUserByPhoneNumber = userRepository.findByPhoneNumber(userRequest.getPhoneNumber());

        if (optionalUser.isPresent()) {
            return "Email is already exist";
        }

        if (optionalUserByPhoneNumber.isPresent()) {
            return "Phone number is already exist";
        }

        if (!optionalRole.isPresent()) {
            return "Role is not exist";
        }

        User user = new User();
        user.setFullName(userRequest.getFullName());
        user.setEmail(userRequest.getEmail());
        user.setAddress(userRequest.getAddress());
        user.setAvatar(userRequest.getAvatar());
        user.setBirthDate(userRequest.getBirthDate());
        user.setGender(userRequest.getGender());
        user.setPhoneNumber(userRequest.getPhoneNumber());
        user.setRole(optionalRole.get());
        user.setPassword(userRequest.getPassword());
        userRepository.save(user);
        return "Create user success";
    }

    @Override
    public String updateUser(Long id, UserRequest userRequest) {
        return null;
    }

    @Override
    public String deleteUser(Long id) {
        return null;
    }
}
