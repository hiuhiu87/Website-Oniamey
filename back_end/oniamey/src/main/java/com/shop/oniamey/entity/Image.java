package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Image extends BaseModel {

    public static final Integer MAXIMUM_IMAGE_PER_PRODUCT = 5;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_product_detail")
    private ProductDetail productDetail;

    @Column(name = "cover")
    private String cover;

    @Column(name = "image_url")
    private String imageUrl;

}
