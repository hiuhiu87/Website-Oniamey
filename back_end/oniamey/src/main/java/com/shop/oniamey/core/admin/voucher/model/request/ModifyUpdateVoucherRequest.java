package com.shop.oniamey.core.admin.voucher.model.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModifyUpdateVoucherRequest {

    @NotEmpty(message = "Voucher name is required")
    private String voucherName;

    @NotEmpty(message = "Voucher code is required")
    private String voucherCode;

    @NotNull(message = "Quantity is required")
    private Long quantity;

    @NotNull(message = "Value is required")
    private Double value;

    @NotNull(message = "Minimum discount is required")
    private Double minimumDiscount;

    @NotNull(message = "Maximum discount is required")
    private Double maximumDiscount;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    @NotEmpty(message = "Type is required")
    private String type;

    private Long createdBy;

    private Long updatedBy;

    private Boolean deleted;
}
