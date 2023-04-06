import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateBusForm from "../forms/bus/CreateBusForm";

export default function CreateBus() {
    const navigate = useNavigate();

    function handleGoBack()
    {
        navigate("/buses");
    }
    
    return (
        <Box m="20px">
            <Header title="CREATE BUS" subtitle="Create new Bus Vehicle" />
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button color="secondary" size="large" variant="contained" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
                    Go Back
                </Button>
            </Box>
            <CreateBusForm/>
        </Box>
    );
};