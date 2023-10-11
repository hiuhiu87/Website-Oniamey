package com.shop.oniamey.core.admin.product.service;

import com.shop.oniamey.core.admin.product.model.request.AddProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.request.UpdateProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.response.ProductDetailResponse;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.exception.DataNotFoundException;

import java.io.IOException;
import java.util.List;

public interface IProductDetailService {

    List<ProductDetailResponse> getAll();

    ProductDetail getById(Long id) throws DataNotFoundException;

    List<ProductDetailResponse> getAllByProductId(Long productId);

    List<ProductDetail> create(AddProductDetailRequest addProductDetailRequest) throws IOException, DataNotFoundException;

    ProductDetail update(Long id, UpdateProductDetailRequest updateProductDetailRequest) throws DataNotFoundException;

    void delete(Long id) throws DataNotFoundException;

}
