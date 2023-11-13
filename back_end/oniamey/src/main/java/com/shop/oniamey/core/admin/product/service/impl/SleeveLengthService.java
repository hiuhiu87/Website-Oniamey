package com.shop.oniamey.core.admin.product.service.impl;

import com.shop.oniamey.core.admin.product.model.request.PropertyRequest;
import com.shop.oniamey.core.admin.product.model.response.PropertyResponse;
import com.shop.oniamey.core.admin.product.service.IPropertyService;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.entity.SleeveLength;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import com.shop.oniamey.repository.product.SleeveLengthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SleeveLengthService implements IPropertyService<SleeveLength, Long> {

    private final SleeveLengthRepository sleeveLengthRepository;

    private final ProductDetailRepository productDetailRepository;

    private final PropertyDeleteService propertyDeleteService;

    @Override
    public SleeveLength getById(Long id) throws DataNotFoundException {
        return sleeveLengthRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("SleeveLenght not found"));
    }

    @Override
    public List<PropertyResponse> getAll() {
        return sleeveLengthRepository.getAll();
    }

    @Override
    public SleeveLength create(PropertyRequest propertyRequest) {
        SleeveLength sleeveLength = new SleeveLength();
        sleeveLength.setName(propertyRequest.getName());
        sleeveLength.setDeleted(propertyRequest.getDeleted());
        return sleeveLengthRepository.save(sleeveLength);
    }

    @Override
    public SleeveLength update(Long id, PropertyRequest propertyRequest) throws DataNotFoundException {
        SleeveLength existingSleeveLength = getById(id);
        existingSleeveLength.setName(propertyRequest.getName());
        existingSleeveLength.setDeleted(propertyRequest.getDeleted());
        sleeveLengthRepository.save(existingSleeveLength);
        return existingSleeveLength;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        SleeveLength existingSleeveLength = getById(id);
        existingSleeveLength.setDeleted(true);
        List<ProductDetail> existingProductDetail = productDetailRepository.findAllBySleeveLengthId(existingSleeveLength.getId());
        for (ProductDetail productDetail : existingProductDetail) {
            propertyDeleteService.deleteProductDetail(productDetail);
        }
        sleeveLengthRepository.save(existingSleeveLength);
    }
}