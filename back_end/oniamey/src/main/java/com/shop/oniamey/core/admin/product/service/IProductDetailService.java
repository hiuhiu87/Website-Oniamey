package com.shop.oniamey.core.admin.product.service;

import com.google.zxing.WriterException;
import com.shop.oniamey.core.admin.product.model.request.AddProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.request.UpdateProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.response.ProductDetailResponse;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;

import java.io.IOException;
import java.util.List;

public interface IProductDetailService {

    List<ProductDetailResponse> getAll();

    ProductDetail getById(Long id) throws DataNotFoundException;

    ProductDetailResponse getByCode(String code);

    List<ProductDetailResponse> getAllByProductId(Long productId);

    List<ProductDetailResponse> getAllByColorId(Long colorId);

    List<ProductDetail> create(AddProductDetailRequest addProductDetailRequest)
            throws IOException, DataNotFoundException, WriterException;

//    ProductDetail update(Long id, UpdateProductDetailRequest updateProductDetailRequest) throws DataNotFoundException;

    ProductDetail update(Long id, Long productId, UpdateProductDetailRequest updateProductDetailRequest)
            throws DataNotFoundException;

    void delete(Long id) throws DataNotFoundException;

}