package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.response.OrderResponse;
import com.shop.oniamey.core.admin.service.OrderService;
import com.shop.oniamey.infrastructure.exception.RestApiException;
import com.shop.oniamey.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<OrderResponse> getAllOrder(){

        return orderRepository.findAllOrder();
    }

    @Override
    public List<OrderResponse> getAllOrder(Pageable pageable) {
        return orderRepository.findAllOrder(pageable);
    }

    @Override
    public OrderResponse getOrderById(Long id) {
         if(orderRepository.getOrdersById(id).isPresent()){
             return orderRepository.getOrdersById(id).get();
         }
         throw new RestApiException("ORDER NOT EXISTS");
    }
}
