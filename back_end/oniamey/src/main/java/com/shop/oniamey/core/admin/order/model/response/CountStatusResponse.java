package com.shop.oniamey.core.admin.order.model.response;

public interface CountStatusResponse {
    Integer getPending();
    Integer getAwaitingPickup();
    Integer getShipping();
    Integer getShipped();
    Integer getCancel();
    Integer getAwaitingPayment();
}
