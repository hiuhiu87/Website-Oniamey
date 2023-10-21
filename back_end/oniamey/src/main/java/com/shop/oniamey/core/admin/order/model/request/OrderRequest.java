package com.shop.oniamey.core.admin.order.model.request;

import com.shop.oniamey.infrastructure.constant.OrderStatus;
import com.shop.oniamey.infrastructure.constant.OrderType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    @Min(value = 1)
    @NotNull(message = "user id is required")
    private Long userId;

    @Min(value = 1)
    @NotNull(message = "customer is required")
    private Long customerId;

    @NotNull(message = "phone number is required")
    private String phoneNumber;

    @NotEmpty (message = "address is required")
    private String address;

    @NotEmpty (message = "address is required")
    private String userName;

    @NotNull(message = "total money is required")
    private Double totalMoney;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Past
    private Date confirmationDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date shipDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date receiveDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Past
    private Date completionDate;

    @NotEmpty (message = "address is required")
    private OrderType type;

    @NotEmpty (message = "address is required")
    @Length(max = 1000)
    private String note;

    @NotNull(message = "money ship is required")
    private Double moneyShip;

    @NotNull(message = "status is required")
    private OrderStatus status;

    @NotNull(message = "voucher id is required")
    @Min(value = 1)
    private Long voucherId;
}
