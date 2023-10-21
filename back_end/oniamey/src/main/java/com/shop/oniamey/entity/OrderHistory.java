package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import com.shop.oniamey.infrastructure.constant.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "order_history")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderHistory extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "id_order")
    private Orders order;

    @Column(name = "action_description",nullable = false,length = 1000)
    private String actionDescription;

    @Enumerated(EnumType.STRING)
    @Column( name = "status" ,length = 50)
    private OrderStatus status;

}
