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
             c.id as categoryId,
             s.id as sizeId,
             m.id as materialId,
             b.id as brandId,
             c1.id as colorId,
             c2.id as collarId,
             sl.id as sleeveLengthId,
             c.name as category,
             s.name as size,
             m.name as material,
             b.name as brand,
             c1.name as color,
             c2.name as collar,
             sl.name as sleeveLength,
             pd.name as name,
             pd.price as price,
             pd.quantity as quantity,
             pd.weight as weight,
             pd.created_at as createdAt,
             pd.updated_at as updatedAt,
             pd.created_by as createdBy,
             pd.updated_by as updatedBy,
             pd.deleted as deleted,
             pd.cover as cover
             FROM product_detail pd
             left join category c on pd.id_category = c.id
             left join size s on pd.id_size = s.id
             left join material m on pd.id_material = m.id
             left join brand b on pd.id_brand = b.id
             left join color c1 on pd.id_color = c1.id
             left join sleeve_length sl on pd.id_sleeve_length = sl.id
             left join collar c2 on pd.id_collar = c2.id
            """, nativeQuery = true)
    List<ProductDetailResponse> getAll();

    @Query(value = """
             SELECT pd.id,
             c.id as categoryId,
             s.id as sizeId,
             m.id as materialId,
             b.id as brandId,
             c1.id as colorId,
             c2.id as collarId,
             sl.id as sleeveLengthId,
             c.name as category,
             s.name as size,
             m.name as material,
             b.name as brand,
             c1.name as color,
             c2.name as collar,
             sl.name as sleeveLength,
             pd.name as name,
             pd.price as price,
             pd.quantity as quantity,
             pd.weight as weight,
             pd.created_at as createdAt,
             pd.updated_at as updatedAt,
             pd.created_by as createdBy,
             pd.updated_by as updatedBy,
             pd.deleted as deleted,
             pd.cover as cover
             FROM product_detail pd
             left join category c on pd.id_category = c.id
             left join size s on pd.id_size = s.id
             left join material m on pd.id_material = m.id
             left join brand b on pd.id_brand = b.id
             left join color c1 on pd.id_color = c1.id
             left join sleeve_length sl on pd.id_sleeve_length = sl.id
             left join collar c2 on pd.id_collar = c2.id
             WHERE pd.id_product = :productId
            """, nativeQuery = true)
    List<ProductDetailResponse> getAllByProductId(Long productId);

    @Query(value = """
             SELECT pd.id,
                             pd.id_brand,
                             pd.id_category,
                             pd.id_collar,
                             pd.id_color,
                             pd.id_material,
                             pd.id_product,
                             pd.id_size,
                             pd.id_sleeve_length,
                             pd.name,
                             pd.code,
                             pd.price,
                             pd.quantity,
                             pd.weight,
                             pd.created_at,
                             pd.updated_at,
                             pd.created_by,
                             pd.updated_by,
                             pd.deleted,
                             pd.cover,
                             p.name as productName
                             FROM product_detail pd JOIN product p ON pd.id_product = p.id
             WHERE pd.id_product = :productId
            """, nativeQuery = true)
    List<ProductDetail> getAllByProductIdByUpdate(Long productId);

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
            pd.price as price,
            pd.quantity as quantity,
            pd.weight as weight,
            pd.cover as cover,
            pd.created_at as createdAt,
            pd.updated_at as updatedAt,
            pd.created_by as createdBy,
            pd.updated_by as updatedBy,
            pd.deleted as deleted
            FROM product_detail pd
            WHERE pd.id_color = :colorId
            """, nativeQuery = true)
    List<ProductDetailResponse> getAllByColorId(Long colorId);


    @Query(value = """
                SELECT pd.id,
                            pd.id_brand,
                            pd.id_category,
                            pd.id_collar,
                            pd.id_color,
                            pd.id_material,
                            pd.id_product,
                            pd.id_size,
                            pd.id_sleeve_length,
                            pd.name,
                            pd.code,
                            pd.price,
                            pd.quantity,
                            pd.weight,
                            pd.created_at,
                            pd.updated_at,
                            pd.created_by,
                            pd.updated_by,
                            pd.deleted,
                            pd.cover,
                            p.name as productName
                            FROM product_detail pd JOIN product p ON pd.id_product = p.id
                            WHERE pd.id = :id
            """, nativeQuery = true)
    ProductDetail getById(Long id);

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
                     pd.id_color, pd.id_collar, pd.id_sleeve_length, pd.code, pd.name,
                     pd.price, pd.quantity, pd.weight, pd.cover, pd.created_at, pd.updated_at, pd.created_by,
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

}