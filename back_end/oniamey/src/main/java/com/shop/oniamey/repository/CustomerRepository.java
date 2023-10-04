package com.shop.oniamey.repository;

import com.shop.oniamey.core.admin.model.response.UserResponse;
import com.shop.oniamey.entity.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{

    @Query(
            value = """
            select u.id
            ,u.full_name as fullName
            ,u.email as email
            ,u.phone_number as phoneNumber
            ,r.name as role
            ,u.gender as gender
            ,u.address as address
            ,u.avatar as avatar
            ,date_format(u.birth_date, '%m-%d-%Y') as birthDate
            ,date_format(u.created_date  , '%m-%d-%Y %H:%i') as createdAt
            ,date_format(u.last_modified_date , '%m-%d-%Y %H:%i') as updatedAt
            ,uc.full_name AS createdBy
            ,uu.full_name AS updatedBy
            from user as u
            join `role` r on u.role_id = r.id
            left JOIN user AS uc ON u.created_by = uc.id
            left JOIN user AS uu ON u.updated_by = uu.id
            join customer c on u.id = c.user_id
                        """,
            nativeQuery = true
    )
    List<UserResponse> getAllUsers(Pageable pageable);

}
