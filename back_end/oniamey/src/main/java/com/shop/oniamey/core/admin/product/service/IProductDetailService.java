package com.shop.oniamey.core.admin.product.service;

import com.google.zxing.WriterException;
import com.shop.oniamey.core.admin.product.model.request.AddProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.request.DeleteProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.request.UpdateProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.response.ProductDetailResponse;
import com.shop.oniamey.core.admin.product.model.response.ProductResponse;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.io.IOException;
import java.util.List;

public interface IProductDetailService {

    Page<ProductDetailResponse> getAllWithPage(PageRequest pageRequest);

    List<ProductDetailResponse> getAll();

    ProductDetail getById(Long id) throws DataNotFoundException;

    Page<ProductDetailResponse> getAllByProductId(Long productId, PageRequest pageRequest);

    List<ProductDetailResponse> getAllByColorId(Long colorId);

    List<ProductDetail> create(AddProductDetailRequest addProductDetailRequest) throws IOException, DataNotFoundException, WriterException;

    ProductDetail update(Long id, UpdateProductDetailRequest updateProductDetailRequest) throws DataNotFoundException;

    void delete(Long id) throws DataNotFoundException;

//    void deleteByColorIdAndSizeId(DeleteProductDetailRequest deleteProductDetailRequest);

}
