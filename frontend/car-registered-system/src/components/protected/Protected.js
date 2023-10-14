import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  return (
    <div>
      {localStorage.getItem("token") ? <Navigate to={"/"} /> : <Outlet />}
    </div>
  );
}

export default Protected;
