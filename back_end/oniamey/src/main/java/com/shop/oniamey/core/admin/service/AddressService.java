package com.shop.oniamey.core.admin.service;

import com.shop.oniamey.core.admin.model.request.ModifyAddressRequest;
import com.shop.oniamey.core.admin.model.response.AddressResponse;

import java.util.List;

public interface AddressService {

    String addAddress(ModifyAddressRequest modifyAddressRequest);

    String deleteAddress(Long id);

    String updateAddress(ModifyAddressRequest modifyAddressRequest);

    AddressResponse getAddressById(Long id);

    List<AddressResponse> getAllAddressByCustomerId(Long idCustomer);

    List<AddressResponse>  getAllAddress();

}
