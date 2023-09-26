package com.shop.oniamey.core.admin.controller;

import com.shop.oniamey.core.admin.model.request.CategoryRequest;
import com.shop.oniamey.core.admin.model.response.CategoryResponse;
import com.shop.oniamey.core.admin.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/category")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public void setCategoryService(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return new ResponseEntity<>(categoryService.getAll(), org.springframework.http.HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveCategory(@Valid @RequestBody CategoryRequest request) {
        return new ResponseEntity<>(categoryService.save(request), org.springframework.http.HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        return new ResponseEntity<>(categoryService.update(id, request), org.springframework.http.HttpStatus.OK);
    }

    @PutMapping("/change-status/{id}")
    public ResponseEntity<String> changeStatus(@PathVariable Long id, @RequestBody Integer status) {
        return new ResponseEntity<>(categoryService.changeStatus(id, status), org.springframework.http.HttpStatus.OK);
    }

}
