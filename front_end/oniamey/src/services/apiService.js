import instance from "../utils/axiosCustomize";

const postCreateProperty = (property, name, deleted) => {
    const data = new FormData();
    data.append('name', name);
    data.append('deleted', deleted);
    return instance.post(`api/v1/`, property, data);
}

const putUpdateProperty = (property, id, name, deleted) => {
    const data = new FormData();
    data.append('name', name);
    data.append('deleted', deleted);
    return instance.post(`api/v1/`, property, id, data);
}

const deleteProperty = (property, id) => {
    return instance.delete(`api/v1/`, property, id);
}

const postCreateProduct = (name, description, deleted) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('deleted', deleted);
    return instance.post(`api/v1/product`, data);
}

const putUpdateProduct = (id, name, description, deleted) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('deleted', deleted);
    return instance.post(`api/v1/product`, id, data);
}

const deleteProduct = (id) => {
    return instance.delete(`api/v1/product`, id);
}

const getAllProducts = () => {
    return instance.get(`api/v1/product`);
}

const getAllProductDetails = () => {
    return instance.get(`api/v1/product/product-details`)
}

const getAllProperties = (property) => {
    return instance.get(`api/v1/`, property);
}

export { getAllProperties, postCreateProperty, putUpdateProperty, deleteProperty, postCreateProduct, putUpdateProduct, deleteProduct, getAllProducts, getAllProductDetails };