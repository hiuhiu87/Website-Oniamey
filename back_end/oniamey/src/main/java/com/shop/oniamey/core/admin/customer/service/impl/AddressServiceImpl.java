package com.shop.oniamey.core.admin.customer.service.impl;

import com.shop.oniamey.core.admin.customer.model.request.ModifyAddressRequest;
import com.shop.oniamey.core.admin.customer.model.response.AddressResponse;
import com.shop.oniamey.core.admin.customer.service.AddressService;
import com.shop.oniamey.entity.Address;
import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.repository.customer.AddressRepository;
import com.shop.oniamey.repository.customer.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CustomerRepository customerRepository;

    /**
     * @param id - nhận id của địa chỉ cần set mặc định
     * @return trả về kết quả set mặc định
     */
    @Override
    public String setDefaultAddress(Long id) {
        Optional<Address> checkAddress = addressRepository.findById(id);
        if (checkAddress.isPresent()) {
            Address address = checkAddress.get();
            addressRepository.setDefaultAddress(address.getCustomer().getId());
            address.setIsDefault(true);
            addressRepository.save(address);
            return "Set default address success";
        } else {
            return "Address not found";
        }
    }

    /**
     * @param modifyAddressRequest - hứng request thêm địa chỉ từ client
     * @return result - trả về kết quả thêm địa chỉ
     */
    @Override
    public String addAddress(ModifyAddressRequest modifyAddressRequest) {
        Optional<Customer> checkCustomer = customerRepository.findById(modifyAddressRequest.getCustomerId());
        Optional<Address> checkAddress = addressRepository.findByLineAndWardAndDistrictAndProvinceAndCustomerIdAndDeletedIsFalse(modifyAddressRequest.getLine(), modifyAddressRequest.getWard(), modifyAddressRequest.getDistrict(), modifyAddressRequest.getProvince(), modifyAddressRequest.getCustomerId());

        if (checkCustomer.isEmpty()) {
            return "Customer not found";
        }

        if (checkAddress.isPresent()) {
            return "Address already exists";
        }

        Address address = new Address();
        getRequestData(modifyAddressRequest, checkCustomer, address);
        return "Add address success";
    }

    /**
     * @param modifyAddressRequest - hứng request thêm địa chỉ từ client
     * @param checkCustomer        - kiểm tra xem customer có tồn tại không
     * @param address              - địa chỉ cần thêm
     */
    private void getRequestData(ModifyAddressRequest modifyAddressRequest, Optional<Customer> checkCustomer, Address address) {
        address.setReceiverName(modifyAddressRequest.getReceiver());
        address.setReceiverPhoneNumber(modifyAddressRequest.getPhoneNumber());
        address.setLine(modifyAddressRequest.getLine());
        address.setWard(modifyAddressRequest.getWard());
        address.setDistrict(modifyAddressRequest.getDistrict());
        address.setProvince(modifyAddressRequest.getProvince());
        address.setCustomer(checkCustomer.get());
        address.setIsDefault(modifyAddressRequest.getIsDefault());
        address.setDeleted(modifyAddressRequest.getIsDeleted());
        addressRepository.save(address);
    }

    /**
     * @param id - nhận id của địa chỉ cần xóa
     * @return result - trả về kết quả xóa địa chỉ
     */
    @Override
    public String deleteAddress(Long id) {
        Optional<Address> checkAddress = addressRepository.findById(id);
        if (checkAddress.isEmpty()) {
            return "Address not found";
        }

        Address address = checkAddress.get();
        address.setDeleted(true);
        addressRepository.save(address);
        return "Delete address success";
    }

    /**
     *
     * @param id - nhận id của địa chỉ cần update
     * @param modifyAddressRequest - hứng request thông tin update địa chỉ từ client
     * @return result - trả về kết quả update địa chỉ
     */
    @Override
    public String updateAddress(Long id, ModifyAddressRequest modifyAddressRequest) {
        Optional<Customer> checkCustomer = customerRepository.findById(modifyAddressRequest.getCustomerId());
        Optional<Address> checkAddress = addressRepository.findById(id);

        if (checkCustomer.isEmpty()) {
            return "Customer not found";
        }

        if (checkAddress.isEmpty()) {
            return "Address not found";
        }

        Address address = checkAddress.get();
        getRequestData(modifyAddressRequest, checkCustomer, address);
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
