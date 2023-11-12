package com.shop.oniamey.core.admin.order.controller;

import com.shop.oniamey.core.admin.order.model.request.OrderRequest;
import com.shop.oniamey.core.admin.order.model.response.CountStatusResponse;
import com.shop.oniamey.core.admin.order.model.response.OrderResponse;
import com.shop.oniamey.core.admin.order.service.IOrderService;
import com.shop.oniamey.core.admin.order.service.impl.PaymentMethodService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private IOrderService orderService;

    @Autowired
    private PaymentMethodService paymentMethodService;
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(orderService.getAllOrder(), HttpStatus.OK);
    }


    @GetMapping("/detail/{id}")
    public OrderResponse detail(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @GetMapping()
    public Page<OrderResponse> getOrdersByStatus(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "5") int size,
                                                 @RequestParam(defaultValue = "none") String orderType,
                                                 @RequestParam(defaultValue = "none ") String keySearch,
                                                 @RequestParam(defaultValue = "ALL") String status) {
        Pageable pageable = PageRequest.of(page, size);
        paymentMethodService.generate2Method();
        return orderService.getOrdersByStatus(pageable, status,orderType,keySearch);
    }

    @GetMapping("/get-by-status")
    public List<OrderResponse> getByStatus(@RequestParam(defaultValue = "PENDING") String status) {
        return orderService.getByStatus(status);
    }

    @PostMapping()
    public String createOrder(@RequestBody @Valid OrderRequest orderRequest) {
        return orderService.createOrder(orderRequest);
    }

    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable("id") Long id) {
        return orderService.deleteOrder(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id, @RequestBody OrderRequest orderRequest) {
        return new ResponseEntity<>(orderService.updateOrder(id, orderRequest), HttpStatus.OK);
    }

    @GetMapping("/get-count-status")
    public CountStatusResponse getCountStatus( @RequestParam(defaultValue = "none") String orderType,
                                               @RequestParam(defaultValue = "none ") String keySearch) {
        return orderService.getCountStatus(orderType,keySearch);
    }

}