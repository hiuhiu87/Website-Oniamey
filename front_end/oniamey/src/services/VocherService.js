import axios from "axios";

const BASE_API_URL = "http://localhost:8088/api/admin/vouchers/";

// postman
// localhost:8088/api/admin/vouchers/get-all-voucher

const getAllVouchersPage = (page) => {
    return axios.get(BASE_API_URL + `get-all-voucher/${page}`)
}

const getAllVouchers = () => {
    return axios.get(BASE_API_URL + `get-all-voucher`)
}

const getSearch = (code, type, deleted) => {
    return axios.get(BASE_API_URL + `get-search?code=${code}&type=${type}&deleted=${deleted}`)
}

const getSearchByCode = (code, type) => {
    return axios.get(BASE_API_URL + `get-search-by-code?code=${code}&type=${type}`)
}

const getVoucher = (id) => {
    return axios.get(BASE_API_URL + `get-one/${id}`)
}

const createVoucher = (voucher) => {
    return axios.post(BASE_API_URL + `create-voucher`, voucher)
}

const updateVoucher = (id, voucher) => {
    return axios.put(BASE_API_URL + `update-voucher/${id}`, voucher)
}

const deleteVoucher = (id) => {
    return axios.put(BASE_API_URL + `delete-voucher/${id}`)
}

const getTotalPage = () => {
    return axios.get(BASE_API_URL + `get-total-page`);
}

export { getAllVouchersPage, getAllVouchers, getVoucher, createVoucher, updateVoucher, deleteVoucher, getTotalPage, getSearch, getSearchByCode };
