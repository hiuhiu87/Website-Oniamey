package com.shop.oniamey.core.admin.controller;

import com.shop.oniamey.core.admin.model.request.BrandRequest;
import com.shop.oniamey.core.admin.model.response.BrandResponse;
import com.shop.oniamey.core.admin.service.BrandService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/brand")
public class BrandController {

    private BrandService brandService;

    @Autowired
    public void setBrandService(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<BrandResponse>> getAllBrands(){
        return new ResponseEntity<>(brandService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveBrand(@Valid @RequestBody BrandRequest request){
        return new ResponseEntity<>(brandService.save(request), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateBrand(@PathVariable Long id, @Valid @RequestBody BrandRequest request){
        return new ResponseEntity<>(brandService.update(id, request), HttpStatus.OK);
    }

    @PutMapping("/change-status/{id}")
    @Transactional
    public ResponseEntity<String> changeStatus(@PathVariable Long id, @RequestParam("status") Integer status){
        return new ResponseEntity<>(brandService.changeStatus(id, status), HttpStatus.OK);
    }

}
