package com.shop.oniamey.core.admin.order.service;

import com.shop.oniamey.entity.OrderPaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderPaymentMethodService extends JpaRepository<OrderPaymentMethod,Long> {
}