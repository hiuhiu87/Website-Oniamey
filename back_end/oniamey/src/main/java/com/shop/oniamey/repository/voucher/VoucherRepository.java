package com.shop.oniamey.repository.voucher;

import com.shop.oniamey.core.admin.voucher.model.response.VoucherResponse;
import com.shop.oniamey.entity.Voucher;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    @Query(value = """
    SELECT v.id
        , v.voucher_name as voucherName
        , v.voucher_code as voucherCode
        , v.quantity
        , v.value
        , v.minimum_discount as minimumDiscount
        , v.maximum_discount as maximumDiscount
        , v.start_date as startDate
        , v.end_date as endDate
        , v.type
        , v.created_at as createdAt
        , v.updated_at as updatedAt
        , v.created_by AS createdBy
        , v.updated_by AS updatedBy
        , v.deleted
         FROM voucher v
    """, nativeQuery = true)
    List<VoucherResponse> getAllVoucher();

    @Query(value = """
    SELECT v.id
        , v.voucher_name as voucherName
        , v.voucher_code as voucherCode
        , v.quantity
        , v.value
        , v.minimum_discount as minimumDiscount
        , v.maximum_discount as maximumDiscount
        , v.start_date as startDate
        , v.end_date as endDate
        , v.type
        , v.created_at as createdAt
        , v.updated_at as updatedAt
        , v.created_by AS createdBy
        , v.updated_by AS updatedBy
        , v.deleted
         FROM voucher v
    """, nativeQuery = true)
    List<VoucherResponse> getAllVoucher(Pageable pageable);

    @Query(value = """
    SELECT v.id
        , v.voucher_name as voucherName
        , v.voucher_code as voucherCode
        , v.quantity
        , v.value
        , v.minimum_discount as minimumDiscount
        , v.maximum_discount as maximumDiscount
        , v.start_date as startDate
        , v.end_date as endDate
        , v.type
        , v.created_at as createdAt
        , v.updated_at as updatedAt
        , v.created_by AS createdBy
        , v.updated_by AS updatedBy
        , v.deleted
         FROM voucher v WHERE v.id = :id
    """, nativeQuery = true)
    Optional<VoucherResponse> getVoucherById(Long id);

    Optional<VoucherResponse> findByVoucherCode(String voucherCode);

    @Query(value = """
    SELECT v.id
        , v.voucher_name as voucherName
        , v.voucher_code as voucherCode
        , v.quantity
        , v.value
        , v.minimum_discount as minimumDiscount
        , v.maximum_discount as maximumDiscount
        , v.start_date as startDate
        , v.end_date as endDate
        , v.type
        , v.created_at as createdAt
        , v.updated_at as updatedAt
        , v.created_by AS createdBy
        , v.updated_by AS updatedBy
        , v.deleted
         FROM voucher v WHERE (v.voucher_code like %:code% OR :code IS NULL OR v.voucher_name like %:code% 
         OR v.quantity like %:code% OR v.value like %:code% OR v.minimum_discount like %:code% 
         OR v.maximum_discount like %:code%) AND v.type like %:type% AND v.deleted = :deleted
    """, nativeQuery = true)
    List<VoucherResponse> search(String code, String type, Boolean deleted);

    @Query(value = """
    SELECT v.id
        , v.voucher_name as voucherName
        , v.voucher_code as voucherCode
        , v.quantity
        , v.value
        , v.minimum_discount as minimumDiscount
        , v.maximum_discount as maximumDiscount
        , v.start_date as startDate
        , v.end_date as endDate
        , v.type
        , v.created_at as createdAt
        , v.updated_at as updatedAt
        , v.created_by AS createdBy
        , v.updated_by AS updatedBy
        , v.deleted
         FROM voucher v WHERE ( v.voucher_code like %:code% OR v.voucher_name like %:code% 
         OR v.quantity like %:code% OR v.value like %:code% OR v.minimum_discount like %:code% 
         OR v.maximum_discount like %:code% ) AND v.type like %:type%
    """, nativeQuery = true)
    List<VoucherResponse> searchByCode(String code, String type);
}
