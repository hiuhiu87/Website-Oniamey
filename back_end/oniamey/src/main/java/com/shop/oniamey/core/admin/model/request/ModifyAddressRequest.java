package com.shop.oniamey.core.admin.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModifyAddressRequest {

    @NotEmpty(message = "Line is required")
    private String line;

    @NotEmpty(message = "Ward is required")
    private String ward;

    @NotEmpty(message = "City is required")
    private String city;

    @NotEmpty(message = "Province is required")
    private String province;

    @NotEmpty(message = "Country is required")
    private String country;

    @NotNull(message = "Customer id is required")
    private Long customerId;

    @NotNull(message = "Is default is required")
    private Boolean isDefault;

    @NotNull(message = "Status is required")
    private Integer status;

}
