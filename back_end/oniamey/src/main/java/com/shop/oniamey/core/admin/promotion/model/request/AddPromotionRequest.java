package com.shop.oniamey.core.admin.promotion.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddPromotionRequest {

    private String promotionName;

//    private String promotionCode;

    private String promotionType;

    private Double promotionValue;

//    private Boolean promotionDeleted;

    private Long promotionStartDate;

    private Long promotionEndDate;

    private List<Long> promotionProductID;

    private List<Long> promotionProductDetailID;

}
