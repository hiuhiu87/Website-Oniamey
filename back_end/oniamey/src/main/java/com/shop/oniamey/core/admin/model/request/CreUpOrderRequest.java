package com.shop.oniamey.core.admin.model.request;

import com.shop.oniamey.entity.Customer;
import com.shop.oniamey.entity.User;
import com.shop.oniamey.entity.base.EnumStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class CreUpOrderRequest {

    private Long id;

    @Min(value = 1)
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
    private String type;

    @NotEmpty (message = "address is required")
    @Length(max = 1000)
    private String note;

    @NotNull(message = "money ship is required")
    private Double moneyShip;

    @NotEmpty(message = "status is required")
    private EnumStatus status;
}
