package com.shop.oniamey.core.admin.product.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class PropertyRequest {

    @NotBlank(message = "Property name cannot be left blank!")
    private String name;

    private Boolean deleted;

}