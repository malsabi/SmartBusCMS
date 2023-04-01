import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';
import Parents from '../parents';
import CreateParent from "../parents/CreateParent";
import ManageParent from "../parents/ManageParent";
import Students from '../students';
import CreateStudent from "../students/CreateStudent";
import ManageStudent from "../students/ManageStudent";
import Drivers from '../drivers';
import Buses from '../buses';
import LiveTracking from '../live-tracking';
import ParentNotifications from '../parent-notifications';
import BusNotifications from '../bus-notifications';
import NoMatch from '../no-match';

export default function AppStack()
{
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                            <Route index path="/" element={<Parents />} />
                            <Route path="/parents/create" element={<CreateParent />} />
                            <Route path="/parents/manage/:id" element={<ManageParent />} />
                            <Route path="/students" element={<Students />} />
                            <Route path="/students/create" element={<CreateStudent />} />
                            <Route path="/students/manage/:id" element={<ManageStudent />} />
                            <Route path="/drivers" element={<Drivers />} />
                            <Route path="/buses" element={<Buses />} />
                            <Route path="/live-tracking" element={<LiveTracking />} />
                            <Route path="/parent-notifications" element={<ParentNotifications />} />
                            <Route path="/bus-notifications" element={<BusNotifications />} />
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};