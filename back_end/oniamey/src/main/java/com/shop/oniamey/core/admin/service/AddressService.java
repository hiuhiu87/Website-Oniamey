package com.shop.oniamey.core.admin.service;

import com.shop.oniamey.core.admin.model.request.ModifyAddressRequest;

public interface AddressService {

    String addAddress(ModifyAddressRequest modifyAddressRequest);

    String deleteAddress(Long id);

    String updateAddress(ModifyAddressRequest modifyAddressRequest);

    String getAddress(Long id);

    String getAllAddress(Long idCustomer);

    String getAllAddress();

}
