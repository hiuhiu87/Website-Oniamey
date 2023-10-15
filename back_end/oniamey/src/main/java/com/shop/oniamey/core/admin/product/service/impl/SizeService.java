package com.shop.oniamey.core.admin.product.service.impl;

import com.shop.oniamey.core.admin.product.model.request.PropertyRequest;
import com.shop.oniamey.core.admin.product.model.response.PropertyResponse;
import com.shop.oniamey.core.admin.product.service.IPropertyService;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.entity.Size;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import com.shop.oniamey.repository.product.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SizeService implements IPropertyService<Size, Long> {

    private final SizeRepository sizeRepository;

    private final ProductDetailRepository productDetailRepository;

    private final PropertyDeleteService propertyDeleteService;

    @Override
    public Size getById(Long id) throws DataNotFoundException {
        return sizeRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Size not found"));
    }

    @Override
    public List<PropertyResponse> getAll() {
        return sizeRepository.getAll();
    }

    @Override
    public Size create(PropertyRequest propertyRequest) {
        Size size = new Size();
        size.setName(propertyRequest.getName());
        size.setDeleted(propertyRequest.getDeleted());
        return sizeRepository.save(size);
    }

    @Override
    public Size update(Long id, PropertyRequest propertyRequest) throws DataNotFoundException {
        Size existingSize = getById(id);
        existingSize.setName(propertyRequest.getName());
        existingSize.setDeleted(propertyRequest.getDeleted());
        sizeRepository.save(existingSize);
        return existingSize;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        Size existingSize = getById(id);
        existingSize.setDeleted(true);
        List<ProductDetail> existingProductDetail = productDetailRepository.findAllBySizeId(existingSize.getId());
        for (ProductDetail productDetail : existingProductDetail) {
            propertyDeleteService.deleteProductDetail(productDetail);
        }
        sizeRepository.save(existingSize);
    }
}
