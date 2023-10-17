package com.shop.oniamey.core.admin.product.service;

import com.shop.oniamey.core.admin.product.model.request.PropertyRequest;
import com.shop.oniamey.core.admin.product.model.response.PropertyResponse;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;

import java.util.List;

public interface IPropertyService<T, ID>{

    T getById(ID id) throws DataNotFoundException;

    List<PropertyResponse> getAll();

    T create(PropertyRequest propertyRequest);

    T update(ID id, PropertyRequest propertyRequest) throws DataNotFoundException;

    void delete(ID id) throws DataNotFoundException;

}