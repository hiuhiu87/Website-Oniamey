package com.shop.oniamey.core.admin.product.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductDetailListResponse {

    private List<ProductDetailResponse> productDetails;

    private int totalPages;

}
