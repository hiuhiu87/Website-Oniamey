import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setCommonHeaders } from "../utils/axiosCustomize";

const OAuth2RedirectHandlerFunction = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(token);
      localStorage.setItem("user", JSON.stringify(userData));
      setCommonHeaders(userData.accessToken);
      navigate("/admins");
    } else {
      navigate("/login");
    }
  }, [token, navigate]);
  return null;
};

export default OAuth2RedirectHandlerFunction;
