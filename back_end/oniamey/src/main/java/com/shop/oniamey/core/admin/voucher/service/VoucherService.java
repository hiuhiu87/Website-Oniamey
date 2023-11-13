package com.shop.oniamey.core.admin.voucher.service;

import com.shop.oniamey.core.admin.voucher.model.request.ModifyUpdateVoucherRequest;
import com.shop.oniamey.core.admin.voucher.model.request.ModifyVoucherRequest;
import com.shop.oniamey.core.admin.voucher.model.response.VoucherResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VoucherService {

    List<VoucherResponse> getAllVouchers();

    List<VoucherResponse> getAllVouchers(Pageable pageable);

    List<VoucherResponse> search(String code, String type, Boolean deleted);

    List<VoucherResponse> searchByCode(String code, String type);

    VoucherResponse getVoucherById(Long id);

    String createVoucher(ModifyVoucherRequest modifyVoucherRequest);

    String updateVoucher(Long id, ModifyUpdateVoucherRequest modifyUpdateVoucherRequest);

    String deleteVoucher(Long id);

    Long getTotalPage();
}
