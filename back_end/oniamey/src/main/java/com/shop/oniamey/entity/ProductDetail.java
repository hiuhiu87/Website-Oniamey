package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "product_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetail extends BaseModel {

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "id_size")
    private Size size;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "id_material")
    private Material material;

    @ManyToOne
    @JoinColumn(name = "id_brand")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "id_color")
    private Color color;

    @ManyToOne
    @JoinColumn(name = "id_collar")
    private Collar collar;

    @ManyToOne
    @JoinColumn(name = "id_sleeve_length")
    private SleeveLength sleeveLength;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "name")
    private String name;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "price")
    private Float price;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "weight")
    private Float weight;

//    @OneToMany(mappedBy = "productDetail", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private List<Image> images;

}
