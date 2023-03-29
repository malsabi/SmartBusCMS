import React from "react";
import { AuthProvider } from "./context/AuthContext";

import AppNav from "./navigations/AppNav";

export default function App() {
    return (
        <AuthProvider>
            <AppNav/>
        </AuthProvider>
    );
};