package com.shop.oniamey.repository.product;

import com.shop.oniamey.core.admin.product.model.response.ProductDetailResponse;
import com.shop.oniamey.entity.ProductDetail;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

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
            """, nativeQuery = true)
    Page<ProductDetailResponse> getAll(Pageable pageable);

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
    Page<ProductDetailResponse> getAllByProductId(Long productId, Pageable pageable);

    @Query(value = """
            SELECT pd.id,
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
            pd.deleted as deleted
            FROM product_detail pd
            WHERE pd.id_color = :colorId
            """, nativeQuery = true)
    List<ProductDetailResponse> getAllByColorId(Long colorId);

    List<ProductDetail> findAllByColorId(Long id);

    List<ProductDetail> findAllByBrandId(Long id);

    List<ProductDetail> findAllByCategoryId(Long id);

    List<ProductDetail> findAllByCollarId(Long id);

    List<ProductDetail> findAllBySizeId(Long id);

    List<ProductDetail> findAllBySleeveLengthId(Long id);

    List<ProductDetail> findAllByMaterialId(Long id);

    @Query(value = """
                    SELECT 
                     pd.id, pd.id_product, pd.id_category, pd.id_size, pd.id_material, pd.id_brand,
                     pd.id_color, pd.id_collar, pd.id_sleeve_length, pd.code, pd.name, pd.gender,
                     pd.price, pd.quantity, pd.weight, pd.created_at, pd.updated_at, pd.created_by,
                     pd.updated_by, pd.deleted
                     FROM product_detail pd
                    WHERE pd.id_product = :productId
                    AND pd.id_color = :colorId
                    AND pd.id_size = :sizeId
                    AND pd.id_material = :materialId
                    AND pd.id_brand = :brandId
                    AND pd.id_collar = :collarId
                    AND pd.id_sleeve_length = :sleeveLengthId
            """, nativeQuery = true)
    ProductDetail getProductByProperty(Long productId, Long colorId, Long sizeId,
                                       Long materialId, Long brandId, Long collarId, Long sleeveLengthId);

    @Modifying
    @Query(value = """
            DELETE FROM product_detail
            WHERE id_product = :productId
            AND id_size IN :sizeId
            AND id_color IN :colorId
            """, nativeQuery = true)
    void deleteByProperty(Long productId, List<Long> sizeId, List<Long> colorId);

    @Modifying
    @Query(value = "DELETE FROM product_detail " +
            "WHERE id_product = :productId " +
            "  AND id_color = :colorId " +
            "  AND id_size = :sizeId " +
            "  AND id_material = :materialId " +
            "  AND id_brand = :brandId " +
            "  AND id_collar = :collarId " +
            "  AND id_sleeve_length = :sleeveLengthId", nativeQuery = true)
    @Transactional
    void deleteByProductAndAttributes(Long productId, Long colorId, Long sizeId, Long materialId, Long brandId, Long collarId, Long sleeveLengthId);

}
