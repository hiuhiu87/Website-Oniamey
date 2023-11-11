package com.shop.oniamey.core.admin.promotion.repository;

import com.shop.oniamey.core.admin.promotion.model.response.ProductDetailResponse;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.repository.promotion.PromotionProductDetailRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdminPromotionProductDetailRepository extends PromotionProductDetailRepository {

    @Query(value = """
                        SELECT * FROM banquanaooniamey.product_detail pd
                        LEFT JOIN banquanaooniamey.product p ON pd.id = p.id
                        WHERE pd.id = :productDetailID && p.id = :productID
            """, nativeQuery = true)
    Optional<ProductDetail> findProductDetailInProduct(Long productID, Long productDetailID);

}
