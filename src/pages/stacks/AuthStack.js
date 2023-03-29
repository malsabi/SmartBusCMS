import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Topbar from '../global/Topbar';
import Login from "../login";
import NoMatch from '../no-match';

export default function AuthStack() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <main className="content">
                        <Topbar />
                        <Routes>
                            <Route index path="/" element={<Login />} />
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};