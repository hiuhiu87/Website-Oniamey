package com.shop.oniamey.core.admin.product.service.impl;

import com.shop.oniamey.core.admin.product.model.request.PropertyRequest;
import com.shop.oniamey.core.admin.product.model.response.PropertyResponse;
import com.shop.oniamey.core.admin.product.service.IPropertyService;
import com.shop.oniamey.entity.Brand;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.BrandRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService implements IPropertyService<Brand, Long> {

    private final BrandRepository brandRepository;

    private final ProductDetailRepository productDetailRepository;

    private final PropertyDeleteService propertyDeleteService;


    @Override
    public Brand getById(Long id) throws DataNotFoundException {
        return brandRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Brand not found"));
    }

    @Override
    public List<PropertyResponse> getAll() {
        return brandRepository.getAll();
    }

    @Override
    public Brand create(PropertyRequest propertyRequest) {
        Brand brand = new Brand();
        brand.setName(propertyRequest.getName());
        brand.setCreatedBy(propertyRequest.getCreatedBy());
        brand.setUpdatedBy(propertyRequest.getUpdatedBy());
        return brandRepository.save(brand);
    }

    @Override
    public Brand update(Long id, PropertyRequest propertyRequest) throws DataNotFoundException {
        Brand existingBrand = getById(id);
        existingBrand.setName(propertyRequest.getName());
        existingBrand.setUpdatedBy(propertyRequest.getUpdatedBy());
        existingBrand.setDeleted(propertyRequest.getDeleted());
        brandRepository.save(existingBrand);
        return existingBrand;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        Brand existingBrand = getById(id);
        existingBrand.setDeleted(true);
        List<ProductDetail> existingProductDetail = productDetailRepository.findAllByBrandId(existingBrand.getId());
        for (ProductDetail productDetail : existingProductDetail) {
            propertyDeleteService.deleteProductDetail(productDetail);
        }
        brandRepository.save(existingBrand);
    }
}
