package com.shop.oniamey.repository.order;

import com.shop.oniamey.core.admin.order.model.response.CountStatusResponse;
import com.shop.oniamey.core.admin.order.model.response.OrderResponse;
import com.shop.oniamey.entity.Orders;
import com.shop.oniamey.infrastructure.constant.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {

    @Query(value = """
            select o.id as userId ,
            o.id as  customerId,
            uu.full_name as tenNhanVien
            ,o.phone_number as phoneNumber
            , o.address
            ,o.user_name as userName
            ,o.money_reduced as moneyReduced
            , o.total_money as totalMoney 
            ,o.ship_date as shipDate 
            , o.id,o.created_at as createdAt
            , uc.full_name as createdBy
            , o.updated_at as updatedAt
            , uu.full_name as updatedBy
            , o.type
            ,o.note
            ,o.money_ship as moneyShip
            ,o.status    
            ,o.code             
             from orders o
             left join user uu on uu.id = o.updated_by
             left join user uc on uc.id = o.created_by
             where o.deleted = 0
            """,
            nativeQuery = true)
    List<OrderResponse> findAllOrder();

    @Query(value = """
            select o.id as userId ,
            o.id as  customerId ,
            unv.full_name as tenNhanVien
            ,o.phone_number as phoneNumber
            , o.address
            ,o.money_reduced as moneyReduced
            ,o.user_name as userName
            , o.total_money as totalMoney 
            ,o.ship_date as shipDate 
            , o.id,o.created_at as createdAt
            , uc.full_name as createdBy
            , o.updated_at as updatedAt
            , uu.full_name as updatedBy
            , o.type
            ,o.note
            ,o.money_ship as moneyShip
            ,o.status  
            ,o.code               
             from orders o
             left join user uu on uu.id = o.updated_by
             left join user unv on unv.id = o.id_user
             left join user uc on uc.id = o.created_by
             where o.deleted = 0
            """,
            countQuery = """
                                    select count(*)
                                    from orders
                                    where deleted=0
                    """,
            nativeQuery = true)
    Page<OrderResponse> findAllOrder(Pageable pageable);


    @Query(value = """
                  select o.id as userId ,
                    o.id as customerId,
                       uu.full_name as tenNhanVien
                   ,o.phone_number as phoneNumber
                                     , o.address
                                     ,o.user_name as userName
                                     , o.total_money as totalMoney 
                                     ,o.ship_date as shipDate 
                                     ,o.money_reduced as moneyReduced
                                     , o.id,o.created_at as createdAt
                                     , uc.full_name as createdBy
                                     , o.updated_at as updatedAt
                                     , uu.full_name as updatedBy
                                     , o.type
                                     ,o.note
                                     ,o.money_ship as moneyShip
                                     ,o.status  
                                     ,o.code      
                                      from orders o
                                      left join user uu on uu.id = o.updated_by
                                      left join user uc on uc.id = o.created_by
                                      where o.deleted = 0 and o.id =?1
            """, nativeQuery = true)
    Optional<OrderResponse> getOrdersById(Long id);

    @Query(value = """ 
                          select o.id as userId ,
                           o.id as  customerId, 
                           unv.full_name as tenNhanVien ,
                           o.phone_number as phoneNumber , 
                           o.address ,o.user_name as userName , 
                           o.total_money as totalMoney ,
                           o.money_reduced as moneyReduced ,
                           o.ship_date as shipDate , 
                           o.id,
                           o.created_at as createdAt ,
                           uc.full_name as createdBy ,
                           o.updated_at as updatedAt ,
                           uu.full_name as updatedBy , 
                           o.type ,
                           o.note ,
                           o.money_ship as moneyShip ,
                           CASE WHEN o.status = 'PENDING' THEN 'Chờ xác nhận' 
                                WHEN o.status = 'CONFIRMED'  THEN 'Đã xác nhận' 
                                WHEN o.status = 'SHIPPING' THEN 'Đang giao' 
                                WHEN o.status = 'SHIPPED' THEN 'Đã giao' 
                                WHEN o.status = 'SUCCESS' THEN 'Hoàn thành' 
                                WHEN o.status = 'CANCEL' THEN 'Hủy' 
                                ELSE o.status END AS status ,
                           o.code 
                       from orders o 
                       left join user uu on uu.id = o.updated_by 
                       left join user unv on unv.id = o.id_user 
                       left join user uc on uc.id = o.created_by 
                       where o.deleted = 0 and 
                             o.status like :status and 
                             o.type like :type AND 
                             ( (o.code like :search ) or 
                             (unv.full_name like :search) or 
                             (o.phone_number like :search) or 
                             (o.user_name like :search) or 
                             (o.type like :search) or 
                             (o.total_money like :search) or 
                             (o.status like :search)    )
                              
            """,
            countQuery = """
                                    select count(*)
                                   from orders o 
                       left join user uu on uu.id = o.updated_by 
                       left join user unv on unv.id = o.id_user 
                       left join user uc on uc.id = o.created_by 
                       where o.deleted = 0 and 
                             o.status like :status and 
                             o.type like :type AND 
                             ( (o.code like :search ) or 
                             (unv.full_name like :search) or 
                             (o.phone_number like :search) or 
                             (o.user_name like :search) or 
                             (o.type like :search) or 
                             (o.total_money like :search) or 
                             (o.status like :search)    )
                    """,
            nativeQuery = true)
    Page<OrderResponse> getOrdersByStatus(Pageable pageable, String status, String type, String search);

    @Query(value = """
            select o.id as userId ,
                       o.id as customerId,
                        uu.full_name as tenNhanVien
                       ,o.phone_number as phoneNumber
                       , o.address
                       ,o.user_name as userName
                       , o.total_money as totalMoney 
                       ,o.ship_date as shipDate 
                       , o.id,o.created_at as createdAt
                       , uc.full_name as createdBy
                       , o.updated_at as updatedAt
                       ,o.money_reduced as moneyRemitduced
                       , uu.full_name as updatedBy
                       , o.type
                       ,o.note
                       ,o.money_ship as moneyShip
                       ,o.status
                       ,o.code               
                        from orders o
                        left join user uu on uu.id = o.updated_by
                        left join user uc on uc.id = o.created_by
                        where o.deleted = 0 and o.status like :status
                       """, nativeQuery = true)
    List<OrderResponse> getByStatus(String status);

    @Modifying
    @Query(value = """
            update orders set deleted=1 where id =?1
            """, nativeQuery = true)
    void deleteOrder(Long id);

    @Query(value = """  
            SELECT  (select count(o.id)from orders o 
                       left join user uu on uu.id = o.updated_by 
                       left join user unv on unv.id = o.id_user 
                       left join user uc on uc.id = o.created_by 
                       where o.deleted = 0 and 
                             o.status like '%' and 
                             o.type like :type AND 
                             ( (o.code like :search ) or 
                             (unv.full_name like :search) or 
                             (o.phone_number like :search) or 
                             (o.user_name like :search) or 
                             (o.type like :search) or 
                             (o.total_money like :search) or 
                             (o.status like :search)    )) as allStatus ,
             (select count(o.id)from orders o 
                       left join user uu on uu.id = o.updated_by 
                       left join user unv on unv.id = o.id_user 
                       left join user uc on uc.id = o.created_by 
                       where o.deleted = 0 and 
                             o.status like 'PENDING' and 
                             o.type like :type AND 
                             ( (o.code like :search ) or 
                             (unv.full_name like :search) or 
                             (o.phone_number like :search) or 
                             (o.user_name like :search) or 
                             (o.type like :search) or 
                             (o.total_money like :search) or 
                             (o.status like :search)    )) as pending ,
             (select count(o.id)from orders o 
                       left join user uu on uu.id = o.updated_by 
                       left join user unv on unv.id = o.id_user 
                       left join user uc on uc.id = o.created_by 
                       where o.deleted = 0 and 
                             o.status like 'CONFIRMED' and 
                             o.type like :type AND 
                             ( (o.code like :search ) or 
                             (unv.full_name like :search) or 
                             (o.phone_number like :search) or 
                             (o.user_name like :search) or 
                             (o.type like :search) or 
                             (o.total_money like :search) or 
                             (o.status like :search)    )) as confirmed,
            (select count(o.id)from orders o 
                       left join user uu on uu.id = o.updated_by 
                       left join user unv on unv.id = o.id_user 
                       left join user uc on uc.id = o.created_by 
                       where o.deleted = 0 and 
                             o.status like 'SHIPPING' and 
                             o.type like :type AND 
                             ( (o.code like :search ) or 
                             (unv.full_name like :search) or 
                             (o.phone_number like :search) or 
                             (o.user_name like :search) or 
                             (o.type like :search) or 
                             (o.total_money like :search) or 
                             (o.status like :search)  )  )  as shipping ,
              (select count(o.id)from orders o 
                       left join user uu on uu.id = o.updated_by 
                       left join user unv on unv.id = o.id_user 
                       left join user uc on uc.id = o.created_by 
                       where o.deleted = 0 and 
                             o.status like 'SHIPPED' and 
                             o.type like :type AND 
                             ( (o.code like :search ) or 
                             (unv.full_name like :search) or 
                             (o.phone_number like :search) or 
                             (o.user_name like :search) or 
                             (o.type like :search) or 
                             (o.total_money like :search) or 
                             (o.status like :search)    ))   as shipped ,
             (select count(o.id)from orders o 
                       left join user uu on uu.id = o.updated_by 
                       left join user unv on unv.id = o.id_user 
                       left join user uc on uc.id = o.created_by 
                       where o.deleted = 0 and 
                             o.status like 'SUCCESS' and 
                             o.type like :type AND 
                             ( (o.code like :search ) or 
                             (unv.full_name like :search) or 
                             (o.phone_number like :search) or 
                             (o.user_name like :search) or 
                             (o.type like :search) or 
                             (o.total_money like :search) or 
                             (o.status like :search)    ))   as success ,
              (select count(o.id)from orders o 
                       left join user uu on uu.id = o.updated_by 
                       left join user unv on unv.id = o.id_user 
                       left join user uc on uc.id = o.created_by 
                       where o.deleted = 0 and 
                             o.status like 'CANCEL' and 
                             o.type like :type AND 
                             ( (o.code like :search ) or 
                             (unv.full_name like :search) or 
                             (o.phone_number like :search) or 
                             (o.user_name like :search) or 
                             (o.type like :search) or 
                             (o.total_money like :search) or 
                             (o.status like :search)    ))   as cancel
              """, nativeQuery = true)
    CountStatusResponse getCountStatus(String type, String search);

    @Modifying
    @Query(value = """
            update orders set status= :status where id =:id
            """, nativeQuery = true)
    void updateStatus(String status, Long id);


}
