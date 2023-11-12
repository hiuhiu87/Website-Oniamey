package com.shop.oniamey.core.admin.product.model.response;

public interface ProductDetailResponse {

    Long getId();

    Long getCategoryId();

    Long getSizeId();

    Long getMaterialId();

    Long getBrandId();

    Long getColorId();

    Long getCollarId();

    Long getSleeveLengthId();

    String getCategory();

    String getSize();

    String getMaterial();

    String getBrand();

    String getColor();

    String getCollar();

    String getSleeveLength();

    String getName();

    Float getPrice();

    Long getQuantity();

    Float getWeight();

    String getCover();

    Boolean getDeleted();

}