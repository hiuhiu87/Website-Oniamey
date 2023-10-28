package com.shop.oniamey.repository.user;

import com.shop.oniamey.core.admin.user.model.response.UserDetailResponse;
import com.shop.oniamey.core.admin.user.model.response.UserResponse;
import com.shop.oniamey.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = """
            select u.id
            ,u.full_name as fullName
            ,u.email as email
            ,u.phone_number as phoneNumber
            ,u.role as role
            ,u.gender as gender
            ,u.address as address
            ,u.avatar as avatar
            ,u.deleted as status
            ,date_format(u.birth_date, '%m-%d-%Y') as birthDate
            ,date_format(u.created_at  , '%m-%d-%Y %H:%i') as createdAt\s
            ,date_format(u.updated_at , '%m-%d-%Y %H:%i') as updatedAt
            ,uc.full_name AS createdBy
            ,uu.full_name AS updatedBy
            from user as u
            left JOIN user AS uc ON u.created_by = uc.id
            left JOIN user AS uu ON u.updated_by = uu.id 
            order by u.id desc
            """, nativeQuery = true)
    List<UserResponse> getAllUsers(Pageable pageable);

    @Query(value = """
            select u.id
            ,u.full_name as fullName
            ,u.email as email
            ,u.phone_number as phoneNumber
            ,u.role as role
            ,u.gender as gender
            ,u.address as address
            ,u.avatar as avatar
            ,u.deleted as status
            ,date_format(u.birth_date, '%m-%d-%Y') as birthDate
            ,date_format(u.created_at  , '%m-%d-%Y %H:%i') as createdAt
            ,date_format(u.updated_at , '%m-%d-%Y %H:%i') as updatedAt
            ,uc.full_name AS createdBy
            ,uu.full_name AS updatedBy
            from user as u
            left JOIN user AS uc ON u.created_by = uc.id
            left JOIN user AS uu ON u.updated_by = uu.id 
            order by u.id desc
            """, nativeQuery = true)
    List<UserResponse> getAllUsers();

    Optional<User> findByEmail(String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    @Query(value = """
                select u.id
                ,u.username as username
                ,u.identity_card as identityCard
                ,u.full_name as fullName
                ,u.email as email
                ,u.phone_number as phoneNumber
                ,u.role  as role
                ,u.gender as gender
                ,u.address as address
                ,u.avatar as avatar
                ,u.deleted as isDeleted
                ,date_format(u.birth_date, '%m-%d-%Y') as birthDate
                ,date_format(u.created_at  , '%m-%d-%Y %H:%i') as createdAt
                ,date_format(u.updated_at , '%m-%d-%Y %H:%i') as updatedAt
                ,uc.full_name AS createdBy
                ,uu.full_name AS updatedBy
                from user as u
                left JOIN user AS uc ON u.created_by = uc.id
                left JOIN user AS uu ON u.updated_by = uu.id
                where u.id = :id
                
            """, nativeQuery = true)
    UserDetailResponse getUserDetailById(Long id);

    Optional<User> findByUsername(String username);

    Optional<User> findByIdentityCard(String identityCard);
}
