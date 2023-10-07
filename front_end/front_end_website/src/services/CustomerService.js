import axios from "axios";

const BASE_API_URL = "http://localhost:8080/api/admin/customers";

class CustomerService {
  getAllCustomers(page) {
    return axios.get(BASE_API_URL + `/get-all-customers/${page}`);
  }

  getCustomerById(id) {
    return axios.get(BASE_API_URL + "/" + id);
  }

  createCustomer(customer) {
    return axios.post(BASE_API_URL + "/create-user-customer", customer);
  }

  updateCustomer(customer, id) {
    return axios.put(BASE_API_URL + "/" + id, customer);
  }

  deleteCustomer(id) {
    return axios.delete(BASE_API_URL + "/" + id);
  }
}

const service = new CustomerService();

export default service;