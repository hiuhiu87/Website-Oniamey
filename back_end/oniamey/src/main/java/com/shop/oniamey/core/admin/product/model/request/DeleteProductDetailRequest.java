package com.shop.oniamey.core.admin.product.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteProductDetailRequest {

    private Long productId;
    private List<Long> sizeId;
    private List<Long> colorId;

}
