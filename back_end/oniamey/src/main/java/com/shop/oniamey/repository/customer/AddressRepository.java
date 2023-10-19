package com.shop.oniamey.repository.customer;

import com.shop.oniamey.core.admin.customer.model.response.AddressResponse;
import com.shop.oniamey.entity.Address;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findByLineAndWardAndProvinceAndCustomerId(String line, String ward, String province, Long customerId);

    @Query(value = """
            select a.id,
            a.receiver_name as receiver,
            a.receiver_phone_number as phoneNumber,
             a.line as line,
            a.ward as ward ,
            a.province as province ,
            a.district as district ,
            a.is_default as isDefault
            from address a
            join customer c on c.id = a.customer_id
            where c.id = :idCustomer and a.deleted = false
            """, nativeQuery = true)
    List<AddressResponse> getAllAddressByCustomerId(Long idCustomer);

    @Query(value = """
            UPDATE address a 
            SET a.is_default = false 
            WHERE a.customer_id = :idCustomer
            """, nativeQuery = true)
    @Modifying
    @Transactional
    void setDefaultAddress(Long idCustomer);

}
