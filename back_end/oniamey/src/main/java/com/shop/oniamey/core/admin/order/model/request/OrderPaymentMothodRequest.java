package com.shop.oniamey.core.admin.order.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderPaymentMothodRequest {
    @NotNull
    private Long idOrder;
    @NotNull
    private Long idMethod;
    @NotNull
    private Double money;

    private String description;

}
