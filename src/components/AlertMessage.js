import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function AlertMessage({ open, onClose, message, severity, duration }) {
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}