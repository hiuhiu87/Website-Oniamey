package com.shop.oniamey.core.admin.order.controller;

import com.shop.oniamey.core.admin.order.model.request.OrderDetailRequest;
import com.shop.oniamey.core.admin.order.service.impl.OrderDetailService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping()
    public ResponseEntity<?> createOrderDetail(@RequestBody @Valid List<OrderDetailRequest> listOrderDetailRequest){
        return new ResponseEntity<>(orderDetailService.createOrderDetail(listOrderDetailRequest), HttpStatus.OK);
    }
}
