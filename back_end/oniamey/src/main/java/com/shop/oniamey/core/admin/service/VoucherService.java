package com.shop.oniamey.core.admin.service;

import com.shop.oniamey.core.admin.model.request.UserRequest;
import com.shop.oniamey.core.admin.model.request.VoucherRequest;
import com.shop.oniamey.core.admin.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.model.response.VoucherDetailResponse;
import com.shop.oniamey.core.admin.model.response.VoucherResponse;

import java.util.List;

public interface VoucherService {

    List<VoucherResponse> getAllVoucher();

    VoucherDetailResponse getVoucherById(Long id);

    String createVoucher(VoucherRequest voucherRequest);

    String updateVoucher(Long id, VoucherRequest voucherRequest);

    String deleteVoucher(Long id);
}
