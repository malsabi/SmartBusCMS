import React, { useState, useMemo } from "react";
import { Box, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useAuth from "../../../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertMessage from "../../../components/AlertMessage";
import { useNavigate } from "react-router-dom";
import NotificationDto from "../../../DTOs/notification/NotificationDto";
import NotificationService from "../../../services/NotificationService";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const notificationSchema = yup.object().shape({
    title: yup
        .string()
        .required("Required"),
    message: yup
        .string()
        .required("Required"),
    timestamp: yup
        .string()
        .required("Required"),
});

export default function ManageNotificationForm({ id, data }) {
    const [status, setStatus] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const { getAuthToken } = useAuth();
    const navigate = useNavigate();

    const initialValues = useMemo(() => {
        return {
            id: data.id,
            title: data.title,
            message: data.message,
            timestamp: dayjs(data.timestamp),
            isOpened: data.isOpened,
            parentID: data.parentID,
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
        
        const updatedNotification = new NotificationDto(values.id,
            values.title,
            values.message,
            values.timestamp,
            values.isOpened,
            values.parentID,
            values.busID);

        if (updatedNotification.parentID === "N/A")
        {
            updatedNotification.parentID = undefined;
        }
        else if (updatedNotification.busID === "N/A")
        {
            updatedNotification.busID = undefined;
        }    

        const result = await NotificationService.updateNotification(authToken, id, updatedNotification);

        setSubmitting(false);

        if (result == null) {
            setStatus("Server is not responding");
            setAlertOpen(true);
            return;
        }

        if (result.isSuccess) {
            navigate("/notifications");
            return;
        }

        setStatus(result.problemDetails.detail);
        setAlertOpen(true);
    };

    const handleDelete = async () => {
        const authToken = await getAuthToken();
        const result = await NotificationService.deleteNotification(authToken, id);

        if (result == null) {
            setStatus("Server is not responding");
            setAlertOpen(true);
            return;
        }

        if (result.isSuccess) {
            navigate("/notifications");
            return;
        }

        setStatus(result.problemDetails.detail);
        setAlertOpen(true);
    };

    return (
        <Box>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={notificationSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <Box mt="40px" display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" width="50%">
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Title"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.title}
                                name="title"
                                error={!!touched.title && !!errors.title}
                                helperText={touched.title && errors.title}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Message"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.message}
                                name="message"
                                error={!!touched.message && !!errors.message}
                                helperText={touched.message && errors.message}
                                sx={{ gridColumn: "span 2" }} />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Timestamp" 
                                    onChange={(date) => {
                                    handleChange({
                                        target: {
                                        name: "timestamp",
                                        value: date,
                                        },
                                    });
                                    }} 
                                    value={values.timestamp}
                                    sx={{ gridColumn: "span 2" }} />
                            </LocalizationProvider>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.isOpened}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.isOpened}
                                        name="isOpened"
                                        color="secondary"
                                        size="medium" />}
                                label="Is Opened"
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