package com.shop.oniamey.repository.customer;

import com.shop.oniamey.core.admin.customer.model.response.CustomerDetailResponse;
import com.shop.oniamey.core.admin.customer.model.response.CustomerResponse;
import com.shop.oniamey.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query(value = """
            select c.id
            ,c.full_name as fullName\s
            ,c.email as email
            ,c.phone_number as phoneNumber
            ,c.gender as gender
            ,c.deleted as status
            ,date_format(c.birth_date, '%m-%d-%Y') as birthDate
            ,date_format(c.created_at  , '%m-%d-%Y %H:%i') as createdAt
            ,date_format(c.updated_at , '%m-%d-%Y %H:%i') as updatedAt
            ,uc.full_name AS createdBy
            ,uu.full_name AS updatedBy
            from customer c
            left JOIN user AS uc ON c.created_by = uc.id
            left JOIN user AS uu ON c.updated_by = uu.id
            where c.full_name not like '%Khách Lẻ%'
                        """, nativeQuery = true)
    Page<List<CustomerResponse>> getAllCustomers(Pageable pageable);

    @Query(value = """
            select c.id
            ,c.full_name as fullName
            ,c.email as email
            ,c.phone_number as phoneNumber
            ,c.gender as gender
            ,c.deleted as status
            ,date_format(c.birth_date, '%m-%d-%Y') as birthDate
            ,date_format(c.created_at  , '%m-%d-%Y %H:%i') as createdAt\s
            ,date_format(c.updated_at , '%m-%d-%Y %H:%i') as updatedAt
            ,uc.full_name AS createdBy
            ,uu.full_name AS updatedBy
            from customer c
            left JOIN user AS uc ON c.created_by = uc.id
            left JOIN user AS uu ON c.updated_by = uu.id
            where c.full_name not like '%Khách Lẻ%'
            order by c.id desc
            
                        """, nativeQuery = true)
    List<CustomerResponse> getAllCustomers();

    @Query(value = """
            select c.id
            ,c.full_name as fullName
            ,c.username as username
            ,c.email as email
            ,c.phone_number as phoneNumber
            ,c.gender as gender
            ,c.deleted as isDeleted
            ,c.avatar as avatar
            ,date_format(c.birth_date, '%m-%d-%Y') as birthDate
            ,date_format(c.created_at  , '%m-%d-%Y %H:%i') as createdAt
            ,date_format(c.updated_at , '%m-%d-%Y %H:%i') as updatedAt
            ,uc.full_name AS createdBy
            ,uu.full_name AS updatedBy
            from customer c
            left JOIN user AS uc ON c.created_by = uc.id
            left JOIN user AS uu ON c.updated_by = uu.id
            where c.id = :id
            """, nativeQuery = true)
    CustomerDetailResponse getCustomerById(Long id);

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByPhoneNumber(String phoneNumber);

    @Query(
            value = """
                    SELECT Max(c.id) FROM customer c where c.full_name like '%Khách Lẻ%'
                    """, nativeQuery = true
    )
    Long getNewId();

}
