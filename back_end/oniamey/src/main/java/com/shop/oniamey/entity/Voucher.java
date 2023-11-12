package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "voucher")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Voucher extends BaseModel {

    @Column(name="voucher_name",nullable = false,length = 100)
    private String voucherName;

    @Column(name = "voucher_code",nullable = false,length = 100, unique = true)
    private String voucherCode;

    @Column(name = "quantity", nullable = false)
    private Long quantity;

    @Column(name = "value", nullable = false)
    private Double value;

    // Điều kiện
    @Column(name = "minimum_discount", nullable = false)
    private Double minimumDiscount;

    @Column(name = "maximum_discount", nullable = false)
    private Double maximumDiscount;

    @Column(name = "start_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "type", nullable = false)
    private String type;

}
