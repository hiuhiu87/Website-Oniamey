package com.shop.oniamey.core.admin.promotion.model.request;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddPromotionRequest {

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
