package com.shop.oniamey.core.admin.product.service.impl;

import com.shop.oniamey.core.admin.product.model.request.PropertyRequest;
import com.shop.oniamey.core.admin.product.model.response.PropertyResponse;
import com.shop.oniamey.core.admin.product.service.IPropertyService;
import com.shop.oniamey.entity.Color;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.ColorRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorService implements IPropertyService<Color, Long> {

    private final ColorRepository colorRepository;

    private final ProductDetailRepository productDetailRepository;

    private final PropertyDeleteService propertyDeleteService;

    @Override
    public Color getById(Long id) throws DataNotFoundException {
        return colorRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Color not found"));
    }

    @Override
    public List<PropertyResponse> getAll() {
        return colorRepository.getAll();
    }

    @Override
    public Color create(PropertyRequest propertyRequest) {
        Color color = new Color();
        color.setName(propertyRequest.getName());
        color.setDeleted(propertyRequest.getDeleted());
        return colorRepository.save(color);
    }

    @Override
    public Color update(Long id, PropertyRequest propertyRequest) throws DataNotFoundException {
        Color existingColor = getById(id);
        existingColor.setName(propertyRequest.getName());
        existingColor.setDeleted(propertyRequest.getDeleted());
        colorRepository.save(existingColor);
        return existingColor;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        Color existingColor = getById(id);
        existingColor.setDeleted(true);
        List<ProductDetail> existingProductDetail = productDetailRepository.findAllByColorId(existingColor.getId());
        for (ProductDetail productDetail : existingProductDetail) {
            propertyDeleteService.deleteProductDetail(productDetail);
        }
        colorRepository.save(existingColor);
    }
}
