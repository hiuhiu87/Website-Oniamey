package com.shop.oniamey.core.admin.promotion.repository;

import com.shop.oniamey.core.admin.promotion.model.request.FindPromotionRequest;
import com.shop.oniamey.core.admin.promotion.model.response.ProductDetailResponse;
import com.shop.oniamey.core.admin.promotion.model.response.PromotionDetailResponse;
import com.shop.oniamey.entity.Promotion;
import com.shop.oniamey.repository.promotion.PromotionRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdminPromotionRepository extends PromotionRepository {

    @Query(value = """
            SELECT
                p.promotion_code as promotionCode,
                p.promotion_name as promotionName,
                p.id as promotionID,
                p.type as promotionType,
                p.value as promotionValue,
                p.deleted as promotionDeleted,
                p.updated_by as promotionUpdatedBy,
                p.start_date as promotionStartDate,
                p.end_date as promotionEndDate,
                DATE_FORMAT(p.updated_at, '%H:%i:%s %Y-%m-%d') as promotionUpdatedDate
            FROM banquanaooniamey.promotion p;      
            """, nativeQuery = true)
    List<PromotionDetailResponse> getAllPromotions();

    @Query(value = """
                SELECT
                    p.promotion_code as promotionCode,
                    p.promotion_name as promotionName,
                    p.id as promotionID,
                    p.type as promotionType,
                    p.value as promotionValue,
                    p.deleted as promotionDeleted,
                    p.updated_by as promotionUpdatedBy,
                    p.start_date as promotionStartDate,
                    p.end_date as promotionEndDate,
                    DATE_FORMAT(p.updated_at, '%H:%i:%s %Y-%m-%d') as promotionUpdatedDate
                FROM banquanaooniamey.promotion p
                WHERE (:#{#findPromotionRequest.promotionInput} IS NULL OR 
                p.promotion_code LIKE (%:#{#findPromotionRequest.promotionInput}%) OR 
                p.promotion_name LIKE (%:#{#findPromotionRequest.promotionInput}%) OR 
                CAST(p.value AS CHAR) LIKE (%:#{#findPromotionRequest.promotionInput}%)) AND
                (   :#{#findPromotionRequest.promotionType} IS NULL OR
                 p.type LIKE (%:#{#findPromotionRequest.promotionType}%)) AND
                (   :#{#findPromotionRequest.promotionStatus} IS NULL OR
                 p.deleted = :#{#findPromotionRequest.promotionStatus}) AND
                (   
                    :#{#findPromotionRequest.promotionStartDate} IS NULL OR
                    :#{#findPromotionRequest.promotionEndDate} IS NULL OR
                    
                    (
                    p.start_date between (:#{#findPromotionRequest.promotionStartDate}) AND (:#{#findPromotionRequest.promotionEndDate})
                    )
                )
            """, nativeQuery = true)
    List<PromotionDetailResponse> getAllPromotionsSearch(FindPromotionRequest findPromotionRequest);

    Optional<Promotion> findByPromotionCode(String promotionCode);

    @Query(value = """
            SELECT
                p.promotion_code as promotionCode,
                p.promotion_name as promotionName,
                p.id as promotionID,
                p.type as promotionType,
                p.value as promotionValue,
                p.deleted as promotionDeleted,
                p.updated_by as promotionUpdatedBy,
                p.start_date as promotionStartDate,
                p.end_date as promotionEndDate,
                DATE_FORMAT(p.updated_at, '%H:%i:%s %Y-%m-%d') as promotionUpdatedDate
            FROM banquanaooniamey.promotion p
            where p.id = :id
            """, nativeQuery = true)
    PromotionDetailResponse getPromotionDetailById(Long id);

    @Query(value = """
                SELECT distinct
                        pd.code as productDetailCode,
                    	pd.id as productDetailID,
                    	pd.gender as productDetailGender,
                    	pd.price as productDetailPrice,
                    	pd.name as productDetailName,
                    	pd.weight as productDetailWeight,
                    	pd.quantity as productDetailQuantity,
                    	pd.deleted as productDetailDeleted,
                    	i.cover as productDetailImage
                FROM banquanaooniamey.product_detail pd
                JOIN banquanaooniamey.image i on pd.id = i.id_product_detail
                JOIN banquanaooniamey.promotion_product_detail ppd ON pd.id = ppd.id_product_detail
                JOIN banquanaooniamey.promotion p ON ppd.id_promotion = p.id
                WHERE p.id = :id
            """, nativeQuery = true)
    List<ProductDetailResponse> getProductDetailByIdPromotion(Long id);

    Optional<Promotion> findByPromotionName(String promotionName);

}
