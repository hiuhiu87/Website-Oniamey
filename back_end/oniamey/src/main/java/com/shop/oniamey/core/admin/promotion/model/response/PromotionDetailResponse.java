package com.shop.oniamey.core.admin.promotion.model.response;

public interface PromotionDetailResponse {

    Long getPromotionID();

    String getPromotionName();

    String getPromotionCode();

    Double getPromotionValue();

    String getPromotionStartDate();

    String getPromotionEndDate();

    Boolean getPromotionDeleted();

    String getPromotionType();

    String getPromotionUpdatedDate();

    String getPromotionUpdatedBy();

    String getProductDetails();

}
