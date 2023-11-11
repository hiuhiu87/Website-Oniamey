package com.shop.oniamey.core.admin.promotion.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FindPromotionRequest {

    String promotionInput;

    Long promotionStatus;

    String promotionType;

    Long promotionStartDate;

    Long promotionEndDate;
}
