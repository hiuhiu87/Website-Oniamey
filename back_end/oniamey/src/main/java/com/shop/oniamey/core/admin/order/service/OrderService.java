package com.shop.oniamey.core.admin.order.service;

import com.shop.oniamey.core.admin.order.model.response.OrderResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
     List<OrderResponse> getAllOrder();
     List<OrderResponse> getAllOrder(Pageable pageable);
    OrderResponse getOrderById(Long id);
}
