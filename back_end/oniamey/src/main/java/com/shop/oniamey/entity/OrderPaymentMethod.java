package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "order_payment_method")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderPaymentMethod extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "id_payment_method")
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "id_order")
    private Orders order;
    @Column(name = "trading_code",nullable = false,length = 100)
    private String tradingCode;

}
