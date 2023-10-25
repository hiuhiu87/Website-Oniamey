import axios from "axios";

const instance = axios.create({
  // Đường link backend muốn gọi tới
  baseURL: "http://localhost:8088/",
});

const setCommonHeaders = (accessToken) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

const checkToken = () => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response.status === 401 &&
        !window.location.pathname.includes("login")
      ) {
        localStorage.removeItem("user");
        window.location.href = window.location.origin + "/login";
      }
      return Promise.reject(error);
    }
  );
};

export default instance;
export { setCommonHeaders, checkToken };
