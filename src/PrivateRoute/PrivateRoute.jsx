import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { verifyToken } from "../Store/Slices/Loginslice/AuthSlice";
import DashboardLoader from "../Components/Loaders/DashboardLoader";
import Loaders from "../Components/Loaders/Loaders";
const PrivateRoute = () => {
  const { isLogin, isChecking } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);


  if (isChecking) {
    return <Loaders />; // or loader
  }
  return isLogin ? <Outlet  /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
