package com.shop.oniamey.core.admin.service.impl;

import com.shop.oniamey.core.admin.model.request.CategoryRequest;
import com.shop.oniamey.core.admin.model.response.CategoryResponse;
import com.shop.oniamey.core.admin.service.CategoryService;
import com.shop.oniamey.entity.Category;
import com.shop.oniamey.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public void setCategoryRepository(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryResponse> getAll() {
        return categoryRepository.getAll();
    }

    @Override
    public String save(CategoryRequest categoryRequest) {
        Optional<Category> checkCategory = categoryRepository.findByCategoryName(categoryRequest.getCategoryName());

        if (checkCategory.isPresent()) {
            return "Category đã tồn tại trong database";
        }

        Category category = new Category();
        category.setCategoryName(categoryRequest.getCategoryName());
        category.setStatus(categoryRequest.getStatus());
        categoryRepository.save(category);
        return "Thêm Danh Mục Thành Công";
    }

    @Override
    public String update(Long id, CategoryRequest categoryRequest) {

        Optional<Category> checkCategory = categoryRepository.findById(id);

        if (checkCategory.isPresent()) {
            Category category = checkCategory.get();
            category.setCategoryName(categoryRequest.getCategoryName());
            category.setStatus(categoryRequest.getStatus());
            categoryRepository.save(category);
            return "Cập nhật thành công";
        } else {
            return "Không tìm thấy danh mục";
        }

    }

    @Override
    public String changeStatus(Long id, Integer status) {
        Optional<Category> checkCategory = categoryRepository.findById(id);
        if (checkCategory.isPresent()) {
            categoryRepository.updateCategoryStatus(id, status);
            return "Cập nhật thành công";
        } else {
            return "Không tìm thấy danh mục";
        }
    }

}
