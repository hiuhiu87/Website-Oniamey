package com.shop.oniamey.core.admin.controller;

import com.shop.oniamey.core.admin.model.request.ModifyAddressRequest;
import com.shop.oniamey.core.admin.service.AddressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/customer-addresses")
public class CustomerAddressController {

    private AddressService addressService;

    @Autowired
    public void setAddressService(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/get-all-address/{id}")
    public List<?> getAllAddressByCustomerId(@PathVariable Long id) {
        return addressService.getAllAddressByCustomerId(id);
    }

    @PostMapping("/create-address")
    public String createAddress(@Valid @RequestBody ModifyAddressRequest modifyAddressRequest) {
        return addressService.addAddress(modifyAddressRequest);
    }

    @PostMapping("/update-address")
    public String updateAddress(@Valid @RequestBody ModifyAddressRequest modifyAddressRequest) {
        return addressService.updateAddress(modifyAddressRequest);
    }



}
