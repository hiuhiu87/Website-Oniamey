package com.shop.oniamey.core.admin.customer.service;

import com.shop.oniamey.core.admin.customer.model.request.ModifyAddressRequest;
import com.shop.oniamey.core.admin.customer.model.response.AddressResponse;

import java.util.List;

public interface AddressService {

    String addAddress(ModifyAddressRequest modifyAddressRequest);

    String deleteAddress(Long id);

    String updateAddress(Long id, ModifyAddressRequest modifyAddressRequest);

    AddressResponse getAddressById(Long id);

    List<AddressResponse> getAllAddressByCustomerId(Long idCustomer);

    List<AddressResponse>  getAllAddress();

    String setDefaultAddress(Long id);

}
