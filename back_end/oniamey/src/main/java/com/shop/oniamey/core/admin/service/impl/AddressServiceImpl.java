package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.ModifyAddressRequest;
import com.shop.oniamey.core.admin.service.AddressService;
import com.shop.oniamey.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    private AddressRepository addressRepository;

    @Autowired
    public void setAddressRepository(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public String addAddress(ModifyAddressRequest modifyAddressRequest) {
        return null;
    }

    @Override
    public String deleteAddress(Long id) {
        return null;
    }

    @Override
    public String updateAddress(ModifyAddressRequest modifyAddressRequest) {
        return null;
    }

    @Override
    public String getAddressById(Long id) {
        return null;
    }

    @Override
    public String getAllAddressByCustomerId(Long idCustomer) {
        return null;
    }

    @Override
    public String getAllAddress() {
        return null;
    }
}
