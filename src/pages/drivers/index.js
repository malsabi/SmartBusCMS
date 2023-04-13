import "./index.css";
import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useAuth from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import AlertMessage from "../../components/AlertMessage";
import DriverService from "../../services/DriverService";

export default function Drivers() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const columns = [
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "firstName",
            headerName: "First Name",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "lastName",
            headerName: "Last Name",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "email",
            headerName: "Email Address",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "driverID",
            headerName: "Driver ID",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "country",
            headerName: "Country",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "password",
            headerName: "Password",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "busID",
            headerName: "BusID",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: ({ row }) => {
                const navigate = useNavigate();
                const handleEdit = () => {
                    const id = row.id;
                    navigate(`/drivers/manage/${id}`, { state: { row } });
                };
                return (
                    <Button onClick={handleEdit} size="large" color="success" variant="contained" startIcon={<ManageAccountsIcon />}>
                        Manage
                    </Button>
                );
            },
            minWidth: 100,
        },
    ];

    const { getAuthToken } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        let ignore = false;
        async function fetchDrivers() {
            const authToken = await getAuthToken();
            const result = await DriverService.getDrivers(authToken);

            if (result == null) {
                setStatus("Server is not responding");
                setAlertOpen(true);
                setLoading(false);
                return;
            }

            if (result.isSuccess && !ignore) {
                const driverData = result.response.map((p) => ({
                    id: p.ID,
                    firstName: p.FirstName,
                    lastName: p.LastName,
                    email: p.Email,
                    driverID: p.DriverID,
                    phoneNumber: p.PhoneNumber,
                    country: p.Country,
                    password: p.Password,
                    busID: p.BusID
                }));
                for (var i = 0; i < driverData.length; i++)
                {
                    if (driverData[i].busID === null)
                    {
                        driverData[i].busID = "";
                    }
                }

                console.log("driverData", driverData);
                setData(driverData);
                setLoading(false);
            }
        };

        fetchDrivers();

        return () => {
            ignore = true;
        };
    }, []);

    function handleCreateButton() {
        navigate("/drivers/create");
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <Box m="20px">
            <Header title="BUS DRIVERS" subtitle="Managing the Bus Driver Members" />

            <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Button color="secondary" size="large" variant="contained" startIcon={<AddIcon />} sx={{ fontSize: 18 }} onClick={handleCreateButton}>
                    Create
                </Button>
            </Box>

            <Box m="40px 0 0 0"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                    "& .MuiLinearProgress-colorPrimary": {
                        backgroundColor: `${colors.grey[100]} !important`,
                    },
                    "& .MuiLinearProgress-barColorPrimary": {
                        backgroundColor: `${colors.greenAccent[500]} !important`,
                    },
                }}
                className="box">
                <DataGrid 
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 15,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick 
                    slots={{
                        loadingOverlay: LinearProgress,
                        toolbar: GridToolbar
                    }}
                    loading={loading}/>
            </Box>
            <AlertMessage
                open={alertOpen}
                onClose={handleClose}
                message={status}
                severity="error"
                duration={5000} />
        </Box>
    );
};