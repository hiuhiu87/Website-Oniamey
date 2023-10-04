package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.ModifyAddressRequest;
import com.shop.oniamey.core.admin.service.AddressService;
import com.shop.oniamey.entity.Address;
import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.repository.AddressRepository;
import com.shop.oniamey.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    private AddressRepository addressRepository;

    private CustomerRepository customerRepository;

    @Autowired
    public void setAddressRepository(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Autowired
    public void setCustomerRepository(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    public String addAddress(ModifyAddressRequest modifyAddressRequest) {
        Optional<Customer> optionalCustomer = customerRepository.findById(modifyAddressRequest.getCustomerId());
        Optional<Address> optionalAddress = addressRepository.findByLineAndCityAndProvinceAndCountryaAndAndCustomer(modifyAddressRequest.getLine(), modifyAddressRequest.getCity(), modifyAddressRequest.getProvince(), modifyAddressRequest.getCountry(), modifyAddressRequest.getCustomerId());

        if (optionalCustomer.isPresent()) {
            return "Customer not found";
        }

        if (optionalAddress.isPresent()) {
            return "Address is already exist";
        }

        Address address = new Address();
        address.setLine(modifyAddressRequest.getLine());
        address.setCity(modifyAddressRequest.getCity());
        address.setProvince(modifyAddressRequest.getProvince());
        address.setCountry(modifyAddressRequest.getCountry());
        address.setCustomer(optionalCustomer.get());
        addressRepository.save(address);
        return "Add address success";
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
    public String getAddress(Long id) {
        return null;
    }

    @Override
    public String getAllAddress(Long idCustomer) {
        return null;
    }

    @Override
    public String getAllAddress() {
        return null;
    }
}
