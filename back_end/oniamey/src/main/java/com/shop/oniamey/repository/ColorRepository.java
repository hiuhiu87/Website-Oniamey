package com.shop.oniamey.repository;

import com.shop.oniamey.core.admin.model.response.BrandResponse;
import com.shop.oniamey.core.admin.model.response.ColorResponse;
import com.shop.oniamey.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {

    @Query(
            value = """
            SELECT c.id AS id, 
            c.color_name AS colorName, 
            c.status AS status, 
            c.created_date AS createdDate, 
            c.last_modified_date AS lastModifiedDate
            FROM color c
            """,
            nativeQuery = true
    )
    List<ColorResponse> getAll();

    Optional<Color> findByColorName(String colorName);

    @Query(
            value = """
            UPDATE color c
            SET c.status = :status
            WHERE c.id = :id
            """,
            nativeQuery = true
    )
    @Modifying
    void updateColorStatus(Long id, Integer status);

}
