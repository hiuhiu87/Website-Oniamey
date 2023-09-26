package com.shop.oniamey.repository;

import com.shop.oniamey.core.admin.model.response.CategoryResponse;
import com.shop.oniamey.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

    @Query(
            value = """
            SELECT c.id AS id, 
            c.category_name AS categoryName, 
            c.status AS status, 
            c.created_date AS createdDate, 
            c.last_modified_date AS lastModifiedDate
            FROM category c
            """,
            nativeQuery = true
    )
    List<CategoryResponse> getAll();

    Optional<Category> findByCategoryName(String categoryName);

    @Query(
            value = """
            UPDATE category c
            SET c.status = :status
            WHERE c.id = :id
            """,
            nativeQuery = true
    )
    void updateCategoryStatus(Long id, Integer status);

}
