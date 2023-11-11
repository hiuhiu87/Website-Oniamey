package com.shop.oniamey.core.admin.promotion.model.response;

import java.util.Date;

public interface PromotionResponse {

    String getPromotionName();

    String getPromotionCode();

    Double getValue();

    Date getStartDate();

    Date getEndDate();

    String getType();

    String getProductDetailName();

    Float getPrice();

    Date getUpdatedDate();

    String getUpdatedBy();

}
