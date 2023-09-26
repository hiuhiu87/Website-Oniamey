package com.shop.oniamey.core.admin.service;

import java.util.List;

public interface BaseService<T,V> {

    List<V> getAll();

    String save(T t);

    String update(Long id, T t);

    String changeStatus(Long id, Integer status);

}
