package com.shop.oniamey.core.admin.voucher.controller;

import com.shop.oniamey.core.admin.voucher.model.request.ModifyUpdateVoucherRequest;
import com.shop.oniamey.core.admin.voucher.model.request.ModifyVoucherRequest;
import com.shop.oniamey.core.admin.voucher.service.VoucherService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/vouchers")
@CrossOrigin("*")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @GetMapping("get-all-voucher")
    public ResponseEntity<?> getAllVouchers(){
        System.out.println(voucherService.getAllVouchers().size());
        return new ResponseEntity<>(voucherService.getAllVouchers(), HttpStatus.OK);
    }

    @GetMapping("get-all-voucher/{page}")
    public ResponseEntity<?> getAllVouchers(@PathVariable Integer page){
        Pageable pageable = Pageable.ofSize(5).withPage(page - 1);
        return new ResponseEntity<>(voucherService.getAllVouchers(pageable), HttpStatus.OK);
    }

    @GetMapping("get-search")
    public ResponseEntity<?> getSearch(@RequestParam(value = "code", required = false) String code ,
                                       @RequestParam(value = "type", required = false) String type,
                                       @RequestParam(value = "deleted", required = false) Boolean deleted){
        return new ResponseEntity<>(voucherService.search(code, type, deleted), HttpStatus.OK);
    }

    @GetMapping("get-search-by-code")
    public ResponseEntity<?> getSearchByCode(@RequestParam(value = "code", required = false) String code,
                                             @RequestParam(value = "type", required = false) String type){
        return new ResponseEntity<>(voucherService.searchByCode(code, type), HttpStatus.OK);
    }

    @GetMapping("get-one/{id}")
    public ResponseEntity<?> getVoucher(@PathVariable Long id){
        return new ResponseEntity<>(voucherService.getVoucherById(id), HttpStatus.OK);
    }

    @PostMapping("create-voucher")
    public ResponseEntity<?> createVoucher(@Valid @RequestBody ModifyVoucherRequest modifyVoucherRequest){
        return new ResponseEntity<>(voucherService.createVoucher(modifyVoucherRequest), HttpStatus.CREATED);
    }

    @PutMapping("update-voucher/{id}")
    public ResponseEntity<?> updateVoucher(@Valid @RequestBody ModifyUpdateVoucherRequest modifyUpdateVoucherRequest, @PathVariable Long id){
        return new ResponseEntity<>(voucherService.updateVoucher(id, modifyUpdateVoucherRequest), HttpStatus.OK);
    }

    @PutMapping("delete-voucher/{id}")
    public ResponseEntity<?> deleteVoucher(@PathVariable Long id){
        return new ResponseEntity<>(voucherService.deleteVoucher(id), HttpStatus.OK);
    }

    @GetMapping("get-total-page")
    public ResponseEntity<?> getTotalPage(){
        return new ResponseEntity<>(voucherService.getTotalPage(), HttpStatus.OK);
    }

}
