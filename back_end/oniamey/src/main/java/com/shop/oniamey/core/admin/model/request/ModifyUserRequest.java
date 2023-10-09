package com.shop.oniamey.core.admin.model.request;

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
@AllArgsConstructor
@NoArgsConstructor
public class ModifyUserRequest {

    @NotEmpty(message = "Full name is required")
    private String fullName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Past(message = "Birth date must be in the past")
    @NotNull(message = "Birth date is required")
    private Date birthDate;

    @NotEmpty(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;

    @NotEmpty(message = "Password is required")
    private String password;

    @NotEmpty(message = "Phone number is required")
    @Pattern(regexp = "(^$|[0-9]{10})")
    private String phoneNumber;

    @NotEmpty(message = "Address is required")
    private String address;

    @NotNull
    @Min(value = 0)
    @Max(value = 2)
    private Integer gender;

    private String avatar;

    private Boolean isDeleted;

    @NotNull(message = "Role is required")
    private Long roleId;

}
