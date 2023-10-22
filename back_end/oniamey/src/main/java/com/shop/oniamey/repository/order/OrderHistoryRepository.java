package com.shop.oniamey.repository.order;

import com.shop.oniamey.core.admin.order.model.request.OrderHistoryRequest;
import com.shop.oniamey.core.admin.order.model.response.OrderHistoryResponse;
import com.shop.oniamey.entity.OrderHistory;
import com.shop.oniamey.infrastructure.constant.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

    @Query(value = """
            select oh.created_at as createdAt,
             case 
             when oh.status = 'PENDING' THEN 'Chờ xác nhận'
              WHEN oh.status = 'CONFIRMED' THEN 'Đã xác nhận'
             WHEN oh.status = 'SHIPPING' THEN 'Đang giao'
             WHEN oh.status = 'SHIPPED' THEN 'Đã giao'
              WHEN oh.status = 'SUCCESS' THEN 'Hoàn thành'
              WHEN oh.status = 'CANCEL' THEN 'Hủy'
              ELSE oh.status 
             end as status, 
            u.full_name as confirmedBy,
            oh.action_description as description
            from order_history oh
            left join user u on u.id = oh.created_by
            where oh.deleted =0 and oh.id_order=:id
            """, nativeQuery = true)
    List<OrderHistoryResponse> getOrderHistoryById(String id);

    @Query(value = """
            select * from order_history where id_order = :idOrder and status like :status
            """, nativeQuery = true)
    Optional<OrderHistory> checkExists(Long idOrder, String status);

    @Modifying
    @Query(value = """
             INSERT INTO order_history 
              (deleted, id_order, action_description, status, created_at)
             VALUES (0, :idOrder, :actionDescription, :status, CURRENT_TIMESTAMP)
            """, nativeQuery = true)
    void createOrderHistory(@Param("idOrder") Long idOrder,
                            @Param("actionDescription") String actionDescription,
                            @Param("status") String status);

}
