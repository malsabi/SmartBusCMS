import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import SchoolIcon from '@mui/icons-material/School';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useEffect } from "react";
import useAuth from "../../context/AuthContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

export default function Sidebar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Parents");
    const { getAdminInfo } = useAuth();
    const [adminInfo, setAdminInfo] = useState("");

    useEffect(() => {
        let ignore = false;
        async function handleAdminInfo() {
            if (!ignore)
            {
                const data = await getAdminInfo();
                console.log("data", data);
                setAdminInfo(data);
            }
        };

        handleAdminInfo();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}>
            <ProSidebar>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        style={{
                            margin: "20px 0 20px 0",
                            color: colors.grey[100],
                        }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="30px">
                            <Typography variant="h4" color={colors.grey[100]} textAlign="center">
                                Smart Bus Platform
                            </Typography>
                        </Box>
                    </MenuItem>

                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                alt="Default User"
                                width="100px"
                                height="100px"
                                src={`../../assets/icons/userDefault.png`}
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                                variant="h2"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "10px 0 0 0" }}>
                                {adminInfo.FirstName} {adminInfo.LastName}
                            </Typography>
                            <Typography variant="h5" color={colors.greenAccent[500]}>
                                Admin
                            </Typography>
                        </Box>
                    </Box>

                    <Box paddingLeft="12%">
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}>
                            School Members
                        </Typography>
                        <Item
                            title="Parents"
                            to="/"
                            icon={<EscalatorWarningIcon />}
                            selected={selected}
                            setSelected={setSelected} />
                        <Item
                            title="Students"
                            to="/students"
                            icon={<SchoolIcon />}
                            selected={selected}
                            setSelected={setSelected} />
                        <Item
                            title="Drivers"
                            to="/drivers"
                            icon={<AirlineSeatReclineNormalIcon />}
                            selected={selected}
                            setSelected={setSelected} />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}>
                            Transportation
                        </Typography>
                        <Item
                            title="Buses"
                            to="/buses"
                            icon={<DirectionsBusIcon />}
                            selected={selected}
                            setSelected={setSelected} />
                        <Item
                            title="Live Tracking"
                            to="/live-tracking"
                            icon={<GpsFixedIcon />}
                            selected={selected}
                            setSelected={setSelected} />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}>
                            Notes
                        </Typography>
                        <Item
                            title="Notifications"
                            to="/notifications"
                            icon={<ContactMailIcon />}
                            selected={selected}
                            setSelected={setSelected} />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};