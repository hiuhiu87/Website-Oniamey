package com.shop.oniamey.core.admin.product.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddProductDetailRequest {

    private Long productId;

    private Long categoryId;

    private List<Long> sizeId;

    private Long materialId;

    private Long brandId;

    private List<Long> colorId;

    private Long collarId;

    private Long sleeveLengthId;

    private List<String> names;

    private Boolean gender;

    private List<Float> prices;

    private List<Long> quantities;

    private Float weight;

    private Boolean deleted;
}
