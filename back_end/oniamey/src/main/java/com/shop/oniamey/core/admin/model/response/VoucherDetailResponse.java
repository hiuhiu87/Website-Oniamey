package com.shop.oniamey.core.admin.model.response;

import java.util.Date;

public interface VoucherDetailResponse {

    Long getId();

    String getVoucherName();

    String getVoucherCode();

    Long getQuantity();

    String getType();

    Double getMinimumDiscount();

    Double getMaximumDiscount();

    Date getStartDate();

    Date getEndDate();

    String getCreatedAt();

    String getUpdatedAt();

    String getCreatedBy();

    String getUpdatedBy();
}
