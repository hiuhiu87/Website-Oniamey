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
@Table(name = "address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address extends BaseModel {

    @Column(name = "receiver_name", nullable = false)
    private String receiverName; // tên người nhận

    @Column(name = "receiver_phone_number", nullable = false)
    private String receiverPhoneNumber; // số điện thoại người nhận

    @Column(name = "line", nullable = false)
    private String line; // số nhà, tên đường

    @Column(name = "ward", nullable = false)
    private String ward; // phường / xã

    @Column(name = "district", nullable = false)
    private String district; // quận / huyện

    @Column(name = "province", nullable = false)
    private String province; // tỉnh / thành phố

    @Column(name = "country", nullable = false)
    private String country; // quốc gia

    @Column(name = "is_default", nullable = false)
    private Boolean isDefault; // địa chỉ mặc định

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

}
