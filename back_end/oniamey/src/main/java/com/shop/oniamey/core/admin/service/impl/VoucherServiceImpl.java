package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.VoucherRequest;
import com.shop.oniamey.core.admin.model.response.VoucherDetailResponse;
import com.shop.oniamey.core.admin.model.response.VoucherResponse;
import com.shop.oniamey.core.admin.service.VoucherService;
import com.shop.oniamey.entity.Voucher;
import com.shop.oniamey.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public List<VoucherResponse> getAllVoucher() {
        return voucherRepository.getAllVoucher();
    }

    @Override
    public VoucherDetailResponse getVoucherById(Long id) {
        return voucherRepository.getVoucherDetailById(id);
    }

    @Override
    public String createVoucher(VoucherRequest voucherRequest) {
        Optional<Voucher> optionalVoucher = voucherRepository.findByVoucherCode(voucherRequest.getVoucherCode());
        Optional<Voucher> optionalVoucherType = voucherRepository.findByType(voucherRequest.getType());
        if(optionalVoucher.isPresent()){
            return "Voucher Code is already exist";
        }
        if(optionalVoucherType.isEmpty()){
            return "Voucher Type is not exist";
        }
        Voucher voucher = new Voucher();
        getAllVoucher(voucherRequest, voucher);
        return "Create voucher success";
    }

    @Override
    public String updateVoucher(Long id, VoucherRequest voucherRequest) {
        Optional<Voucher> optionalVoucher = voucherRepository.findById(id);
        if(optionalVoucher.isPresent()){
            voucherRepository.findById(id).map(voucher -> {
                getAllVoucher(voucherRequest, voucher);
                return "Update voucher success";
            });
        }else{
            return "Can't update voucher is not exist";
        }
        return "done";
    }

    private void getAllVoucher(VoucherRequest voucherRequest, Voucher voucher) {
        voucher.setVoucherCode(voucherRequest.getVoucherCode());
        voucher.setVoucherName(voucherRequest.getVoucherName());
        voucher.setType(voucherRequest.getType());
        voucher.setQuantity(voucherRequest.getQuantity());
        voucher.setMinimumDiscount(voucherRequest.getMinimumDiscount());
        voucher.setMaximumDiscount(voucherRequest.getMaximumDiscount());
        voucher.setStartDate(voucherRequest.getStartDate());
        voucher.setEndDate(voucherRequest.getEndDate());
        voucherRepository.save(voucher);
    }

    @Override
    public String deleteVoucher(Long id) {
        Optional<Voucher> optionalVoucher = voucherRepository.findById(id);
        if(optionalVoucher.isPresent()){
            voucherRepository.deleteById(id);
            return "Delete voucher success";
        }else{
            return "Can't delete voucher is not exist";
        }
    }
}
