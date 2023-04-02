import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateDriverForm from "../forms/driver/CreateDriverForm";

export default function CreateDriver() {
    const navigate = useNavigate();

    function handleGoBack()
    {
        navigate("/drivers");
    }
    
    return (
        <Box m="20px">
            <Header title="CREATE BUS DRIVER" subtitle="Create new bus driver members" />
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button color="secondary" size="large" variant="contained" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
                    Go Back
                </Button>
            </Box>
            <CreateDriverForm/>
        </Box>
    );
};