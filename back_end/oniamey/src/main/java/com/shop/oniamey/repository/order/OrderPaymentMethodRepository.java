package com.shop.oniamey.repository.order;

import com.shop.oniamey.core.admin.order.model.response.OrderPaymentMethodResponse;
import com.shop.oniamey.entity.OrderPaymentMethod;
import com.shop.oniamey.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderPaymentMethodRepository extends JpaRepository<OrderPaymentMethod, Long> {
    @Query(value = """
            select payments_method.method as methodName,
            opm.created_at as ngayThanhToan,
            opm.note as note,
            opm.money as soTienThanhToan,
            user.full_name as tenNhanVien
             from order_payment_method opm
            left join payments_method on payments_method.id= opm.id_payment_method\s
            left join user on user.id = opm.created_by
            where opm.deleted =0 and id_order = :idOrder
            """, nativeQuery = true)
    List<OrderPaymentMethodResponse> getOrderPaymentMethodResponse(Long idOrder);
}
