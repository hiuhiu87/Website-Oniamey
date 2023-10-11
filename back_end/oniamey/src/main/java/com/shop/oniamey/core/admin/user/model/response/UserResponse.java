package com.shop.oniamey.core.admin.user.model.response;

import com.shop.oniamey.entity.Role;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

public interface UserResponse {

    Long getId();

    String getFullName();

    String getEmail();

    String getPhoneNumber();

    String getRole();

    Integer getGender();

    String getAddress();

    String getAvatar();

    String getBirthDate();

    String getCreatedAt();

    String getUpdatedAt();

    String getCreatedBy();

    String getUpdatedBy();

}
