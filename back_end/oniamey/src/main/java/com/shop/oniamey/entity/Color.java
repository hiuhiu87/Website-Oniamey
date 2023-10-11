package com.shop.oniamey.entity;

import com.shop.oniamey.entity.base.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "color")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Color extends BaseModel {

    @Column(name = "name")
    private String name;

}
