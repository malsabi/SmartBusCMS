import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import AuthService from "../../services/AuthService";
import AlertMessage from "../../components/AlertMessage";
import useAuth from "../../context/AuthContext";
import LoginAdminResponseDto from "../../DTOs/LoginAdminResponseDto";

const initialValues = {
    emailAddress: "",
    password: "",
};

const adminSchema = yup.object().shape({
    emailAddress: yup
        .string()
        .email("Invalid email address")
        .required("required"),
    password: yup
        .string()
        .required("required")
});

export default function LoginForm() {
    const [status, setStatus] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const { onLogin } = useAuth();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    const handleFormSubmit = async (values, { setSubmitting }) => {
        const emailAddress = values.emailAddress;
        const password = values.password;

        const result = await AuthService.login(emailAddress, password);

        setSubmitting(false);

        if (result == null) {
            setStatus("Server is not responding");
            setAlertOpen(true);
            return;
        }

        if (result.isSuccess) {
            const loginResponse = new LoginAdminResponseDto(result.response.AdminDto, result.response.AuthToken);
            onLogin(JSON.stringify(loginResponse));
            return;
        }

        setStatus(result.problemDetails.detail);
        setAlertOpen(true);
    };

    return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="90%">
        <Box alignItems="flex-start">
            <Header title="Smart-Bus Admin Login" subtitle="Admin authentication" />
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={adminSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeat(5, minmax(0, 1fr))">
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.emailAddress}
                                name="emailAddress"
                                error={!!touched.emailAddress && !!errors.emailAddress}
                                helperText={touched.emailAddress && errors.emailAddress}
                                sx={{ gridColumn: "span 5" }} />

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
                                sx={{ gridColumn: "span 5" }} />

                            <Box mt="20px">
                                <Button type="submit" disabled={isSubmitting} color="secondary" variant="contained" size="large">
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
        <AlertMessage
            open={alertOpen}
            onClose={handleClose}
            message={status}
            severity="error"
            duration={5000}
        />
    </Box>
};