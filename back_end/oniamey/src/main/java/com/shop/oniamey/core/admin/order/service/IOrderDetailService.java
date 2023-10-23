package com.shop.oniamey.core.admin.order.service;

import com.shop.oniamey.core.admin.order.model.response.OrderDetailResponse;
import com.shop.oniamey.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderDetailService {
    List<OrderDetailResponse> getOderDetailByOrderId(Long id);
}
