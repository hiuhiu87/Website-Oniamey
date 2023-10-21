package com.shop.oniamey.core.admin.order.service.impl;

import com.shop.oniamey.core.admin.order.model.request.OrderHistoryRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderHistoryResponse;
import com.shop.oniamey.core.admin.order.service.IOrderHistoryService;
import com.shop.oniamey.entity.OrderHistory;
import com.shop.oniamey.entity.Orders;
import com.shop.oniamey.repository.order.OrderHistoryRepository;
import com.shop.oniamey.repository.order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderHistoryService implements  IOrderHistoryService {
    @Autowired
    private OrderHistoryRepository orderHistoryRepo;

    @Autowired
    private OrderRepository orderRepository;
    @Override
    public List<OrderHistoryResponse> getOrderHistoryById(String id) {
        List<OrderHistoryResponse> listOrderHistory=orderHistoryRepo.getOrderHistoryById(id);
        listOrderHistory.sort(Comparator.comparing(OrderHistoryResponse::getCreatedAt));
        return listOrderHistory;
    }

    @Override
    public String createOrderHistory(OrderHistoryRequest orderHistoryRequest) {
        OrderHistory orderHistory= new OrderHistory();
        Optional<Orders> order= orderRepository.findById(orderHistoryRequest.getIdOrder());
        if (order.isEmpty()){
            return  "order id is not found" ;
        }
        orderHistory.setCreatedAt( new Date());
        orderHistory.setDeleted(false);
        orderHistory.setOrder(order.get());
        orderHistory.setStatus(orderHistoryRequest.getStatus());
        orderHistory.setActionDescription(orderHistoryRequest.getActionDescription());
        if (orderHistoryRepo.checkExists(orderHistoryRequest.getIdOrder(),orderHistoryRequest.getStatus().toString()).isPresent()){
            return "order history exists";
        }
         orderHistoryRepo.save(orderHistory);
         return   "create order history is success" ;
    }


}
