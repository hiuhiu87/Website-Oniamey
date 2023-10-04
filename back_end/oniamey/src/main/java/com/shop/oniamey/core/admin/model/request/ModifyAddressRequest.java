package com.shop.oniamey.core.admin.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModifyAddressRequest {

    private String line;

    private String city;

    private String province;

    private String country;

    private Long customerId;

}
