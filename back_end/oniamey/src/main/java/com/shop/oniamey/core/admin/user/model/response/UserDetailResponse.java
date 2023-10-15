package com.shop.oniamey.core.admin.user.model.response;

public interface UserDetailResponse {

    Long getId();

    String getFullName();

    String getEmail();

    String getPhoneNumber();

    String getRole();

    Integer getGender();

    String getAddress();

    String getAvatar();

    Boolean getIsDeleted();

    String getBirthDate();

    String getCreatedAt();

    String getUpdatedAt();

    String getCreatedBy();

    String getUpdatedBy();

}
