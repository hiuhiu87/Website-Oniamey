package com.shop.oniamey.core.admin.service;

import com.shop.oniamey.core.admin.model.request.ModifyAddressRequest;

public interface AddressService {

    String addAddress(ModifyAddressRequest modifyAddressRequest);

    String deleteAddress(Long id);

    String updateAddress(ModifyAddressRequest modifyAddressRequest);

    String getAddressById(Long id);

    String getAllAddressByCustomerId(Long idCustomer);

    String getAllAddress();

}
