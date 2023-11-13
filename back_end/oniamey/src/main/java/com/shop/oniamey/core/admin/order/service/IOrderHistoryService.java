package com.shop.oniamey.core.admin.order.service;

import com.shop.oniamey.core.admin.order.model.request.OrderHistoryRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderHistoryResponse;
import com.shop.oniamey.entity.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface IOrderHistoryService {
    List<OrderHistoryResponse> getOrderHistoryById(String id);

    List<OrderHistoryResponse> createOrderHistory(OrderHistoryRequest orderHistoryRequest );
}
