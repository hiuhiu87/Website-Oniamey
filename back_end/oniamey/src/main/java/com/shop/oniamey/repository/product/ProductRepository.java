package com.shop.oniamey.repository.product;

import com.shop.oniamey.core.admin.product.model.response.ProductResponse;
import com.shop.oniamey.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = """
                    SELECT id,
                    code as code,
                    name as name,
                    description as description,
                    created_at as createdAt,
                    updated_at as updatedAt,
                    created_by as createdBy,
                    updated_by as updatedBy,
                    deleted as deleted
                    FROM product
            """, nativeQuery = true)
    Page<ProductResponse> getAll(Pageable pageable);
}
