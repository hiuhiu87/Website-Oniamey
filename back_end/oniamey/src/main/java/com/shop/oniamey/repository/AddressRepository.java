package com.shop.oniamey.repository;

import com.shop.oniamey.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findByLineAndCityAndProvinceAndCountryaAndAndCustomer(String line, String city, String province, String country, Long customerId);

}
