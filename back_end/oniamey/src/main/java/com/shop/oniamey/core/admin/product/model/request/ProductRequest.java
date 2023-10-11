package com.shop.oniamey.core.admin.product.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ProductRequest {

    private String code;

    private String name;

    private String description;

    private Long createdBy;

    private Long updatedBy;

    private Boolean deleted;

//    List<ProductDetailRequest> productDetail;

}
