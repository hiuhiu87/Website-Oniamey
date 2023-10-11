package com.shop.oniamey.core.common.model.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {

    @NotEmpty(message = "Old password is required")
    private String oldPassword;

    @NotEmpty(message = "New password is required")
    private String newPassword;

}
