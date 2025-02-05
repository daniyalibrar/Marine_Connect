import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

function LogoutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  return <Navigate to="/" />;
}

export default LogoutPage;
