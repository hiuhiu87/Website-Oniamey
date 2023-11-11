package com.shop.oniamey.core.admin.promotion.model.response;

public interface PromotionDetailResponse {

    Long getPromotionID();

    String getPromotionName();

    String getPromotionCode();

    Double getPromotionValue();

    Long getPromotionStartDate();

    Long getPromotionEndDate();

    Boolean getPromotionDeleted();

    String getPromotionType();

    String getPromotionUpdatedDate();

    String getPromotionUpdatedBy();

//    String getProductDetails();

}
