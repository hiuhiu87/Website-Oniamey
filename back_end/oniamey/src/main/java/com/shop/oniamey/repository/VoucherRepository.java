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
                        ,v.start_date as startDate
                        ,v.end_date as endDate
                        ,v.minimum_discount as minimumDiscount
                        ,v.maximum_discount as maximumDiscount
                        ,v.created_at as createAt
                        ,v.updated_at as updateAt
                    from banquanaooniamey.voucher as v
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
                        ,v.start_date as startDate
                        ,v.end_date as endDate
                        ,v.minimum_discount as minimumDiscount
                        ,v.maximum_discount as maximumDiscount
                        ,v.created_at as createAt
                        ,v.updated_at as updateAt
                    from banquanaooniamey.voucher as v
                    where v.id = :id
                    """,
            nativeQuery = true
    )
    VoucherDetailResponse getVoucherDetailById(Long id);

    Optional<Voucher> findByVoucherCode(String voucherCode);

    Optional<Voucher> findByType(String type);


}
