import { setCommonHeaders } from "../utils/axiosCustomize";
import instance from "../utils/axiosCustomize";

const BASE_API_URL = "/api/admin/users";
const BASE_API_URL_LOGIN = "/api/auth";

class UserService {
  setAccessToken(accessToken) {
    setCommonHeaders(accessToken);
  }

  getUsersPaging(page) {
    return instance.get(BASE_API_URL + `/get-all-staffs/${page}`);
  }

  getUserById(id) {
    return instance.get(BASE_API_URL + "/get-staff-by-id/" + id);
  }

  createUser(user) {
    return instance.post(BASE_API_URL + "/create-user-staff", user);
  }

  updateUser(user, id) {
    return instance.put(BASE_API_URL + "/update-staff/" + id, user);
  }

  changeStatusUser(id) {
    return instance.put(BASE_API_URL + "/update-staff-status/" + id);
  }

  getTotalPages() {
    return instance.get(BASE_API_URL + "/total-page");
  }

  getAllUsers() {
    return instance.get(BASE_API_URL + "/get-all-staffs");
  }

  login(loginData) {
    return instance.post(BASE_API_URL_LOGIN + "/login", loginData);
  }

  getUserByEmail(email) {
    return instance.get(BASE_API_URL + "/get-user-by-email/", {
      params: {
        email: email,
      },
    });
  }
}

const userService = new UserService();

export default userService;
