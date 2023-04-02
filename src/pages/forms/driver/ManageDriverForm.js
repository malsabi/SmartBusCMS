import React, { useState, useMemo } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useAuth from "../../../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertMessage from "../../../components/AlertMessage";
import { useNavigate } from "react-router-dom";
import BusDriverDto from "../../../DTOs/driver/BusDriverDto";
import DriverService from "../../../services/DriverService";

const driverSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("Required"),
    lastName: yup
        .string()
        .required("Required"),
    email: yup
        .string()
        .email("Invalid Email Address")
        .required("Required"),
    driverID: yup
        .string()
        .required("Required"),
    phoneNumber: yup
        .string()
        .required("Required"),
    country: yup
        .string()
        .required("Required"),
    password: yup
        .string()
        .required("Required"),
});

export default function ManageDriverForm({ id, data }) {
    const [status, setStatus] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const { getAuthToken } = useAuth();
    const navigate = useNavigate();

    const initialValues = useMemo(() => {
        return {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            driverID: data.driverID,
            phoneNumber: data.phoneNumber,
            country: data.country,
            password: data.password,
            busID: data.busID,
        };
    }, [data]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    const handleFormSubmit = async (values, { setSubmitting }) => {
        const authToken = await getAuthToken();

        const updatedDriver = new BusDriverDto(values.id, 
            values.firstName, 
            values.lastName, 
            values.email,
            values.driverID,
            values.phoneNumber, 
            values.country, 
            values.password,
            values.busID);
        
        if (updatedDriver.busID === "")
        {
            updatedDriver.busID = null;
        }

        const result = await DriverService.updateDriver(authToken, id, updatedDriver);

        setSubmitting(false);

        if (result == null) {
            setStatus("Server is not responding");
            setAlertOpen(true);
            return;
        }

        if (result.isSuccess) {
            navigate("/drivers");
            return;
        }

        setStatus(result.problemDetails.detail);
        setAlertOpen(true);
    };

    const handleDelete = async () => {
        const authToken = await getAuthToken();
        const result = await DriverService.deleteDriver(authToken, id);

        if (result == null) {
            setStatus("Server is not responding");
            setAlertOpen(true);
            return;
        }

        if (result.isSuccess) {
            navigate("/drivers");
            return;
        }

        setStatus(result.problemDetails.detail);
        setAlertOpen(true);
    };

    return (
        <Box>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={driverSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <Box mt="40px" display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" width="50%">
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Driver ID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.driverID}
                                name="driverID"
                                error={!!touched.driverID && !!errors.driverID}
                                helperText={touched.driverID && errors.driverID}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Phone Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.phoneNumber}
                                name="phoneNumber"
                                error={!!touched.phoneNumber && !!errors.phoneNumber}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Country"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.country}
                                name="country"
                                error={!!touched.country && !!errors.country}
                                helperText={touched.country && errors.country}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="BusID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.busID}
                                name="busID"
                                error={!!touched.busID && !!errors.busID}
                                helperText={touched.busID && errors.busID}
                                sx={{ gridColumn: "span 2" }} />

                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Button type="submit" disabled={isSubmitting} color="info" variant="contained" size="large" startIcon={<EditIcon />} sx={{ flexGrow: 1, flexShrink: 1 }}>
                                    Edit
                                </Button>
                                <Button type="button" disabled={isSubmitting} color="error" variant="contained" size="large" startIcon={<DeleteIcon />} sx={{ flexGrow: 1, flexShrink: 1 }} onClick={handleDelete}>
                                    Delete
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