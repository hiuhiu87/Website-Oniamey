package com.shop.oniamey.core.admin.customer.model.request;

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

    @NotEmpty(message = "District is required")
    private String district;

    @NotEmpty(message = "Province is required")
    private String province;

    @NotNull(message = "Customer id is required")
    private Long customerId;

    @NotNull(message = "Is default is required")
    private Boolean isDefault;

    @NotNull(message = "Status is required")
    private Boolean isDeleted;

}
