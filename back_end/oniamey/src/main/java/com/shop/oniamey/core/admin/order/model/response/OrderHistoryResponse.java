package com.shop.oniamey.core.admin.order.model.response;

import java.util.Date;

public interface OrderHistoryResponse {
    Date getCreatedAt();
    String getStatus();
    String getConfirmedBy();
    String getDescription();

}
