package com.shop.oniamey.core.admin.order.controller;

import com.shop.oniamey.core.admin.order.model.request.OrderHistoryRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderHistoryResponse;
import com.shop.oniamey.core.admin.order.service.IOrderHistoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/order-history")
@CrossOrigin("*")
public class OrderHistoryController {
    @Autowired
    private IOrderHistoryService orderHistoryService;

    @GetMapping("/{id}")
    public List<OrderHistoryResponse> getById(@PathVariable  String id){
        return orderHistoryService.getOrderHistoryById(id);
    }

    @PostMapping("/create-order-history")
    public ResponseEntity<?> createOrderHistory(@RequestBody @Valid OrderHistoryRequest orderHistoryRequest){
        return new ResponseEntity<>(orderHistoryService.createOrderHistory(orderHistoryRequest), HttpStatus.OK);
    }
}
