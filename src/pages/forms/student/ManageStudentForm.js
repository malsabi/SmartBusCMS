import React, { useState, useMemo } from "react";
import { Box, Button, FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useAuth from "../../../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertMessage from "../../../components/AlertMessage";
import StudentService from "../../../services/StudentService";
import { useNavigate } from "react-router-dom";
import StudentDto from "../../../DTOs/student/StudentDto";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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

export default function ManageStudentForm({ id, data }) {
    const [status, setStatus] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const { getAuthToken } = useAuth();
    const navigate = useNavigate();

    const initialValues = useMemo(() => {
        const lastSeenValue = data.lastSeen === '0001-01-01T00:00:00' ? dayjs() : dayjs(data.lastSeen);
        return {
          id: data.id,
          faceRecognitionID: data.faceRecognitionID,
          image: data.image,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          gradeLevel: data.gradeLevel,
          address: data.address,
          belongsToBusID: data.belongsToBusID,
          lastSeen: lastSeenValue,
          isAtSchool: data.isAtSchool,
          isAtHome: data.isAtHome,
          isOnBus: data.isOnBus,
          parentID: data.parentID,
          busID: data.busID,
        };
      }, [data]);

    const genders = [{
        value: "Male"
    },
    {
        value: "Female"
    }];

    const grades = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    const handleFormSubmit = async (values, { setSubmitting }) => {
        const authToken = await getAuthToken();
        const updatedStudent = new StudentDto(values.id,
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
        
        if (updatedStudent.busID === "N/A")
        {
            updatedStudent.busID = null;
        }
        const result = await StudentService.updateStudent(authToken, id, updatedStudent);
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

    const handleDelete = async () => {
        const authToken = await getAuthToken();
        const result = await StudentService.deleteStudent(authToken, id);

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
                                <DateTimePicker label="Last Seen" onChange={handleChange} variant="filled" value={values.lastSeen} sx={{ gridColumn: "span 2" }} />
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