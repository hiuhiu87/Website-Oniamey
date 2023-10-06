package com.shop.oniamey.core.admin.controller;

import com.shop.oniamey.core.admin.model.request.UserRequest;
import com.shop.oniamey.core.admin.model.request.VoucherRequest;
import com.shop.oniamey.core.admin.service.UserService;
import com.shop.oniamey.core.admin.service.VoucherService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @GetMapping("/get-all-vouchers")
    public ResponseEntity<?> getAllVouchers() {
        return new ResponseEntity<>(voucherService.getAllVoucher(), HttpStatus.OK);
    }

    @PostMapping("/create-voucher")
    public ResponseEntity<?> createVoucher(@Valid @RequestBody VoucherRequest voucherRequest) {
        return new ResponseEntity<>(voucherService.createVoucher(voucherRequest), HttpStatus.CREATED);
    }

    @GetMapping("/get-voucher-by-id/{id}")
    public ResponseEntity<?> getVoucherById(@PathVariable Long id) {
        return new ResponseEntity<>(voucherService.getVoucherById(id), HttpStatus.OK);
    }

    @PutMapping("/update-voucher/{id}")
    public ResponseEntity<?> updateVoucher(@Valid @RequestBody VoucherRequest voucherRequest,@PathVariable Long id){
        return new ResponseEntity<>(voucherService.updateVoucher(id, voucherRequest), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-voucher/{id}")
    public ResponseEntity<?> deleteVoucher(@PathVariable Long id){
        return new ResponseEntity<>(voucherService.deleteVoucher(id), HttpStatus.OK);
    }
}
