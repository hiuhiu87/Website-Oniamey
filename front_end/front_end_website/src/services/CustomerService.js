import axios from "axios";

const BASE_API_URL = "http://localhost:8080/api/admin/customers";

class CustomerService {
  getAllCustomers(page) {
    return axios.get(BASE_API_URL + `/get-all-customers/${page}`);
  }

  getCustomerById(id) {
    return axios.get(BASE_API_URL + "/get-customer-by-id/" + id);
  }

  createCustomer(customer) {
    return axios.post(BASE_API_URL + "/create-user-customer", customer);
  }

  updateCustomer(customer, id) {
    return axios.put(BASE_API_URL + "/update-customer/" + id, customer);
  }

  changeStatusCustomer(id) {
    return axios.put(BASE_API_URL + "/update-customer-status/" + id);
  }

  getTotalPages() {
    return axios.get(BASE_API_URL + "/get-total-page");
  }

  getAllCustomerSearch() {
    return axios.get(BASE_API_URL + "/get-all-customers");
  }
}

const service = new CustomerService();

export default service;
