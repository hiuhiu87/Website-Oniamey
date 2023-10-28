package com.shop.oniamey.repository.promotion;

import com.shop.oniamey.core.admin.promotion.model.request.AddPromotionRequest;
import com.shop.oniamey.core.admin.promotion.model.response.PromotionDetailResponse;
import com.shop.oniamey.core.admin.promotion.model.response.PromotionResponse;
import com.shop.oniamey.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {

}
