package com.shop.oniamey.core.admin.product.controller;

import com.shop.oniamey.core.admin.product.model.request.PropertyRequest;
import com.shop.oniamey.core.admin.product.service.IPropertyService;
import com.shop.oniamey.entity.Size;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/size")
@RequiredArgsConstructor
public class SizeController {

    private final IPropertyService<Size, Long> sizeService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(sizeService.getAll());
    }

    @PostMapping
    public ResponseEntity<?> create(@ModelAttribute PropertyRequest propertyRequest) {
        try {
            sizeService.create(propertyRequest);
            return ResponseEntity.status(HttpStatus.OK).body("Successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @ModelAttribute PropertyRequest propertyRequest) throws DataNotFoundException {
        try {
            sizeService.update(id, propertyRequest);
            return ResponseEntity.status(HttpStatus.OK).body("Successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws DataNotFoundException {
        try {
            sizeService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body("Successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
