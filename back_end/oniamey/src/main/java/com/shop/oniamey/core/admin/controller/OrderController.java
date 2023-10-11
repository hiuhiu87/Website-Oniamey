package com.shop.oniamey.core.admin.controller;

import com.shop.oniamey.core.admin.model.response.OrderResponse;
import com.shop.oniamey.core.admin.service.OrderService;
import com.shop.oniamey.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping ("/all")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(orderService.getAllOrder(), HttpStatus.OK);
    }

    @GetMapping ()
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        return new ResponseEntity<>(orderService.getAllOrder(pageable), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public OrderResponse detail(@PathVariable Long id){
        return orderService.getOrderById(id);
    }


}
