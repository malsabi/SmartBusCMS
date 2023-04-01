import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreateStudentForm from "../forms/student/CreateStudentForm";

export default function CreateStudent() {
    const navigate = useNavigate();

    function handleGoBack()
    {
        navigate("/students");
    }
    
    return (
        <Box m="20px">
            <Header title="CREATE STUDENT" subtitle="Create new student members" />
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button color="secondary" size="large" variant="contained" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
                    Go Back
                </Button>
            </Box>
            <CreateStudentForm/>
        </Box>
    );
};