package com.shop.oniamey.core.admin.model.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CategoryRequest {

    @NotEmpty(message = "Category name is required")
    private String categoryName;

    @Min(value = 0, message = "Status must be greater than 0")
    @Max(value = 1, message = "Status must be less than 1")
    private Integer status;
}
