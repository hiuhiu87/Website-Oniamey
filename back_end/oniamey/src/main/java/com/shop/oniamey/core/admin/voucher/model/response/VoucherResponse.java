package com.shop.oniamey.core.admin.voucher.model.response;

import java.util.Date;

public interface VoucherRespone {

    Long getId();

    String getVoucherName();

    String getVoucherCode();

    Long getQuantity();

    Double getValue();

    Double getMinimumDiscount();

    Double getMaximumDiscount();

    Date getStartDate();

    Date getEndDate();

    String getType();

    String getCreatedAt();

    String getUpdatedAt();

    String getCreatedBy();

    String getUpdatedBy();

}
