import { Box, Button } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ManageDriverForm from "../forms/driver/ManageDriverForm";

export default function ManageDriver() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const row = location.state.row;

    function handleGoBack()
    {
        navigate("/drivers");
    }
    
    return (
        <Box m="20px">
            <Header title="MANAGE BUS DRIVER" subtitle="Managing the Bus Driver Information" />
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                <Button color="secondary" size="large" variant="contained" startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
                    Go Back
                </Button>
            </Box>
            <ManageDriverForm id={id} data={row}/>
        </Box>
    );
};