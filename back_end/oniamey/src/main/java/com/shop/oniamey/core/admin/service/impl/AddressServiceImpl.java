package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.ModifyAddressRequest;
import com.shop.oniamey.core.admin.model.response.AddressResponse;
import com.shop.oniamey.core.admin.service.AddressService;
import com.shop.oniamey.entity.Address;
import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.repository.AddressRepository;
import com.shop.oniamey.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
        Optional<Customer> checkCustomer = customerRepository.findById(modifyAddressRequest.getCustomerId());
        Optional<Address> checkAddress = addressRepository.findByLineAndWardAndCityAndProvinceAndCountryAndCustomerId(modifyAddressRequest.getLine(), modifyAddressRequest.getWard(), modifyAddressRequest.getCity(), modifyAddressRequest.getProvince(), modifyAddressRequest.getCountry(), modifyAddressRequest.getCustomerId());

        if (checkCustomer.isEmpty()) {
            return "Customer not found";
        }

        if (checkAddress.isPresent()) {
            return "Address already exists";
        }

        Address address = new Address();
        address.setLine(modifyAddressRequest.getLine());
        address.setWard(modifyAddressRequest.getWard());
        address.setCity(modifyAddressRequest.getCity());
        address.setProvince(modifyAddressRequest.getProvince());
        address.setCountry(modifyAddressRequest.getCountry());
        address.setCustomer(checkCustomer.get());
        address.setIsDefault(modifyAddressRequest.getIsDefault());
        address.setIsDeleted(modifyAddressRequest.getIsDeleted());
        addressRepository.save(address);
        return "Add address success";
    }

    @Override
    public String deleteAddress(Long id) {
        Optional<Address> checkAddress = addressRepository.findById(id);
        if (checkAddress.isPresent()) {
            addressRepository.deleteById(id);
            return "Delete address success";
        }
        return null;
    }

    @Override
    public String updateAddress(ModifyAddressRequest modifyAddressRequest) {
        Optional<Customer> checkCustomer = customerRepository.findById(modifyAddressRequest.getCustomerId());
        Optional<Address> checkAddress = addressRepository.findByLineAndWardAndCityAndProvinceAndCountryAndCustomerId(modifyAddressRequest.getLine(), modifyAddressRequest.getWard(), modifyAddressRequest.getCity(), modifyAddressRequest.getProvince(), modifyAddressRequest.getCountry(), modifyAddressRequest.getCustomerId());

        if (checkCustomer.isEmpty()) {
            return "Customer not found";
        }

        if (checkAddress.isEmpty()) {
            return "Address not found";
        }

        Address address = checkAddress.get();
        address.setLine(modifyAddressRequest.getLine());
        address.setWard(modifyAddressRequest.getWard());
        address.setCity(modifyAddressRequest.getCity());
        address.setProvince(modifyAddressRequest.getProvince());
        address.setCountry(modifyAddressRequest.getCountry());
        address.setCustomer(checkCustomer.get());
        address.setIsDefault(modifyAddressRequest.getIsDefault());
        address.setIsDeleted(modifyAddressRequest.getIsDeleted());
        addressRepository.save(address);
        return "Update address success";
    }

    @Override
    public AddressResponse getAddressById(Long id) {
        return null;
    }

    @Override
    public List<AddressResponse> getAllAddressByCustomerId(Long idCustomer) {
        Optional<Customer> checkCustomer = customerRepository.findById(idCustomer);
        if (checkCustomer.isEmpty()) {
            return null;
        }
        return addressRepository.getAllAddressByCustomerId(idCustomer);
    }

    @Override
    public List<AddressResponse> getAllAddress() {
        return null;
    }
}
