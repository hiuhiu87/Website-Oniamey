package com.shop.oniamey.core.admin.product.model.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductDetailRequest {

    private Long sizeId;

    private Long colorId;

    @NotNull(message = "Price cannot be left blank!")
    @Positive(message = "Price must be valid positive number!")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be valid positive number!")
    private Float price;

    @NotNull(message = "Quantity cannot be left blank!")
    @Positive(message = "Quantity must be valid positive number!")
    private Long quantity;

    @NotNull(message = "Weight cannot be left blank!")
    @Positive(message = "Weight must be valid positive number!")
    @DecimalMin(value = "0.0", inclusive = false, message = "Weight must be valid positive number!")
    private Float weight;

    private Long updatedBy;

    private Boolean deleted;

}
