import { Box, Button } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ManageParentForm from "../forms/parent/ManageParentForm";

export default function ManageParent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const row = location.state.row;

    function handleGoBack()
    {
        navigate("/parents");
    }
    
    return (
        <Box m="20px">
            <Header title="EDIT PARENT" subtitle="Editting the Parent Information" />
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button color="secondary" size="large" variant="contained" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
                    Go Back
                </Button>
            </Box>
            <ManageParentForm id={id} data={row}/>
        </Box>
    );
};