package com.shop.oniamey.core.admin.promotion.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePromotionRequest {

    private String promotionName;

    private String promotionCode;

    private String promotionType;

    private Double promotionValue;

    private Boolean promotionDeleted;

    private String promotionStartDate;

    private String promotionEndDate;

    private Long promotionProductID;

    private Long promotionProductDetailID;

}
