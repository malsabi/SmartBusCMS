import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function NoMatch() {
    const location = useLocation();
    return <Navigate to="/" replace state={{ from: location }} />;
};