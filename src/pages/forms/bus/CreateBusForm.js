import React, { useState } from "react";
import { Box, Button, FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useAuth from "../../../context/AuthContext";
import BusDto from "../../../DTOs/bus/BusDto";
import { useNavigate } from "react-router-dom";
import BusService from "../../../services/BusService";
import AddIcon from '@mui/icons-material/Add';
import AlertMessage from "../../../components/AlertMessage";

const busSchema = yup.object().shape({
    licenseNumber: yup
        .string()
        .required("Required"),
    capacity: yup
        .string()
        .required("Required"),
    currentLocation: yup
        .string()
        .required("Required"),
    destinationType: yup
        .string()
        .required("Required"),
});

const initialValues = {
    id: undefined,
    licenseNumber: "",
    capacity: "",
    currentLocation: "N/A",
    destinationType: "",
    isInService: false,
};

const destinations = ["Home", "School", "None"];

export default function CreateBusForm() {
    const [status, setStatus] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const { getAuthToken } = useAuth();
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    const handleFormSubmit = async (values, { setSubmitting }) => {
        const authToken = await getAuthToken();
        const newBus = new BusDto(values.id,
            values.licenseNumber,
            values.capacity,
            values.currentLocation,
            values.destinationType,
            values.isInService);

        const result = await BusService.createBus(authToken, newBus);

        setSubmitting(false);

        if (result == null) {
            setStatus("Server is not responding");
            setAlertOpen(true);
            return;
        }

        if (result.isSuccess) {
            navigate("/buses");
            return;
        }

        setStatus(result.problemDetails.detail);
        setAlertOpen(true);
    };
    return (
        <Box>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={busSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <Box mt="40px" display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" width="50%">
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="License Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.licenseNumber}
                                name="licenseNumber"
                                error={!!touched.licenseNumber && !!errors.licenseNumber}
                                helperText={touched.licenseNumber && errors.licenseNumber}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Capacity"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.capacity}
                                name="capacity"
                                error={!!touched.capacity && !!errors.capacity}
                                helperText={touched.capacity && errors.capacity}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Current Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.currentLocation}
                                name="currentLocation"
                                error={!!touched.currentLocation && !!errors.currentLocation}
                                helperText={touched.currentLocation && errors.currentLocation}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                select
                                variant="filled"
                                type="text"
                                label="Destination Type"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.destinationType}
                                name="destinationType"
                                error={!!touched.destinationType && !!errors.destinationType}
                                helperText={touched.destinationType && errors.destinationType}
                                sx={{ gridColumn: "span 2" }} >
                                {destinations.map((option, index) => (
                                    <MenuItem key={index} value={index}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.isInService}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.isInService}
                                        name="isInService"
                                        color="secondary"
                                        size="medium" />}
                                label="Is In Service"
                                sx={{ gridColumn: "span 4" }} />

                            <Box mt="20px">
                                <Button type="submit" disabled={isSubmitting} color="info" variant="contained" size="large" startIcon={<AddIcon />} sx={{ flexGrow: 1, flexShrink: 1 }}>
                                    Create
                                </Button>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
            <AlertMessage
                open={alertOpen}
                onClose={handleClose}
                message={status}
                severity="error"
                duration={5000} />
        </Box>
    );
};