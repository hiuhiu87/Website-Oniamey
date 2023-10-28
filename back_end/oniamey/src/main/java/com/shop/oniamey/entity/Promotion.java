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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "promotion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Promotion extends BaseModel {

    @Column(name="promotion_name",nullable = false,length = 100)
    private String promotionName;

    @Column(name = "promotion_code",nullable = false,length = 100, unique = true)
    private String promotionCode;

    @Column(name = "value", nullable = false)
    private Double value;

//    @Column(name = "minimum_discount", nullable = false)
//    private Double minimumDiscount;
//
//    @Column(name = "maximum_discount", nullable = false)
//    private Double maximumDiscount;

    @Column(name = "start_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    @Column(name = "type", nullable = false)
    private String type;

}
