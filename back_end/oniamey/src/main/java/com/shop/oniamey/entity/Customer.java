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
@Table(name = "customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Customer extends BaseModel {

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "identity_card", unique = true)
    private String identityCard;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "birth_date")
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(name = "password")
    private String password;

    @Column(name = "email",  nullable = true , unique = true)
    private String email;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "avatar")
    private String avatar;

}
