import axios from "axios";

const BASE_API_URL = "http://localhost:8088/api/admin/users";

class UserService {
    getUsersPaging(page) {
        return axios.get(BASE_API_URL + `/get-all-staffs/${page}`);
    }

    getUserById(id) {
        return axios.get(BASE_API_URL + "/get-staff-by-id/" + id);
    }

    createUser(user) {
        return axios.post(BASE_API_URL + "/create-user-staff", user);
    }

    updateUser(user, id) {
        return axios.put(BASE_API_URL + "/update-staff/" + id, user);
    }

  changeStatusUser(id) {
    return axios.put(BASE_API_URL + "/update-staff-status/" + id);
  }

    getTotalPages() {
        return axios.get(BASE_API_URL + "/total-page");
    }

    getAllUsers() {
        return axios.get(BASE_API_URL + "/get-all-staffs");
    }
}

const userService = new UserService();

export default userService;
