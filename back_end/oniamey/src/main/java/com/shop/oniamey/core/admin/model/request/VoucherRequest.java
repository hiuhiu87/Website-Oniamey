package com.shop.oniamey.core.admin.model.request;

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
public class VoucherRequest {

    @NotEmpty(message = "Full name is required")
    private String voucherName;

    @NotEmpty(message = "Voucher Code is required")
    private String voucherCode;

    @NotEmpty(message = "Quantity is required")
    private Long quantity;

    @NotEmpty(message = "Type is required")
    private String type;

    @NotEmpty(message = "Minimum Discount is required")
    private Double minimumDiscount;

    @NotEmpty(message = "Maximum Discount is required")
    private Double maximumDiscount;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Future(message = "Start Date must be in the future")
    @NotNull(message = "Start Date is required")
    private Date startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Future(message = "End date must be in the future")
    @NotNull(message = "End date is required")
    private Date endDate;
}
