import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthCustom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
