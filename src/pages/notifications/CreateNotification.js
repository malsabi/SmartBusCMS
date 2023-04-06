import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateNotificationForm from "../forms/notification/CreateNotificationForm";

export default function CreateNotification() {
    const navigate = useNavigate();

    function handleGoBack()
    {
        navigate("/notifications");
    }
    
    return (
        <Box m="20px">
            <Header title="CREATE NOTIFICATION" subtitle="Create new Parent Notification or Bus Notification" />
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button color="secondary" size="large" variant="contained" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
                    Go Back
                </Button>
            </Box>
            <CreateNotificationForm/>
        </Box>
    );
};