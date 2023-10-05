package com.shop.oniamey.core.admin.controller;

import com.shop.oniamey.core.admin.model.request.ModifyAddressRequest;
import com.shop.oniamey.core.admin.model.request.ModifyCustomerRequest;
import com.shop.oniamey.core.admin.model.request.ModifyUserRequest;
import com.shop.oniamey.core.admin.service.AddressService;
import com.shop.oniamey.core.admin.service.CustomerService;
import com.shop.oniamey.core.admin.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
public class ManageUserRestController {

    private UserService userService;

    private CustomerService customerService;
//
//    private AddressService addressService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setCustomerService(CustomerService customerService) {
        this.customerService = customerService;
    }
//
//    @Autowired
//    public void setAddressService(AddressService addressService) {
//        this.addressService = addressService;
//    }

    @GetMapping("/get-all-staffs/{page}")
    public ResponseEntity<?> getAllUsers(@PathVariable int page) {
        Pageable pageable = Pageable.ofSize(5).withPage(page - 1);
        return new ResponseEntity<>(userService.getAllStaffs(pageable), HttpStatus.OK);
    }

    @GetMapping("/get-all-customers/{page}")
    public ResponseEntity<?> getAllCustomers(@PathVariable int page) {
        Pageable pageable = Pageable.ofSize(5).withPage(page - 1);
        return new ResponseEntity<>(customerService.getAllCustomers(pageable), HttpStatus.OK);
    }

    @PostMapping("/create-user-staff")
    public ResponseEntity<?> createStaff(@Valid @RequestBody ModifyUserRequest modifyUserRequest) {
        return new ResponseEntity<>(userService.createStaff(modifyUserRequest), HttpStatus.CREATED);
    }

    @PostMapping("/create-user-customer")
    public ResponseEntity<?> createCustomer(@Valid @RequestBody ModifyCustomerRequest modifyCustomerRequest) {
        return new ResponseEntity<>(customerService.createCustomer(modifyCustomerRequest), HttpStatus.CREATED);
    }

    @GetMapping("/get-staff-by-id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("/get-customer-by-id/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        return new ResponseEntity<>(customerService.getCustomerById(id), HttpStatus.OK);
    }

    @PutMapping("/update-staff-status/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id) {
        return new ResponseEntity<>(userService.updateStatus(id), HttpStatus.OK);
    }
//
//    @PostMapping("/add-address-customer")
//    public ResponseEntity<?> addAddressCustomer(@Valid @RequestBody ModifyAddressRequest modifyAddressRequest) {
//        return new ResponseEntity<>(addressService.addAddress(modifyAddressRequest), HttpStatus.CREATED);
//    }

}
