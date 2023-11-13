package com.shop.oniamey.core.admin.order.controller;

import com.shop.oniamey.core.admin.order.model.request.OrderPaymentMothodRequest;
import com.shop.oniamey.core.admin.order.service.impl.OrderPaymentMethodService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/order-payment-method")
@CrossOrigin("*")
public class OrderPaymentMethodController {
    @Autowired
    private OrderPaymentMethodService paymentMethodService;
    @PostMapping()
    public ResponseEntity<?> createOrderPaymentMethod(@RequestBody @Valid OrderPaymentMothodRequest orderPaymentMothodRequest){
        return new ResponseEntity<>(paymentMethodService.createOrderPaymentMethod(orderPaymentMothodRequest), HttpStatus.OK);
    }
    @GetMapping("/{idOrder}")
    public ResponseEntity<?> getOPM(@PathVariable Long idOrder){
        return new ResponseEntity<>(paymentMethodService.getOPM(idOrder),HttpStatus.OK);
    }
}
