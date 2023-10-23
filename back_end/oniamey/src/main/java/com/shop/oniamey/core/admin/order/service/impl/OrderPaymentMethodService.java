package com.shop.oniamey.core.admin.order.service.impl;

import com.shop.oniamey.core.admin.order.model.request.OrderPaymentMothodRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderPaymentMethodResponse;
import com.shop.oniamey.core.admin.order.service.IOrderPaymentMethodService;
import com.shop.oniamey.entity.OrderPaymentMethod;
import com.shop.oniamey.entity.Orders;
import com.shop.oniamey.repository.order.OrderPaymentMethodRepository;
import com.shop.oniamey.repository.order.OrderRepository;
import com.shop.oniamey.repository.order.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderPaymentMethodService implements IOrderPaymentMethodService {
    @Autowired
    private PaymentMethodService paymentMethodService;
    @Autowired
    private OrderPaymentMethodRepository orderPaymentMethodRepository;
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;
    @Autowired
    private OrderRepository orderRepository;
    public OrderPaymentMethod createOrderPaymentMethod(OrderPaymentMothodRequest orderPaymentMothodRequest){
        paymentMethodService.generate2Method();
        OrderPaymentMethod paymentMethod= new OrderPaymentMethod();
        paymentMethod.setDeleted(false);
        paymentMethod.setMoney(orderPaymentMothodRequest.getMoney());
        paymentMethod.setNote(orderPaymentMothodRequest.getDescription());
        if (orderRepository.findById(orderPaymentMothodRequest.getIdOrder()).isEmpty()){
            return null;
        }
        paymentMethod.setOrder(orderRepository.findById(orderPaymentMothodRequest.getIdOrder()).get());
        if (paymentMethodRepository.findById(orderPaymentMothodRequest.getIdMethod()).isEmpty()){
            return null;
        }
        paymentMethod.setPaymentMethod(paymentMethodRepository.findById(orderPaymentMothodRequest.getIdMethod()).get());
        return orderPaymentMethodRepository.save(paymentMethod);
    }
    public List<OrderPaymentMethodResponse> getOPM(Long idOrder){
        if(orderRepository.findById(idOrder).isEmpty()){
            return null;
        }
        return orderPaymentMethodRepository.getOrderPaymentMethodResponse(idOrder);
    }
}
