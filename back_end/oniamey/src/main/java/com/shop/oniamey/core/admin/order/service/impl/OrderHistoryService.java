package com.shop.oniamey.core.admin.order.service.impl;

import com.shop.oniamey.core.admin.order.model.request.OrderHistoryRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderHistoryResponse;
import com.shop.oniamey.core.admin.order.service.IOrderHistoryService;
import com.shop.oniamey.entity.OrderHistory;
import com.shop.oniamey.entity.Orders;
import com.shop.oniamey.repository.order.OrderHistoryRepository;
import com.shop.oniamey.repository.order.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class OrderHistoryService implements IOrderHistoryService {
    @Autowired
    private OrderHistoryRepository orderHistoryRepo;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<OrderHistoryResponse> getOrderHistoryById(String id) {
        List<OrderHistoryResponse> listOrderHistory = orderHistoryRepo.getOrderHistoryById(id);
        listOrderHistory.sort(Comparator.comparing(OrderHistoryResponse::getCreatedAt));
        return listOrderHistory;
    }

    @Transactional
    @Override
    public List<OrderHistoryResponse> createOrderHistory(OrderHistoryRequest orderHistoryRequest ) {

        Optional<Orders> order = orderRepository.findById(orderHistoryRequest.getIdOrder());
        if (order.isEmpty()) {
            return new ArrayList<>();
        }
        //chỉ cho phép tồn tại 1 bản ghi có cùng idOrder và status
        if (orderHistoryRepo.checkExists(orderHistoryRequest.getIdOrder(), orderHistoryRequest.getStatus().toString()).isPresent()) {
            return new ArrayList<>();
        }
        orderRepository.updateStatus(orderHistoryRequest.getStatus().toString(),orderHistoryRequest.getIdOrder());
        orderHistoryRepo.createOrderHistory(orderHistoryRequest.getIdOrder(),
                orderHistoryRequest.getActionDescription(),orderHistoryRequest.getStatus().toString());
        return getOrderHistoryById(orderHistoryRequest.getIdOrder().toString());
    }
}
