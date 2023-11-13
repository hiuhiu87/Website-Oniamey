package com.shop.oniamey.core.admin.user.controller;

import com.shop.oniamey.core.common.model.request.ChangePasswordRequest;
import com.shop.oniamey.core.admin.user.model.request.ModifyUserRequest;
import com.shop.oniamey.core.admin.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin("*")
public class UserRestController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-all-staffs/{page}")
    public ResponseEntity<?> getAllUsers(@PathVariable int page) {
        Pageable pageable = Pageable.ofSize(5).withPage(page - 1);
        return new ResponseEntity<>(userService.getAllStaffs(pageable), HttpStatus.OK);
    }

    @PostMapping("/create-user-staff")
    public ResponseEntity<?> createStaff(@Valid @RequestBody ModifyUserRequest modifyUserRequest) {
        return new ResponseEntity<>(userService.createStaff(modifyUserRequest), HttpStatus.CREATED);
    }

    @GetMapping("/get-staff-by-id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/update-staff-status/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id) {
        return new ResponseEntity<>(userService.updateStatus(id), HttpStatus.OK);
    }

    @PutMapping("/update-staff/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id, @Valid @RequestBody ModifyUserRequest modifyUserRequest) {
        return new ResponseEntity<>(userService.updateStaff(id, modifyUserRequest), HttpStatus.OK);
    }

    @PutMapping("/change-password-staff/{id}")
    public ResponseEntity<?> changePasswordStaff(@PathVariable Long id, @Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        return new ResponseEntity<>(userService.changePassword(id, changePasswordRequest), HttpStatus.OK);
    }

    @GetMapping("/get-all-staffs")
    public ResponseEntity<?> getAllCustomers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/total-page")
    public ResponseEntity<?> getTotalPage() {
        return new ResponseEntity<>(userService.getTotalPage(), HttpStatus.OK);
    }

}