package com.shop.oniamey.core.admin.order.service.impl;

import com.shop.oniamey.core.admin.order.service.IPaymentMethodService;
import com.shop.oniamey.entity.PaymentMethod;
import com.shop.oniamey.repository.order.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentMethodService implements IPaymentMethodService {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Override
    public void generate2Method() {
        if (paymentMethodRepository.findById(1L).isEmpty()){
            PaymentMethod paymentMethod=new PaymentMethod();
            paymentMethod.setMethodName("Tiền mặt");
            paymentMethod.setDescription("Thanh toán bằng tiền mặt");
            paymentMethod.setId(1L);
            paymentMethod.setDeleted(false);
            paymentMethodRepository.save(paymentMethod);
        }
        if (paymentMethodRepository.findById(2L).isEmpty()){
            PaymentMethod paymentMethod=new PaymentMethod();
            paymentMethod.setMethodName("Chuyển khoản");
            paymentMethod.setDescription("Thanh toán bằng chuyển khoản qua ngân hàng");
            paymentMethod.setId(2L);
            paymentMethod.setDeleted(false);
            paymentMethodRepository.save(paymentMethod);
        }
    }
}
