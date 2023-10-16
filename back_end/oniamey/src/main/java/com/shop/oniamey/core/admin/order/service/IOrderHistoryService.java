package com.shop.oniamey.core.admin.order.service;

import com.shop.oniamey.entity.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderHistoryService extends JpaRepository<OrderHistory,Long> {
}