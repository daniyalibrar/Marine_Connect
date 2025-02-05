import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const { admin } = useSelector((state) => state.auth);
  return role && admin?.role === role ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
