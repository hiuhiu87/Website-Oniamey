package com.shop.oniamey.core.admin.product.model.response;

import java.util.Date;

public interface ProductResponse {

    Long getId();

    String getCode();

    String getName();

    String getDescription();

    Date getCreatedAt();

    Date getUpdatedAt();

    Long getCreatedBy();

    Long getUpdatedBy();

    Boolean getDeleted();

}
