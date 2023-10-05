package com.shop.oniamey.core.admin.model.response;

public interface VoucherDetailResponse {

    Long getId();

    String getVoucherName();

    String getVoucherCode();

    Long getQuantity();

    String getType();

    Double getMinimumDiscount();

    Double getMaximumDiscount();

    String getCreatedAt();

    String getUpdatedAt();

    String getCreatedBy();

    String getUpdatedBy();
}
