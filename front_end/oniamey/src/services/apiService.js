import instance from "../utils/axiosCustomize";

const postCreateProperty = (property, name, deleted) => {
    const data = new FormData();
    data.append('name', name);
    data.append('deleted', deleted);
    return instance.post(`api/v1/` + property, data);
}

const putUpdateProperty = (property, id, name, deleted) => {
    const data = new FormData();
    data.append('name', name);
    data.append('deleted', deleted);
    return instance.put(`api/v1/${property}/${id}`, data);
}

const deleteProperty = (property, id) => {
    return instance.delete(`api/v1/${property}/${id}`);
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
    return instance.put(`api/v1/product/${id}`, data);
}

const deleteProduct = (id) => {
    return instance.delete(`api/v1/product/${id}`);
}

const getAllProducts = () => {
    return instance.get(`api/v1/product/getAll`);
}

const getAllProductsWithPage = (page, limit) => {
    return instance.get(`api/v1/product?page=${page}&limit=${limit}`);
}

const postProductDetail = (productId, categoryId, sizeIds, colorIds, materialId, brandId, collarId, sleeveLengthId, names, quantities, prices) => {
    const data = new FormData();
    data.append('productId', productId);
    data.append('categoryId', categoryId);
    sizeIds.forEach(sizeId => {
        data.append('sizeId', sizeId);
    });
    colorIds.forEach(colorId => {
        data.append('colorId', colorId);
    });
    data.append('materialId', materialId);
    data.append('brandId', brandId);
    data.append('collarId', collarId);
    data.append('sleeveLengthId', sleeveLengthId);
    data.append('names', names);
    data.append('quantities', quantities);
    data.append('prices', prices);
    return instance.post(`api/v1/product/product-details`, data);
}

const postImageForProductDetails = (colorId, productDetailIds, imageUrl) => {
    const data = new FormData();
    data.append('colorId', colorId);
    if (!Array.isArray(productDetailIds)) {
        productDetailIds = [productDetailIds];
    }
    productDetailIds.forEach((productDetailId, index) => {
        data.append('productDetailId', productDetailId);
        if (imageUrl[index] && imageUrl[index].originFileObj) {
            data.append('imageUrl', imageUrl[index].originFileObj);
        }
    });
    return instance.post(`api/v1/images/upload`, data);
}

const deleteProductDetailsByProperty = (productId, sizeIds, colorIds) => {
    const data = new FormData();
    data.append('productId', productId);
    sizeIds.forEach(sizeId => {
        data.append('sizeId', sizeId);
    });
    colorIds.forEach(colorId => {
        data.append('colorId', colorId);
    });
    return instance.post(`api/v1/product/product-details`, data);
}

const getAllProductDetails = () => {
    return instance.get(`api/v1/product/product-details`)
}

const getAllProductDetailsByProductId = (productId) => {
    return instance.get(`api/v1/product/product-details/${productId}`)
}

const getAllProperties = (property) => {
    return instance.get(`api/v1/` + property);
}

export {
    getAllProperties, postCreateProperty, putUpdateProperty, deleteProperty,
    postCreateProduct, putUpdateProduct, deleteProduct, getAllProducts, getAllProductsWithPage,
    getAllProductDetails, postProductDetail, deleteProductDetailsByProperty, getAllProductDetailsByProductId,
    postImageForProductDetails
};