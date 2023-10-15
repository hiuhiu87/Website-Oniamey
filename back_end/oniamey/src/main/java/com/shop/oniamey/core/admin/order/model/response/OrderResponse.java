package com.shop.oniamey.core.admin.order.model.response;

import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.entity.User;
import com.shop.oniamey.entity.base.BaseResponse;
import com.shop.oniamey.entity.base.EnumStatus;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface OrderResponse extends BaseResponse {

    Long getUserId();

    Long getCustomerId();

    String getPhoneNumber();

    String getAddress();

    String getUserName();

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
