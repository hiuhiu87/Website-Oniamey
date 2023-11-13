package com.shop.oniamey.core.admin.product.model.response;

import java.util.Date;

public interface PropertyResponse {

    Long getId();

    String getName();

    Date getCreatedAt();

    Date getUpdatedAt();

    Long getCreatedBy();

    Long getUpdatedBy();

    Boolean getDeleted();

}