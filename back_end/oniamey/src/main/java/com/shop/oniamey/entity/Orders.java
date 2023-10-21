package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import com.shop.oniamey.infrastructure.constant.OrderStatus;
import com.shop.oniamey.infrastructure.constant.OrderType;
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

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_customer")
    private Customer customer;

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

    @Column(name = "completion_date")
    private Date completionDate;

    @Column(name = "type", nullable = false, length = 100)
    @Enumerated(EnumType.STRING)
    private OrderType type;

    @Column(name = "note", nullable = false, length = 1000)
    private String note;

    @Column(name = "money_ship", nullable = false)
    private Double moneyShip;

    @Enumerated(EnumType.STRING)
    @Column( name = "status" ,length = 50)
    private OrderStatus status;

    @ManyToOne
    @JoinColumn(name = "id_voucher")
    private Voucher voucher;

    @Column(name ="code")
    private String code;
}
