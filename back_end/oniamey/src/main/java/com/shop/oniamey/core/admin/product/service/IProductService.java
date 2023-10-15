package com.shop.oniamey.core.admin.product.service;

import com.google.zxing.WriterException;
import com.shop.oniamey.core.admin.product.model.request.ProductRequest;
import com.shop.oniamey.core.admin.product.model.response.ProductResponse;
import com.shop.oniamey.entity.Product;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.io.IOException;
import java.util.List;

public interface IProductService {

    Product getById(Long productId) throws DataNotFoundException;

    Page<ProductResponse> getAll(PageRequest pageRequest);

    List<ProductResponse> getAllProduct();

    Product create(ProductRequest createProductRequest) throws IOException, WriterException;

    Product update(Long id, ProductRequest productRequest) throws DataNotFoundException, IOException, WriterException;

    void delete(Long id) throws DataNotFoundException;

}
