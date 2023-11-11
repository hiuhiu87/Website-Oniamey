package com.shop.oniamey.core.admin.product.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductDetailRequest {

    private Long categoryId;

    private Long sizeId;

    private Long materialId;

    private Long brandId;

    private Long colorId;

    private Long collarId;

    private Long sleeveLengthId;

    private String name;

    private Boolean gender;

    private Float price;

    private Long quantity;

    private Float weight;

    private Long updatedBy;

    private Boolean deleted;

}