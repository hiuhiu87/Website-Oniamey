package com.shop.oniamey.core.admin.promotion.service;

import com.shop.oniamey.core.admin.promotion.model.request.AddPromotionRequest;
import com.shop.oniamey.core.admin.promotion.model.response.PromotionDetailResponse;
import com.shop.oniamey.entity.Promotion;

import java.util.List;

public interface PromotionService {

    List<PromotionDetailResponse> getAllPromotion();

    PromotionDetailResponse getPromotionById(Long id);

    String createPromotion(AddPromotionRequest addPromotionRequest);

    String updatePromotion(Long id, Promotion promotion);

    String updateDeletedPromotion(Long id);

}
