package com.shop.oniamey.repository.user;

import com.shop.oniamey.entity.Role;
import com.shop.oniamey.infrastructure.constant.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(RoleName name);

}
