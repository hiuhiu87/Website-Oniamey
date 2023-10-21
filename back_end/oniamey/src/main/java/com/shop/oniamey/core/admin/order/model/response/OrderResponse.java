package com.shop.oniamey.core.admin.order.model.response;

import com.shop.oniamey.entity.base.BaseResponse;

import java.util.Date;

public interface OrderResponse extends BaseResponse {

    Long getUserId();

    Long getCustomerId();

    String getPhoneNumber();

    String getAddress();

    String getUserName();

    String getTenNhanVien();

    Double getTotalMoney();

    Date getConfirmationDate();

    Date getShipDate();

    Date getReceiveDate();

    Date getCompletionDate();

    String getType();

    String getNote();

    Double getMoneyShip();

    String getStatus();

    Date getCreatedAt();

    Date getUpdatedAt();

    String getCreatedBy();

    String getUpdatedBy();

    String getCode();

}
