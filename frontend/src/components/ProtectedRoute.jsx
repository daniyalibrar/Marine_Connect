import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const { user } = useSelector((state) => state.auth);
  return role && user?.role === role ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
