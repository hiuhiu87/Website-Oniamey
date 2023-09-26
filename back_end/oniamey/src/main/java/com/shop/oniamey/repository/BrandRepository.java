package com.shop.oniamey.repository;

import com.shop.oniamey.core.admin.model.response.BrandResponse;
import com.shop.oniamey.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

    @Query(
            value = """
            SELECT b.id AS id, 
            b.brand_name AS brandName, 
            b.status AS status, 
            b.created_date AS createdDate, 
            b.last_modified_date AS lastModifiedDate
            FROM brand b
            """,
            nativeQuery = true
    )
    List<BrandResponse> getAll();

    Optional<Brand> findByBrandName(String brandName);

    @Modifying
    @Query(
            value = """
            UPDATE brand b
            SET b.status = :status
            WHERE b.id = :id
            """,
            nativeQuery = true
    )
    void updateBrandStatus(Long id, Integer status);

}
