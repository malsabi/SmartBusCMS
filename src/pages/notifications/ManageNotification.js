import { Box, Button } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ManageNotificationForm from "../forms/notification/ManageNotificationForm";

export default function ManageNotification() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const row = location.state.row;

    function handleGoBack()
    {
        navigate("/notifications");
    }
    
    return (
        <Box m="20px">
            <Header title="MANAGE NOTIFICATION" subtitle="Managing the Parent and Bus Notification" />
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button color="secondary" size="large" variant="contained" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
                    Go Back
                </Button>
            </Box>
            <ManageNotificationForm id={id} data={row}/>
        </Box>
    );
};