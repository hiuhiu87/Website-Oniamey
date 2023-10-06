package com.shop.oniamey.core.admin.controller;

import com.shop.oniamey.core.admin.model.request.ChangePasswordRequest;
import com.shop.oniamey.core.admin.model.request.ModifyCustomerRequest;
import com.shop.oniamey.core.admin.service.CustomerService;
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
@RequestMapping("/api/admin/customers")
@CrossOrigin("*")
public class CustomerRestController {

    private CustomerService customerService;

    @Autowired
    public void setCustomerService(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/get-all-customers/{page}")
    public ResponseEntity<?> getAllCustomers(@PathVariable int page) {
        Pageable pageable = Pageable.ofSize(5).withPage(page - 1);
        return new ResponseEntity<>(customerService.getAllCustomers(pageable), HttpStatus.OK);
    }

    @PostMapping("/create-user-customer")
    public ResponseEntity<?> createCustomer(@Valid @RequestBody ModifyCustomerRequest modifyCustomerRequest) {
        return new ResponseEntity<>(customerService.createCustomer(modifyCustomerRequest), HttpStatus.CREATED);
    }

    @GetMapping("/get-customer-by-id/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        return new ResponseEntity<>(customerService.getCustomerById(id), HttpStatus.OK);
    }


    @PutMapping("/update-customer-status/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id) {
        return new ResponseEntity<>(customerService.updateStatus(id), HttpStatus.OK);
    }

    @PutMapping("/update-customer/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @Valid @RequestBody ModifyCustomerRequest modifyCustomerRequest) {
        return new ResponseEntity<>(customerService.updateCustomer(id, modifyCustomerRequest), HttpStatus.OK);
    }

    @PutMapping("/change-password/{id}")
    public ResponseEntity<?> changePassword(@PathVariable Long id, @Valid @RequestBody ChangePasswordRequest request) {
        return new ResponseEntity<>(customerService.changePassword(id, request), HttpStatus.OK);
    }

}
