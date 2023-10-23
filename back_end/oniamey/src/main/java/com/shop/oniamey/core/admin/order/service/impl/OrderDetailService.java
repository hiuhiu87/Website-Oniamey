package com.shop.oniamey.core.admin.order.service.impl;

import com.shop.oniamey.core.admin.order.model.response.OrderDetailResponse;
import com.shop.oniamey.core.admin.order.service.IOrderDetailService;
import com.shop.oniamey.repository.order.OrderDetailRepository;
import com.shop.oniamey.repository.order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailService implements IOrderDetailService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Override
    public List<OrderDetailResponse> getOderDetailByOrderId(Long id) {
        if(orderRepository.findById(id).isPresent()){
            return orderDetailRepository.getOrderDetailByOrderId(id);
        }
        return null;
    }
}
