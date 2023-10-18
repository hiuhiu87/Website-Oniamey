package com.shop.oniamey.core.admin.customer.model.response;

public interface CustomerDetailResponse {

    Long getId();

    String getUsername();

    String getIdentityCard();

    String getFullName();

    String getEmail();

    String getPhoneNumber();

    String getGender();

    String getAvatar();

    Boolean getIsDeleted();

    String getBirthDate();

    String getCreatedAt();

    String getUpdatedAt();

    String getCreatedBy();

    String getUpdatedBy();

}
