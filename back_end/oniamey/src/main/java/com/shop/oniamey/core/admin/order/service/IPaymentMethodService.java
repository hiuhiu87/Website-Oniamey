package com.shop.oniamey.core.admin.order.service;

import com.shop.oniamey.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface IPaymentMethodService {
    void generate2Method();
}
