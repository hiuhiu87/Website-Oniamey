package com.shop.oniamey.core.admin.promotion.model.response;

import java.util.Date;
import java.util.List;

public interface PromotionProductDetailResponse {

    String getPromotionName();

    String getPromotionCode();

    Double getValue();

    Date getStartDate();

    Date getEndDate();

    String getType();

    Date getUpdatedDate();

    String getUpdatedBy();

    List<Float> getProductDetailPrice();

    List<String> getProductCode();

    List<String> getProductDetailName();

    List<Long> getProductID();

    List<Long> getProductDetailID();
}
