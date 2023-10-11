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

    @Column(name = "line", nullable = false)
    private String line; // số nhà, tên đường

    @Column(name = "ward", nullable = false)
    private String ward; // phường

    @Column(name = "city", nullable = false)
    private String city; // thành phố

    @Column(name = "province", nullable = false)
    private String province; // tỉnh

    @Column(name = "country", nullable = false)
    private String country; // quốc gia

    @Column(name = "is_default", nullable = false)
    private Boolean isDefault; // địa chỉ mặc định

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

}
