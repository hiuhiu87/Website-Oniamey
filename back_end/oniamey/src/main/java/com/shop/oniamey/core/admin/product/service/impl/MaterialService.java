package com.shop.oniamey.core.admin.product.service.impl;

import com.shop.oniamey.core.admin.product.model.request.PropertyRequest;
import com.shop.oniamey.core.admin.product.model.response.PropertyResponse;
import com.shop.oniamey.core.admin.product.service.IPropertyService;
import com.shop.oniamey.entity.Material;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.MaterialRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaterialService implements IPropertyService<Material, Long> {

    private final MaterialRepository materialRepository;

    private final ProductDetailRepository productDetailRepository;

    private final PropertyDeleteService propertyDeleteService;

    @Override
    public Material getById(Long id) throws DataNotFoundException {
        return materialRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Material not found with id: " + id));
    }

    @Override
    public List<PropertyResponse> getAll() {
        return materialRepository.getAll();
    }

    @Override
    public Material create(PropertyRequest propertyRequest) {
        Material material = new Material();
        material.setName(propertyRequest.getName());
        material.setDeleted(propertyRequest.getDeleted());
        return materialRepository.save(material);
    }

    @Override
    public Material update(Long id, PropertyRequest propertyRequest) throws DataNotFoundException {
        Material existingMaterial = getById(id);
        existingMaterial.setName(propertyRequest.getName());
        existingMaterial.setDeleted(propertyRequest.getDeleted());
        materialRepository.save(existingMaterial);
        return existingMaterial;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        Material existingMaterial = getById(id);
        existingMaterial.setDeleted(true);
        List<ProductDetail> existingProductDetail = productDetailRepository.findAllByMaterialId(existingMaterial.getId());
        for (ProductDetail productDetail : existingProductDetail) {
            propertyDeleteService.deleteProductDetail(productDetail);
        }
        materialRepository.save(existingMaterial);
    }
}