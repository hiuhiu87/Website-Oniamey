package com.shop.oniamey.core.admin.order.service;

import com.shop.oniamey.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderDetailService extends JpaRepository<OrderDetail,Long> {
}
