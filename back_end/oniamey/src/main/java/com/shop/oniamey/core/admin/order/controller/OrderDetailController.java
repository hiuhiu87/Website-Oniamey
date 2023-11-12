package com.shop.oniamey.core.admin.order.controller;

import com.shop.oniamey.core.admin.order.service.impl.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/order-detail")
@CrossOrigin("*")
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetail(@PathVariable Long id){
        return new ResponseEntity<>(orderDetailService.getOderDetailByOrderId(id), HttpStatus.OK);
    }
}
