package com.shop.oniamey.core.admin.order.controller;

import com.shop.oniamey.core.admin.order.model.request.OrderRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderResponse;
import com.shop.oniamey.core.admin.order.service.IOrderService;
import jakarta.validation.Valid;
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
    private IOrderService orderService;

    @GetMapping ("/all")
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(orderService.getAllOrder(), HttpStatus.OK);
    }

    @GetMapping ()
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        return new ResponseEntity<>(orderService.getAllOrder(pageable),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public OrderResponse detail(@PathVariable Long id){
        return orderService.getOrderById(id);
    }

    @PostMapping()
    public String createOrder(@RequestBody @Valid OrderRequest orderRequest){
        return orderService.createOrder(orderRequest);
    }

    @DeleteMapping ("/{id}")
    public String deleteOrder(@PathVariable("id") Long id){
        return orderService.deleteOrder(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id, @RequestBody OrderRequest orderRequest){
        return new ResponseEntity<>(orderService.updateOrder(id,orderRequest),HttpStatus.OK);
    }
}
