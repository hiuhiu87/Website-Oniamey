package com.shop.oniamey.repository;

import com.shop.oniamey.core.admin.model.response.AddressResponse;
import com.shop.oniamey.entity.Address;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findByLineAndWardAndCityAndProvinceAndCountryAndCustomerId(String line, String city, String province, String country, @NotEmpty(message = "Country is required") String modifyAddressRequestCountry, Long customerId);

    @Query(value = """
            select a.line as line,
            a.ward as ward ,
            a.city as city ,
            a.province as province ,
            a.country as country ,
            a.is_default as isDefault
            from address a\s
            join customer c on c.id = a.customer_id\s
            where c.id = :idCustomer
            """, nativeQuery = true)
    List<AddressResponse> getAllAddressByCustomerId(Long idCustomer);

}
