package com.shop.oniamey.repository;

import com.shop.oniamey.core.admin.model.response.VoucherDetailResponse;
import com.shop.oniamey.core.admin.model.response.VoucherResponse;
import com.shop.oniamey.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {

    @Query(
            value = """
                    select v.id
                    ,v.voucher_name as voucherName
                    ,v.voucher_code as voucherCode
                    ,v.quantity as quantity
                    ,v.type as type
                    ,v.minimum_discount as minimumDiscount
                    ,v.maximum_discount as maximumDiscount
                    ,date_format(v.start_date, '%m-%d-%Y') as startDate
                    ,date_format(v.end_date, '%m-%d-%Y') as endDate
                    ,date_format(v.created_date  , '%m-%d-%Y %H:%i') as createdAt\s
                    ,date_format(v.last_modified_date , '%m-%d-%Y %H:%i') as updatedAt
                    ,uc.full_name AS createdBy
                    ,uu.full_name AS updatedBy
                    from voucher as v
                    left JOIN voucher AS uc ON v.created_by = uc.id
                    left JOIN voucher AS uu ON v.updated_by = uu.id 
                    """,
            nativeQuery = true
    )
    List<VoucherResponse> getAllVoucher();

    @Query(
            value = """
                    select v.id
                    ,v.voucher_name as voucherName
                    ,v.voucher_code as voucherCode
                    ,v.quantity as quantity
                    ,v.type as type
                    ,v.minimum_discount as minimumDiscount
                    ,v.maximum_discount as maximumDiscount
                    ,date_format(v.start_date, '%m-%d-%Y') as startDate
                    ,date_format(v.end_date, '%m-%d-%Y') as endDate
                    ,date_format(v.created_date  , '%m-%d-%Y %H:%i') as createdAt\s
                    ,date_format(v.last_modified_date , '%m-%d-%Y %H:%i') as updatedAt
                    ,uc.full_name AS createdBy
                    ,uu.full_name AS updatedBy
                    from voucher as v
                    left JOIN voucher AS uc ON v.created_by = uc.id
                    left JOIN voucher AS uu ON v.updated_by = uu.id 
                    where v.id = :id
                    """,
            nativeQuery = true
    )
    VoucherDetailResponse getVoucherDetailById(Long id);

    Optional<Voucher> findByVoucherCode(String voucherCode);

    Optional<Voucher> findByType(String type);


}
