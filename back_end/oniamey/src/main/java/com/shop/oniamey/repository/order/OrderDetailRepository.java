package com.shop.oniamey.repository.order;

import com.shop.oniamey.core.admin.order.model.response.OrderDetailResponse;
import com.shop.oniamey.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Query(value = """
                 select od.quantity as quantity,
                        od.price as price,  
                        od.total_money as totalMoney,
                        category.name as categoryName,
                        size.name as sizeName,
                        product.name as productName,
                        material.name as materialName,
                        brand.name as brandName,
                        color.name as colorName,
                        collar.name as collarName,
                        pd.cover as img,
                        sleeve_length.name as sleeveLengthName,
                        pd.name as productDetailName from order_detail od
                        left join product_detail pd on pd.id = od.id_product_detail
                        left join category on category.id= pd.id_category
                        left join size on size.id = pd.id_size
                        left join product on product.id = pd.id_product
                        left join material on material.id = pd.id_material
                        left join brand on brand.id = pd.id_brand
                        left join color on color.id = pd.id_color
                        left join collar on collar.id = pd.id_collar
                        left join sleeve_length on sleeve_length.id = pd.id_sleeve_length 
             where od.id_order = :idOrder
            """, nativeQuery = true)
    List<OrderDetailResponse> getOrderDetailByOrderId(Long idOrder);
}
