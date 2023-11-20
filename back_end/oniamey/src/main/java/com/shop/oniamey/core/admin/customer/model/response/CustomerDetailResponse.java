package com.shop.oniamey.core.admin.customer.model.response;

public interface CustomerDetailResponse {

    Long getId();

    String getUsername();

    String getFullName();

    String getEmail();

    String getPhoneNumber();

    Integer getGender();

    String getAvatar();

    Boolean getIsDeleted();

    String getBirthDate();

    String getCreatedAt();

    String getUpdatedAt();

    String getCreatedBy();

    String getUpdatedBy();

}
