package com.shop.oniamey.core.admin.order.model.response;

public interface CountStatusResponse {
    Integer getAllStatus();

    Integer getPending();

    Integer getConfirmed();

    Integer getShipping();

    Integer getShipped();

    Integer getSuccess();

    Integer getCancel();

}
