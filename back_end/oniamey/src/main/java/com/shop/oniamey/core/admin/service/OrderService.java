package com.shop.oniamey.core.admin.service;

import com.shop.oniamey.core.admin.model.response.OrderResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface OrderService {
     List<OrderResponse> getAllOrder();
     List<OrderResponse> getAllOrder(Pageable pageable);
    OrderResponse getOrderById(Long id);
}
