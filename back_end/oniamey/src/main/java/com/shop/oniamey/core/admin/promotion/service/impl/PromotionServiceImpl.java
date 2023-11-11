package com.shop.oniamey.core.admin.promotion.service.impl;

import com.shop.oniamey.core.admin.promotion.model.request.AddPromotionRequest;
import com.shop.oniamey.core.admin.promotion.model.response.PromotionDetailResponse;
import com.shop.oniamey.core.admin.promotion.repository.AdminProductDetailForPromotionRepository;
import com.shop.oniamey.core.admin.promotion.repository.AdminPromotionProductDetailRepository;
import com.shop.oniamey.core.admin.promotion.repository.AdminPromotionRepository;
import com.shop.oniamey.core.admin.promotion.service.PromotionService;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.entity.Promotion;
import com.shop.oniamey.entity.PromotionProductDetail;
import com.shop.oniamey.util.QRCodeProduct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private AdminProductDetailForPromotionRepository adminProductDetailForPromotionRepository;

    @Autowired
    private AdminPromotionProductDetailRepository adminPromotionProductDetailRepository;

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
        Optional<Promotion> checkPromotionName = adminPromotionRepository.findByPromotionName(addPromotionRequest.getPromotionName());
        if (checkPromotionName.isPresent()) {
            return "Tên khuyến mại đã tồn tại";
        }
        Promotion promotion = new Promotion();
        String code = QRCodeProduct.generateRandomCode();
        promotion.setPromotionCode(code);
        promotion.setPromotionName(addPromotionRequest.getPromotionName());
        promotion.setDeleted(true);
        promotion.setValue(addPromotionRequest.getPromotionValue());
        promotion.setType(addPromotionRequest.getPromotionType());
        promotion.setStartDate(addPromotionRequest.getPromotionStartDate());
        promotion.setEndDate(addPromotionRequest.getPromotionEndDate());
        adminPromotionRepository.save(promotion);
        if (!((addPromotionRequest.getPromotionProductID()) == null)) {
            if (!(addPromotionRequest.getPromotionProductDetailID() == null)) {
                for (Long productDetailID : addPromotionRequest.getPromotionProductDetailID()
                ) {
                    PromotionProductDetail promotionProductDetail = new PromotionProductDetail();
                    Optional<Promotion> getPromotionByCode = adminPromotionRepository.findByPromotionCode(code);
                    promotionProductDetail.setPromotion(getPromotionByCode.get());
                    Optional<ProductDetail> getProductDetailByID =
                            adminProductDetailForPromotionRepository.findById(productDetailID);
                    promotionProductDetail.setProductDetail(getProductDetailByID.get());
                    adminPromotionProductDetailRepository.save(promotionProductDetail);
                }
                return "Add vào ProductDetai";
            } else {
                return "Chưa chọn ProductDetail muốn thêm - Thêm mềm khuyến mại _ Cập nhật khuyến mãi đê";
            }
        } else {
            return "Chưa chọn Product - Thêm mềm khuyến mại _ Cập nhật khuyến mãi đê";
        }
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
