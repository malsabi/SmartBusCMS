import React, { useState } from "react";
import { Box, Button, FormControlLabel, MenuItem, Switch, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useAuth from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import AlertMessage from "../../../components/AlertMessage";
import StudentDto from "../../../DTOs/student/StudentDto";
import StudentService from "../../../services/StudentService";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DEFAULT_STUDENT_IMAGE } from "../../../consts/AppConsts";

const studentSchema = yup.object().shape({
    faceRecognitionID: yup
        .string()
        .required("Required"),
    image: yup
        .string()
        .required("Required"),
    firstName: yup
        .string()
        .required("Required"),
    lastName: yup
        .string()
        .required("Required"),
    gender: yup
        .string()
        .required("Required"),
    gradeLevel: yup
        .string()
        .required("Required"),
    address: yup
        .string()
        .required("Required"),
    belongsToBusID: yup
        .string()
        .required("Required"),
    lastSeen: yup
        .string()
        .required("Required"),
    parentID: yup
        .string()
        .required("Required")
});

const initialValues = {
    id: undefined,
    faceRecognitionID: "",
    image: DEFAULT_STUDENT_IMAGE,
    firstName: "",
    lastName: "",
    gender: "",
    gradeLevel: "",
    address: "",
    belongsToBusID: "",
    lastSeen: dayjs(),
    isAtSchool: false,
    isAtHome: true,
    isOnBus: false,
    parentID: "",
    busID: null,
};

export default function CreateStudentForm() {
    const [status, setStatus] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const { getAuthToken } = useAuth();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(DEFAULT_STUDENT_IMAGE);
    const theme = useTheme();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    const genders = [{
        value: "Male"
    },
    {
        value: "Female"
    }];

    const grades = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleFormSubmit = async (values, { setSubmitting }) => {
        const authToken = await getAuthToken();
        const newStudent = new StudentDto(values.id,
            values.faceRecognitionID,
            values.image,
            values.firstName,
            values.lastName,
            values.gender,
            values.gradeLevel,
            values.address,
            values.belongsToBusID,
            values.lastSeen,
            values.isAtSchool,
            values.isAtHome,
            values.isOnBus,
            values.parentID,
            values.busID);

        const result = await StudentService.createStudent(authToken, newStudent);

        setSubmitting(false);

        if (result == null) {
            setStatus("Server is not responding");
            setAlertOpen(true);
            return;
        }

        if (result.isSuccess) {
            navigate("/students");
            return;
        }

        setStatus(result.problemDetails.detail);
        setAlertOpen(true);
    };

    return (
        <Box>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={studentSchema}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <Box mt="40px" display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" width="50%">

                            <Button color="info" variant="contained" size="large" component="label" sx={{ gridColumn: "span 4" }}>
                                Upload Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (e) => {
                                                const base64Raw = e.target.result.split(",")[1];
                                                handleChange({
                                                    target: {
                                                        name: "image",
                                                        value: base64Raw,
                                                    },
                                                });
                                                setImagePreview(base64Raw);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }} />
                            </Button>

                            <Box sx={{ gridColumn: "span 4" }}>
                                <img
                                    src={`data:image/png;base64,${imagePreview}`}
                                    alt="Student Preview"
                                    style={{
                                        width: "auto",
                                        height: "170px",
                                        objectFit: "contain",
                                        borderRadius: "25%",
                                        border: `3px solid ${theme.palette.secondary.main}`,
                                    }} />
                            </Box>

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Image (Raw Base64 string)"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.image}
                                name="image"
                                error={!!touched.image && !!errors.image}
                                helperText={touched.image && errors.image}
                                sx={{ gridColumn: "span 2" }} />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="FaceRecognitionID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.faceRecognitionID}
                                name="faceRecognitionID"
                                error={!!touched.faceRecognitionID && !!errors.faceRecognitionID}
                                helperText={touched.faceRecognitionID && errors.faceRecognitionID}
                                sx={{ gridColumn: "span 2" }} />

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
                                select
                                variant="filled"
                                type="text"
                                label="Gender"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.gender}
                                name="gender"
                                error={!!touched.gender && !!errors.gender}
                                helperText={touched.gender && errors.gender}
                                sx={{ gridColumn: "span 2" }}>
                                {genders.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                fullWidth
                                select
                                variant="filled"
                                type="number"
                                label="Grade Level"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.gradeLevel}
                                name="gradeLevel"
                                error={!!touched.gradeLevel && !!errors.gradeLevel}
                                helperText={touched.gradeLevel && errors.gradeLevel}
                                sx={{ gridColumn: "span 2" }} >
                                {grades.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>

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
                                type="number"
                                label="BelongsToBusID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.belongsToBusID}
                                name="belongsToBusID"
                                error={!!touched.belongsToBusID && !!errors.belongsToBusID}
                                helperText={touched.belongsToBusID && errors.belongsToBusID}
                                sx={{ gridColumn: "span 2" }} />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Last Seen" 
                                    onChange={(date) => {
                                    handleChange({
                                        target: {
                                        name: "lastSeen",
                                        value: date,
                                        },
                                    });
                                    }} 
                                    value={values.lastSeen}
                                    sx={{ gridColumn: "span 2" }} />
                            </LocalizationProvider>

                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="ParentID"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.parentID}
                                name="parentID"
                                error={!!touched.parentID && !!errors.parentID}
                                helperText={touched.parentID && errors.parentID}
                                sx={{ gridColumn: "span 2" }} />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.isAtSchool}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.isAtSchool}
                                        name="isAtSchool"
                                        color="secondary"
                                        size="medium" />}
                                label="Is At School"
                                sx={{ gridColumn: "span 4" }} />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.isAtHome}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.isAtHome}
                                        name="isAtHome"
                                        color="secondary"
                                        size="medium" />}
                                label="Is At Home"
                                sx={{ gridColumn: "span 4" }} />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.isOnBus}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.isOnBus}
                                        name="isOnBus"
                                        color="secondary"
                                        size="medium" />}
                                label="Is On Bus"
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