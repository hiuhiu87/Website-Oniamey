package com.shop.oniamey.core.admin.promotion.controller;

import com.shop.oniamey.core.admin.promotion.model.request.AddPromotionRequest;
import com.shop.oniamey.core.admin.promotion.repository.AdminPromotionProductDetailRepository;
import com.shop.oniamey.core.admin.promotion.repository.AdminPromotionRepository;
import com.shop.oniamey.core.admin.promotion.service.PromotionService;
import com.shop.oniamey.entity.Promotion;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/promotion")
@CrossOrigin("*")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private AdminPromotionRepository adminPromotionRepository;

    @Autowired
    private AdminPromotionProductDetailRepository adminPromotionProductDetailRepository;

    @GetMapping("/get-all-promotion")
    public ResponseEntity<?> getAllPromotions() {
        return new ResponseEntity<>(promotionService.getAllPromotion(), HttpStatus.OK);
    }

    @PostMapping("/create-promotion")
    public ResponseEntity<?> createPromotion( @Valid @RequestBody AddPromotionRequest addPromotionRequest) {
        return new ResponseEntity<>(promotionService.createPromotion(addPromotionRequest), HttpStatus.CREATED);
    }

    @GetMapping("/get-promotion-by-id/{id}")
    public ResponseEntity<?> getPromotionById(@PathVariable Long id) {
        return new ResponseEntity<>(promotionService.getPromotionById(id), HttpStatus.OK);
    }

    @GetMapping("/get-product-by-promotion-id/{id}")
    public ResponseEntity<?> getProductDetailById(@PathVariable Long id) {
        return new ResponseEntity<>(adminPromotionRepository.getProductDetailByIdPromotion(id), HttpStatus.OK);
    }

    @PutMapping("/update-promotion-deleted/{id}")
    public ResponseEntity<?> updateDeletedPromotion(@PathVariable Long id) {
        return new ResponseEntity<>(promotionService.updateDeletedPromotion(id), HttpStatus.OK);
    }

    @PutMapping("/update-promotion/{id}")
    public ResponseEntity<?> updatePromotion(@PathVariable Long id, @RequestBody Promotion promotion) {
        return new ResponseEntity<>(promotionService.updatePromotion(id, promotion), HttpStatus.OK);
    }

}
