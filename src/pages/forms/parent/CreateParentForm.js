import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useAuth from "../../../context/AuthContext";
import ParentDto from "../../../DTOs/parent/ParentDto";
import { useNavigate } from "react-router-dom";
import ParentService from "../../../services/ParentService";
import AddIcon from '@mui/icons-material/Add';
import AlertMessage from "../../../components/AlertMessage";

const parentSchema = yup.object().shape({
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
    phoneNumber: yup
        .string()
        .required("Required"),
    address: yup
        .string()
        .required("Required"),
    password: yup
        .string()
        .required("Required")
});

const initialValues = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
};

export default function CreateParentForm() {
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
        const newParent = new ParentDto(values.id, values.firstName, values.lastName, values.email, values.phoneNumber, values.address, values.password);
        console.log("new parent: ", newParent);
        const result = await ParentService.createParent(authToken, newParent);

        setSubmitting(false);

        if (result == null) {
            setStatus("Server is not responding");
            setAlertOpen(true);
            return;
        }

        if (result.isSuccess) {
            navigate("/parents");
            return;
        }

        setStatus(result.problemDetails.detail);
        setAlertOpen(true);
    };
    return (
        <Box>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={parentSchema}>
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
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
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