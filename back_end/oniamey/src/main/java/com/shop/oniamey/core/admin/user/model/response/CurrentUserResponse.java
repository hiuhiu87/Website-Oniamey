package com.shop.oniamey.core.admin.user.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CurrentUserResponse {

    private Long id;

    private String username;

    private String imageUrl;

    private String email;

    private String role;

}
