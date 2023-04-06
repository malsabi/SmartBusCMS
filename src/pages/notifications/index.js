import "./index.css";
import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useAuth from "../../context/AuthContext";
import NotificationService from "../../services/NotificationService";
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import AlertMessage from "../../components/AlertMessage";

export default function Notifications() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const columns = [
        {
            field: "id",
            headerName: "ID"
        },
        {
            field: "title",
            headerName: "Title",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "message",
            headerName: "Message",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "timestamp",
            headerName: "Timestamp",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "isOpened",
            headerName: "Is Opened",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "parentID",
            headerName: "Parent ID",
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
                    navigate(`/notifications/manage/${id}`, { state: { row } });
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
        async function fetchNotifications() {
            const authToken = await getAuthToken();
            const result = await NotificationService.getNotifications(authToken);

            if (result == null) {
                setStatus("Server is not responding");
                setAlertOpen(true);
                setLoading(false);
                return;
            }

            if (result.isSuccess && !ignore) {
                const notificationData = result.response.map((p) => ({
                    id: p.ID,
                    title: p.Title,
                    message: p.Message,
                    timestamp: p.Timestamp,
                    isOpened: p.IsOpened,
                    parentID: p.ParentID,
                    busID: p.BusID,
                }));

                for (var i = 0; i < notificationData.length; i++)
                {
                    if (!notificationData[i].parentID)
                    {
                        notificationData[i].parentID = "N/A";
                    }
                    if (!notificationData[i].busID)
                    {
                        notificationData[i].busID = "N/A";
                    }
                }

                setData(notificationData);
                setLoading(false);
            }
        };

        fetchNotifications();

        return () => {
            ignore = true;
        };
    }, []);

    function handleCreateButton() {
        navigate("/notifications/create");
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <Box m="20px">
            <Header title="NOTIFICATIONS" subtitle="Managing the Parent and Bus Notifications" />

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
                                pageSize: 5,
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