import axios from "axios";
import { Navigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://localhost:8088/",
});

const setCommonHeaders = (accessToken) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const authInterceptor = () => {
  const userInfo = localStorage.getItem("user");
  // console.log(typeof userInfo);
  if (userInfo === "null") {
    return <Navigate to="/login" />;
  } else {
    const token = userInfo ? JSON.parse(userInfo).accessToken : null;
    if (token != null) {
      const decodedToken = parseJwt(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        console.log("setCommonHeaders");
        setCommonHeaders(token);
      }
    }
  }
};

// Call authInterceptor on page load
authInterceptor();

export default instance;
export { setCommonHeaders, authInterceptor };
