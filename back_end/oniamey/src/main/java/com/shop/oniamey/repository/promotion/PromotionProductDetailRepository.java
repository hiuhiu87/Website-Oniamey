package com.shop.oniamey.repository.promotion;


import com.shop.oniamey.entity.PromotionProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionProductDetailRepository extends JpaRepository<PromotionProductDetail, Long> {
}
