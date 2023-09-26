package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.BrandRequest;
import com.shop.oniamey.core.admin.model.response.BrandResponse;
import com.shop.oniamey.core.admin.service.BrandService;
import com.shop.oniamey.entity.Brand;
import com.shop.oniamey.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {

    private BrandRepository brandRepository;

    @Autowired
    public void setBrandRepository(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<BrandResponse> getAll() {
        return brandRepository.getAll();
    }

    @Override
    public String save(BrandRequest request) {
        Optional<Brand> checkBrand = brandRepository.findByBrandName(request.getBrandName());

        if (checkBrand.isPresent()) {
            return "Brand đã tồn tại trong database";
        }

        Brand brand = new Brand();
        brand.setBrandName(request.getBrandName());
        brand.setStatus(request.getStatus());
        brandRepository.save(brand);

        return "Thêm Thương Hiệu Thành Công";
    }

    @Override
    public String update(Long id, BrandRequest request) {
        Optional<Brand> checkBrand = brandRepository.findById(id);
        if (checkBrand.isPresent()) {
            Brand brand = checkBrand.get();
            brand.setBrandName(request.getBrandName());
            brand.setStatus(request.getStatus());
            brandRepository.save(brand);
            return "Cập nhật thành công";
        } else {
            return "Không tìm thấy thương hiệu";
        }
    }

    @Override
    public String changeStatus(Long id, Integer status) {
        Optional<Brand> checkBrand = brandRepository.findById(id);

        if (status != 0 && status != 1) {
            return "Trạng thái không hợp lệ";
        }

        if (checkBrand.isPresent()) {
            brandRepository.updateBrandStatus(id, status);
            return "Cập nhật thành công";
        } else {
            return "Không tìm thấy thương hiệu";
        }
    }

}
