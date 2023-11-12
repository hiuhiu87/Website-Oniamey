package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payments_method")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PaymentMethod extends BaseModel {


    @Column(name="method",nullable = false,length = 100)
    private String methodName;

    @Column(name="description" ,nullable = false, length = 1000)
    private String description;

}