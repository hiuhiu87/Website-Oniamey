package com.shop.oniamey.core.admin.order.model.request;

import com.shop.oniamey.infrastructure.constant.OrderStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistoryRequest {

    @Min(value = 1)
    private Long idOrder;

    @NotEmpty(message = "description is required")
    private String actionDescription;

    @NotNull(message = "status is required")
    private OrderStatus status;
}
