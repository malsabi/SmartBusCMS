import React from "react";
import useAuth from "../context/AuthContext";
import AppStack from "../pages/stacks/AppStack";
import AuthStack from "../pages/stacks/AuthStack";

export default function AppNav()
{
    const { userToken } = useAuth();
    return userToken != null ? <AppStack /> : <AuthStack />;
};