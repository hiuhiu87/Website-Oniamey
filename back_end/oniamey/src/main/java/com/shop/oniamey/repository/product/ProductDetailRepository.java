package com.shop.oniamey.repository.product;

import com.shop.oniamey.core.admin.product.model.response.ProductDetailResponse;
import com.shop.oniamey.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
    List<ProductDetail> findAllByProductId(Long productId);

    @Query(value = """
            SELECT pd.id,
            pd.id_product as product,
            pd.id_category as category,
            pd.id_size as size,
            pd.id_material as material,
            pd.id_brand as brand,
            pd.id_color as color,
            pd.id_collar as collar,
            pd.id_sleeve_length as sleeveLength,
            pd.name as name,
            pd.gender as gender,
            pd.price as price,
            pd.quantity as quantity,
            pd.weight as weight,
            pd.created_at as createdAt,
            pd.updated_at as updatedAt,
            pd.created_by as createdBy,
            pd.updated_by as updatedBy,
            pd.deleted as deleted,
            i.image_url as imageUrl
            FROM product_detail pd
            LEFT JOIN image i ON pd.id = i.id_product_detail;
            """, nativeQuery = true)
    List<ProductDetailResponse> getAll();


    @Query(value = """
            SELECT pd.id,
            pd.id_product as product,
            pd.id_category as category,
            pd.id_size as size,
            pd.id_material as material,
            pd.id_brand as brand,
            pd.id_color as color,
            pd.id_collar as collar,
            pd.id_sleeve_length as sleeveLength,
            pd.name as name,
            pd.gender as gender,
            pd.price as price,
            pd.quantity as quantity,
            pd.weight as weight,
            pd.created_at as createdAt,
            pd.updated_at as updatedAt,
            pd.created_by as createdBy,
            pd.updated_by as updatedBy,
            pd.deleted as deleted,
            i.image_url as imageUrl
            FROM product_detail pd
            LEFT JOIN image i ON pd.id = i.id_product_detail
            JOIN product p ON p.id = pd.id_product
            WHERE p.id = :productId
            """, nativeQuery = true)
    List<ProductDetailResponse> getAllByProductId(Long productId);

    List<ProductDetail> findAllByColorId(Long id);

    List<ProductDetail> findAllByBrandId(Long id);

    List<ProductDetail> findAllByCategoryId(Long id);

    List<ProductDetail> findAllByCollarId(Long id);

    List<ProductDetail> findAllBySizeId(Long id);

    List<ProductDetail> findAllBySleeveLengthId(Long id);

    List<ProductDetail> findAllByMaterialId(Long id);
}