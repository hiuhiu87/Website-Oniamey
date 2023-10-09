package com.shop.oniamey.repository;

import com.shop.oniamey.core.admin.model.response.CustomerDetailResponse;
import com.shop.oniamey.core.admin.model.response.CustomerResponse;
import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.entity.Orders;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {

//        @Query(value = "SELECT * FROM your_table_name LIMIT ?1, ?2", nativeQuery = true)
//        List<YourEntity> findEntitiesWithPagination(int startPosition, int pageSize);


}
