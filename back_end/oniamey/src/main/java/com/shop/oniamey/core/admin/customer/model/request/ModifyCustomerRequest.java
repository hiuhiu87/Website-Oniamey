package com.shop.oniamey.core.admin.customer.model.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
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
public class ModifyCustomerRequest {

    @NotEmpty(message = "Full name is required")
    private String fullName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Past(message = "Birth date must be in the past")
    @Nullable
    private Date birthDate;

    @NotEmpty(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;

    @NotEmpty(message = "Phone number is required")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String phoneNumber;

    @Min(value = 1)
    @Max(value = 3)
    @Nullable
    private Integer gender;

    private String avatar;

    private Boolean isDeleted;

}
