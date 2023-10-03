package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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


}
