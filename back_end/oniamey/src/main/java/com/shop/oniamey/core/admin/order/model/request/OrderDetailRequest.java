package com.shop.oniamey.core.admin.order.model.request;

import com.shop.oniamey.entity.Orders;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderDetailRequest {
    @NotNull
    private Long idProductDetail;
    @NotNull
    private Long quantity;
    @NotNull
    private Double price;
    @NotNull
    private Double totalMoney;
    @NotNull
    private Long idOrder;
}
