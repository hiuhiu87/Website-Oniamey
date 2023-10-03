package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Orders extends BaseModel {

    //    @ManyToOne
//    @JoinColumn(name = "id_user")
//    @Column(name = "id_user")
//    private Long user;

    //    @ManyToOne
//    @JoinColumn(name = "id_customer")
//    @Column(name = "id_customer")
//    private Long customer;

    @Column(name = "phone_number", nullable = false, length = 10)
    private String phoneNumber;

    @Column(name = "address", nullable = false, length = 800)
    private String address;

    @Column(name = "user_name", nullable = false, length = 50)
    private String userName;

    @Column(name = "total_money", nullable = false)
    private Double totalMoney;

    @Column(name = "confirmation_date", nullable = false)
    private Date confirmationDate;

    @Column(name = "ship_date", nullable = false)
    private Date shipDate;

    @Column(name = "receive_date", nullable = false)
    private Date receiveDate;

    @Column(name = "completion_date", nullable = false)
    private Date completionDate;

    @Column(name = "type", nullable = false, length = 100)
    private String type;

    @Column(name = "note", nullable = false, length = 1000)
    private String note;

    @Column(name = "money_ship", nullable = false)
    private Double moneyShip;
}
