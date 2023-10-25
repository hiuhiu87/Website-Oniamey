package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import com.shop.oniamey.infrastructure.constant.AuthenticationProvider;
import com.shop.oniamey.infrastructure.constant.RoleType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseModel {

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "identity_card", nullable = false, unique = true)
    private String identityCard;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "birth_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(name = "password")
    private String password;

    @Column(name = "address")
    private String address;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "gender", nullable = false)
    private Integer gender;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Column(name = "auth_provider")
    @Enumerated(EnumType.STRING)
    private AuthenticationProvider authProvider;

}
