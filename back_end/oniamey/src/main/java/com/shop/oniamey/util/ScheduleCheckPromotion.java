package com.shop.oniamey.util;

import com.shop.oniamey.entity.Promotion;
import com.shop.oniamey.repository.promotion.PromotionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@Slf4j
public class ScheduleCheckPromotion {

    private PromotionRepository promotionRepository;

    @Autowired
    public void setPromotionRepository(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    @Scheduled(fixedDelayString = "${config.fixedDelayMillis}")
    public void checkPromotion() {
        List<Promotion> promotions = promotionRepository.findAll();
        promotions.forEach(promotion -> {
            if (promotion.getEndDate() >= DateTimeUtil.convertDateToTimeStampSecond()) {
                promotion.setDeleted(true);
                promotionRepository.save(promotion);
                log.info("Promotion {} is now inactive", promotion.getId());
            }
        });
    }

}
