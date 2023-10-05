package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "voucher_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoucherDetail extends BaseModel {

    @Column(name = "befor_price", nullable = false)
    private Double beforPrice;

    @Column(name = "after_price", nullable = false)
    private Double afterPrice;

    @Column(name = "discount_price", nullable = false)
    private Double discountPrice;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Voucher voucher;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders orders;

}
