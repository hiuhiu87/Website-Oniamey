package com.shop.oniamey.core.admin.product.service.impl;

import com.shop.oniamey.core.admin.product.model.request.PropertyRequest;
import com.shop.oniamey.core.admin.product.model.response.PropertyResponse;
import com.shop.oniamey.core.admin.product.service.IPropertyService;
import com.shop.oniamey.entity.Category;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.repository.product.CategoryRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService implements IPropertyService<Category, Long> {

    private final CategoryRepository categoryRepository;

    private final ProductDetailRepository productDetailRepository;

    private final PropertyDeleteService propertyDeleteService;

    @Override
    public Category getById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new DateTimeException("Category not found"));
    }

    @Override
    public List<PropertyResponse> getAll() {
        return categoryRepository.getAll();
    }

    @Override
    public Category create(PropertyRequest propertyRequest) {
        Category category = new Category();
        category.setName(propertyRequest.getName());
        category.setDeleted(propertyRequest.getDeleted());
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Long id, PropertyRequest propertyRequest) {
        Category existingCategory = getById(id);
        existingCategory.setName(propertyRequest.getName());
        existingCategory.setDeleted(propertyRequest.getDeleted());
        categoryRepository.save(existingCategory);
        return existingCategory;
    }

    @Override
    public void delete(Long id) {
        Category existingCategory = getById(id);
        existingCategory.setDeleted(true);
        List<ProductDetail> existingProductDetail = productDetailRepository.findAllByCategoryId(existingCategory.getId());
        for (ProductDetail productDetail : existingProductDetail) {
            propertyDeleteService.deleteProductDetail(productDetail);
        }
        categoryRepository.save(existingCategory);
    }
}
