package com.shop.oniamey.core.admin.promotion.service.impl;

import com.shop.oniamey.core.admin.promotion.model.request.AddPromotionRequest;
import com.shop.oniamey.core.admin.promotion.model.response.PromotionDetailResponse;
import com.shop.oniamey.core.admin.promotion.model.response.PromotionResponse;
import com.shop.oniamey.core.admin.promotion.repository.AdminPromotionRepository;
import com.shop.oniamey.core.admin.promotion.service.PromotionService;
import com.shop.oniamey.entity.Promotion;
import com.shop.oniamey.repository.promotion.PromotionRepository;
import jakarta.transaction.Transactional;
import org.apache.http.client.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PromotionServiceImpl implements PromotionService {

//    @Autowired
//    private PromotionRepository promotionRepository;

    @Autowired
    AdminPromotionRepository adminPromotionRepository;

    @Override
    public List<PromotionDetailResponse> getAllPromotion() {
        return adminPromotionRepository.getAllPromotions();
    }

    @Override
    public PromotionDetailResponse getPromotionById(Long id) {
        return adminPromotionRepository.getPromotionDetailById(id);
    }

    @Override
    public String createPromotion(AddPromotionRequest addPromotionRequest) {
        Optional<Promotion> checkPromotionCode = adminPromotionRepository.findByPromotionCode(addPromotionRequest.getPromotionCode());
        Optional<Promotion> checkPromotionName = adminPromotionRepository.findByPromotionName(addPromotionRequest.getPromotionName());
        if (checkPromotionName.isPresent()) {
            return "Tên khuyến mãi đã tồn tại";
        }
        if (checkPromotionCode.isPresent()) {
            return "Mã khuyến mãi đã tồn tại";
        }
        Promotion promotion = new Promotion();
        promotion.setPromotionCode(addPromotionRequest.getPromotionCode());
        promotion.setPromotionName(addPromotionRequest.getPromotionName());
        promotion.setDeleted(addPromotionRequest.getPromotionDeleted());
        promotion.setValue(addPromotionRequest.getPromotionValue());
        promotion.setType(addPromotionRequest.getPromotionType());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date startDate = dateFormat.parse(addPromotionRequest.getPromotionStartDate());
            Date endDate = dateFormat.parse(addPromotionRequest.getPromotionEndDate());
            promotion.setStartDate(startDate);
            promotion.setEndDate(endDate);
        } catch (Exception e) {
            e.printStackTrace();
        }
        adminPromotionRepository.save(promotion);
        return "Done";
    }

    @Transactional
    @Override
    public String updatePromotion(Long id, Promotion promotion) {
        Optional<Promotion> checkPromotion = adminPromotionRepository.findById(id);

        if (checkPromotion.isEmpty()) {
            return "Khuyến mãi không tồn tại";
        }

        Promotion promotion1 = checkPromotion.get();
        promotion1.setPromotionCode(promotion.getPromotionCode());
        promotion1.setPromotionName(promotion.getPromotionName());
        promotion1.setDeleted(promotion.getDeleted());
        promotion1.setType(promotion.getType());
        promotion1.setValue(promotion.getValue());
        promotion1.setStartDate(promotion.getStartDate());
        promotion1.setEndDate(promotion.getEndDate());
        adminPromotionRepository.save(promotion1);
        return "Done";
    }

    @Override
    public String updateDeletedPromotion(Long id) {
        Optional<Promotion> checkPromotion = adminPromotionRepository.findById(id);

        if (checkPromotion.isEmpty()) {
            return "Khuyến mãi không tồn tại";
        }

        Promotion promotion1 = checkPromotion.get();
        Boolean deleted = promotion1.getDeleted();
        promotion1.setDeleted(!deleted);
        adminPromotionRepository.save(promotion1);
        return "Done";
    }

}
