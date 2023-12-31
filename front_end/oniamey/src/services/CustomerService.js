import axios from "axios";

const BASE_API_URL = "http://localhost:8088/api/admin/";
const BASE_API_URL_CUSTOMER = BASE_API_URL + "customers";
const BASE_API_URL_ADDRESS = BASE_API_URL + "customer-addresses";

class CustomerService {
    getAllCustomers(page) {
        return axios.get(BASE_API_URL_CUSTOMER + `/get-all-customers/${page}`);
    }

    getCustomerById(id) {
        return axios.get(BASE_API_URL_CUSTOMER + "/get-customer-by-id/" + id);
    }

    createCustomer(customer) {
        return axios.post(
            BASE_API_URL_CUSTOMER + "/create-user-customer",
            customer
        );
    }

    updateCustomer(customer, id) {
        return axios.put(
            BASE_API_URL_CUSTOMER + "/update-customer/" + id,
            customer
        );
    }

    changeStatusCustomer(id) {
        return axios.put(BASE_API_URL_CUSTOMER + "/update-customer-status/" + id);
    }

    getTotalPages() {
        return axios.get(BASE_API_URL_CUSTOMER + "/get-total-page");
    }

    getAllCustomerSearch() {
        return axios.get(BASE_API_URL_CUSTOMER + "/get-all-customers");
    }

    createAddress(address) {
        return axios.post(BASE_API_URL_ADDRESS + "/create-address", address);
    }

    getAddressesById(id) {
        return axios.get(BASE_API_URL_ADDRESS + "/get-all-address/" + id);
    }

  changeDefaultAddress(id) {
    return axios.put(BASE_API_URL_ADDRESS + "/set-default-address/" + id);
  }

  updateAddress(address, id) {
    return axios.put(BASE_API_URL_ADDRESS + "/update-address/" + id, address);
  }

  deleteAddress(id) {
    return axios.put(BASE_API_URL_ADDRESS + "/delete-address/" + id);
  }

  createTemporaryCustomer() {
      return axios.post(BASE_API_URL_CUSTOMER + "/create-temporary-customer");
  }

}

const service = new CustomerService();

export default service;
