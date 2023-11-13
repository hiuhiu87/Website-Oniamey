package com.shop.oniamey.repository.customer;

import com.shop.oniamey.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {
}
