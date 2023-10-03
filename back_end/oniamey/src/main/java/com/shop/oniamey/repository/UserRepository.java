package com.shop.oniamey.repository;

import com.shop.oniamey.core.admin.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.model.response.UserResponse;
import com.shop.oniamey.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(
            value = """
            select u.id
            ,u.full_name as fullName\s
            ,u.email as email
            ,u.phone_number as phoneNumber
            ,r.name as role
            ,u.gender as gender
            ,u.address as address
            ,u.avatar as avatar
            ,date_format(u.birth_date, '%m-%d-%Y') as birthDate
            ,date_format(u.created_date  , '%m-%d-%Y %H:%i') as createdAt\s
            ,date_format(u.last_modified_date , '%m-%d-%Y %H:%i') as updatedAt
            ,uc.full_name AS createdBy
            ,uu.full_name AS updatedBy
            from user as u
            join `role` r on u.role_id = r.id\s
            left JOIN user AS uc ON u.created_by = uc.id
            left JOIN user AS uu ON u.updated_by = uu.id 
            """,
            nativeQuery = true
    )
    List<UserResponse> getAllUsers();

    Optional<User> findByEmail(String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    @Query(
            value = """
            select u.id
            ,u.full_name as fullName
            ,u.email as email
            ,u.phone_number as phoneNumber
            ,u.role_id  as role
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
            where u.id = :id
            """,
            nativeQuery = true
    )
    UserDetailResponse getUserDetailById(Long id);

}
