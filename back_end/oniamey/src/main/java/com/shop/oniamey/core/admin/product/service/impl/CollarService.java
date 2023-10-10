package com.shop.oniamey.core.admin.product.service.impl;

import com.shop.oniamey.core.admin.product.model.request.PropertyRequest;
import com.shop.oniamey.core.admin.product.model.response.PropertyResponse;
import com.shop.oniamey.core.admin.product.service.IPropertyService;
import com.shop.oniamey.entity.Collar;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.CollarRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CollarService implements IPropertyService<Collar, Long> {

    private final CollarRepository collarRepository;

    private final ProductDetailRepository productDetailRepository;

    private final PropertyDeleteService propertyDeleteService;

    @Override
    public Collar getById(Long id) throws DataNotFoundException {
        return collarRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Collar not found"));
    }

    @Override
    public List<PropertyResponse> getAll() {
        return collarRepository.getAll();
    }

    @Override
    public Collar create(PropertyRequest propertyRequest) {
        Collar collar = new Collar();
        collar.setName(propertyRequest.getName());
        collar.setCreatedBy(propertyRequest.getCreatedBy());
        collar.setUpdatedBy(propertyRequest.getUpdatedBy());
        return collarRepository.save(collar);
    }

    @Override
    public Collar update(Long id, PropertyRequest propertyRequest) throws DataNotFoundException {
        Collar existingCollar = getById(id);
        existingCollar.setName(propertyRequest.getName());
        existingCollar.setUpdatedBy(propertyRequest.getUpdatedBy());
        existingCollar.setDeleted(propertyRequest.getDeleted());
        collarRepository.save(existingCollar);
        return existingCollar;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        Collar existingCollar = getById(id);
        existingCollar.setDeleted(true);
        List<ProductDetail> existingProductDetail = productDetailRepository.findAllByCollarId(existingCollar.getId());
        for (ProductDetail productDetail : existingProductDetail) {
            propertyDeleteService.deleteProductDetail(productDetail);
        }
        collarRepository.save(existingCollar);
    }
}
