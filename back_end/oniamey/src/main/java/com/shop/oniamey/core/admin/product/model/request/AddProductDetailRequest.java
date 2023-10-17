package com.shop.oniamey.core.admin.product.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddProductDetailRequest {

    private Long productId;

    private Long categoryId;

    private Set<Long> sizeId;

    private Long materialId;

    private Long brandId;

    private Set<Long> colorId;

    private Long collarId;

    private Long sleeveLengthId;

    private String name;

    private Boolean gender;

    private Float price;

    private Long quantity;

    private Float weight;

    private Boolean deleted;

}