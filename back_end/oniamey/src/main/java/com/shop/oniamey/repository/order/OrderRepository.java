package com.shop.oniamey.repository.order;

import com.shop.oniamey.core.admin.order.model.response.CountStatusResponse;
import com.shop.oniamey.core.admin.order.model.response.OrderResponse;
import com.shop.oniamey.entity.Orders;
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
            o.id as
            customerId
            ,o.phone_number as phoneNumber
            , o.address
            ,o.user_name as userName
            , o.total_money as totalMoney
            ,o.confirmation_date as confirmationDate
            ,o.ship_date as shipDate
            , o.receive_date as receiveDate
            , o.completion_date as completionDate
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
            o.id as
            customerId
            ,o.phone_number as phoneNumber
            , o.address
            ,o.user_name as userName
            , o.total_money as totalMoney
            ,o.confirmation_date as confirmationDate
            ,o.ship_date as shipDate
            , o.receive_date as receiveDate
            , o.completion_date as completionDate
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
            countQuery = """
                                    select count(*)
                                    from orders
                                    where deleted=0
                    """,
            nativeQuery = true)
    Page<OrderResponse> findAllOrder(Pageable pageable);


    @Query(value = """
                 select o.id as userId ,
                     o.id as
                     customerId
                     ,o.phone_number as phoneNumber
                     , o.address
                     ,o.user_name as userName
                     , o.total_money as totalMoney
                     ,o.confirmation_date as confirmationDate
                     ,o.ship_date as shipDate
                     , o.receive_date as receiveDate
                     , o.completion_date as completionDate
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
                       o.id as
                       customerId
                       ,o.phone_number as phoneNumber
                       , o.address
                       ,o.user_name as userName
                       , o.total_money as totalMoney
                       ,o.confirmation_date as confirmationDate
                       ,o.ship_date as shipDate
                       , o.receive_date as receiveDate
                       , o.completion_date as completionDate
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
                        where o.deleted = 0 and o.status like :status
                       """,
            countQuery = """
                                    select count(*)
                                    from orders
                                    where deleted=0 and status like :status
                    """,
            nativeQuery = true)
    Page<OrderResponse> getOrdersByStatus(Pageable pageable, String status);

    @Query(value = """
            select o.id as userId ,
                       o.id as
                       customerId
                       ,o.phone_number as phoneNumber
                       , o.address
                       ,o.user_name as userName
                       , o.total_money as totalMoney
                       ,o.confirmation_date as confirmationDate
                       ,o.ship_date as shipDate
                       , o.receive_date as receiveDate
                       , o.completion_date as completionDate
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
                        where o.deleted = 0 and o.status like :status
                       """,nativeQuery = true)
    List<OrderResponse> getByStatus(String status);
    @Modifying
    @Query(value = """
            update orders set deleted=1 where id =?1
            """, nativeQuery = true)
    void deleteOrder(Long id);

    @Query(value = """
             SELECT 
             (select count(id)from orders where status  like 'PENDING') as pending ,
              (select count(id)from orders where status  like 'AWAITING_PICKUP') as awaitingPickup,
               (select count(id)from orders where status  like 'SHIPPING')   as shipping ,
               (select count(id)from orders where status  like 'SHIPPED')   as shipped ,
               (select count(id)from orders where status  like 'CANCEL')   as cancel ,
               (select count(id)from orders where status  like 'AWAITING_PAYMENT')   as awaitingPayment 
            """, nativeQuery = true)
    public CountStatusResponse getCountStatus();
}