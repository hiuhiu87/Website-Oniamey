package com.shop.oniamey.core.admin.voucher.service.impl;

import com.shop.oniamey.core.admin.voucher.model.request.ModifyUpdateVoucherRequest;
import com.shop.oniamey.core.admin.voucher.model.request.ModifyVoucherRequest;
import com.shop.oniamey.core.admin.voucher.model.response.VoucherResponse;
import com.shop.oniamey.core.admin.voucher.service.VoucherService;
import com.shop.oniamey.entity.Voucher;
import com.shop.oniamey.repository.voucher.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Override
    public List<VoucherResponse> getAllVouchers(Pageable pageable) {
        return voucherRepository.getAllVoucher(pageable);
    }

    @Override
    public List<VoucherResponse> getAllVouchers() {
        return voucherRepository.getAllVoucher();
    }

    @Override
    public List<VoucherResponse> search(String code, String type, Boolean deleted) {
        return voucherRepository.search(code, type, deleted);
    }

    @Override
    public List<VoucherResponse> searchByCode(String code, String type) {
        return voucherRepository.searchByCode(code, type);
    }

    @Override
    public VoucherResponse getVoucherById(Long id) {
        Optional<Voucher> voucherFind = voucherRepository.findById(id);
        if(!voucherFind.isPresent()) {

        }
        return voucherRepository.getVoucherById(id).get();
    }

    @Override
    public String createVoucher(ModifyVoucherRequest modifyVoucherRequest) {
        Voucher voucher = new Voucher();
        voucher.setVoucherName(modifyVoucherRequest.getVoucherName());
        voucher.setVoucherCode(modifyVoucherRequest.getVoucherCode());
        voucher.setQuantity(modifyVoucherRequest.getQuantity());
        voucher.setValue(modifyVoucherRequest.getValue());
        voucher.setMinimumDiscount(modifyVoucherRequest.getMinimumDiscount());
        voucher.setMaximumDiscount(modifyVoucherRequest.getMaximumDiscount());
        voucher.setStartDate(modifyVoucherRequest.getStartDate());
        voucher.setEndDate(modifyVoucherRequest.getEndDate());
        voucher.setType(modifyVoucherRequest.getType());
        voucher.setCreatedBy(modifyVoucherRequest.getCreatedBy());
        voucher.setUpdatedBy(modifyVoucherRequest.getUpdatedBy());
        voucher.setDeleted(false);
        if(voucherRepository.save(voucher) != null){
            return "Add voucher success";
        }
        return "Error";
    }

    @Override
    public String updateVoucher(Long id, ModifyUpdateVoucherRequest modifyUpdateVoucherRequest) {
        Optional<Voucher> checkVoucher = voucherRepository.findById(id);
        if(checkVoucher.isEmpty()){
            return "Voucher not found";
        }
        Voucher voucher = checkVoucher.get();
        voucher.setVoucherCode(modifyUpdateVoucherRequest.getVoucherCode());
        voucher.setVoucherName(modifyUpdateVoucherRequest.getVoucherName());
        voucher.setStartDate(modifyUpdateVoucherRequest.getStartDate());
        voucher.setEndDate(modifyUpdateVoucherRequest.getEndDate());
        voucher.setQuantity(modifyUpdateVoucherRequest.getQuantity());
        voucher.setMinimumDiscount(modifyUpdateVoucherRequest.getMinimumDiscount());
        voucher.setMaximumDiscount(modifyUpdateVoucherRequest.getMaximumDiscount());
        voucher.setValue(modifyUpdateVoucherRequest.getValue());
        voucher.setType(modifyUpdateVoucherRequest.getType());
        voucher.setDeleted(modifyUpdateVoucherRequest.getDeleted());
        voucher.setCreatedBy(modifyUpdateVoucherRequest.getCreatedBy());
        voucher.setUpdatedBy(modifyUpdateVoucherRequest.getUpdatedBy());
        voucherRepository.save(voucher);
        return "Update voucher success";
    }

    @Override
    public String deleteVoucher(Long id) {
        Optional<Voucher> checkVoucher = voucherRepository.findById(id);
        if(checkVoucher.isEmpty()){
            return "Voucher not found";
        }
        checkVoucher.get().setDeleted(true);
        voucherRepository.save(checkVoucher.get());
        return "Delete voucher success";
    }

    @Override
    public Long getTotalPage() {
        Long totalVoucher = voucherRepository.count();
        Long totalPage = totalVoucher/5;
        if(totalVoucher % 5 != 0){
            totalPage += 1;
        }
        return totalPage;
    }
}
