import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateParentForm from "../forms/parent/CreateParentForm";

export default function CreateParent() {
    const navigate = useNavigate();

    function handleGoBack()
    {
        navigate("/parents");
    }
    
    return (
        <Box m="20px">
            <Header title="CREATE PARENT" subtitle="Create new parent members" />
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button color="secondary" size="large" variant="contained" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
                    Go Back
                </Button>
            </Box>
            <CreateParentForm/>
        </Box>
    );
};