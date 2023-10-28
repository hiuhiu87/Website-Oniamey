import { setCommonHeaders } from "../utils/axiosCustomize";
import instance from "../utils/axiosCustomize";

const BASE_API_URL = "/api/admin/";
const BASE_API_URL_CUSTOMER = BASE_API_URL + "customers";
const BASE_API_URL_ADDRESS = BASE_API_URL + "customer-addresses";

class CustomerService {

  setAccessToken(accessToken) {
    setCommonHeaders(accessToken);
  }

  getAllCustomers(page) {
    return instance.get(BASE_API_URL_CUSTOMER + `/get-all-customers/${page}`);
  }

  getCustomerById(id) {
    return instance.get(BASE_API_URL_CUSTOMER + "/get-customer-by-id/" + id);
  }

  createCustomer(customer) {
    return instance.post(
      BASE_API_URL_CUSTOMER + "/create-user-customer",
      customer
    );
  }

  updateCustomer(customer, id) {
    return instance.put(
      BASE_API_URL_CUSTOMER + "/update-customer/" + id,
      customer
    );
  }

  changeStatusCustomer(id) {
    return instance.put(
      BASE_API_URL_CUSTOMER + "/update-customer-status/" + id
    );
  }

  getTotalPages() {
    return instance.get(BASE_API_URL_CUSTOMER + "/get-total-page");
  }

  getAllCustomerSearch() {
    return instance.get(BASE_API_URL_CUSTOMER + "/get-all-customers");
  }

  createAddress(address) {
    return instance.post(BASE_API_URL_ADDRESS + "/create-address", address);
  }

  getAddressesById(id) {
    return instance.get(BASE_API_URL_ADDRESS + "/get-all-address/" + id);
  }

  changeDefaultAddress(id) {
    return instance.put(BASE_API_URL_ADDRESS + "/set-default-address/" + id);
  }

  updateAddress(address, id) {
    return instance.put(
      BASE_API_URL_ADDRESS + "/update-address/" + id,
      address
    );
  }

  deleteAddress(id) {
    return instance.put(BASE_API_URL_ADDRESS + "/delete-address/" + id);
  }
}

const service = new CustomerService();

export default service;
