package com.shop.oniamey.core.admin.order.service;

import com.shop.oniamey.core.admin.order.model.request.OrderDetailRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderDetailResponse;
import com.shop.oniamey.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface IOrderDetailService {
    List<OrderDetailResponse> getOderDetailByOrderId(Long id);
    String createOrderDetail(List<OrderDetailRequest> listOrderDetail);
}
