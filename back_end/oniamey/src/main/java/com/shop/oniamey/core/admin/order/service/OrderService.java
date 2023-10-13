package com.shop.oniamey.core.admin.order.service;

import com.shop.oniamey.core.admin.order.model.request.OrderRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
     List<OrderResponse> getAllOrder();
    Page<OrderResponse> getAllOrder(Pageable pageable);
    OrderResponse getOrderById(Long id);
    String createOrder(OrderRequest orderRequest);
    String deleteOrder(Long id);
}
