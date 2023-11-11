package com.shop.oniamey.core.admin.promotion.repository;

import com.shop.oniamey.core.admin.promotion.model.response.ProductDetailResponse;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminProductDetailForPromotionRepository extends ProductDetailRepository {

    @Query(value = """
                        SELECT pd.id as productDetailID,
                            pd.name as productDetailName,
                            pd.code as productDetailCode,
                            pd.price as productDetailPrice,
                            pd.quantity as productDetailQuantity,
                            pd.weight as productDetailWeight,
                            pd.gender as productDetailGender,
                            pd.deleted as productDetailDeleted,
                            pd.id_product as productID
                        FROM banquanaooniamey.product_detail pd
            """, nativeQuery = true)
    List<ProductDetailResponse> getAllProductForPromotion();

}
