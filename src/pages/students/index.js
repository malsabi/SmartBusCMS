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
import StudentService from "../../services/StudentService";
import AlertMessage from "../../components/AlertMessage";

export default function Students() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "image",
            headerName: "Image",
            headerAlign: "left",
            align: "left",
            flex: 1,
            renderCell: (params) => <img alt="Student" src={`data:image/png;base64,${params.value}`} width="32" height="32" />,
            minWidth: 100,
        },
        {
            field: "faceRecognitionID",
            headerName: "Face RecognitionID",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
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
            field: "gender",
            headerName: "Gender",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "gradeLevel",
            headerName: "Grade Level",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "address",
            headerName: "Address",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "belongsToBusID",
            headerName: "Belongs To BusID",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "lastSeen",
            headerName: "Last Seen",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "isAtSchool",
            headerName: "IsAtSchool",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "isAtHome",
            headerName: "IsAtHome",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "isOnBus",
            headerName: "IsOnBus",
            headerAlign: "left",
            align: "left",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "parentID",
            headerName: "ParentID",
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
                    navigate(`/students/manage/${id}`, { state: { row } });
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
        async function fetchStudents() {
            const authToken = await getAuthToken();
            const result = await StudentService.getStudents(authToken);

            if (result == null) {
                setStatus("Server is not responding");
                setAlertOpen(true);
                setLoading(false);
                return;
            }

            if (result.isSuccess && !ignore) {
                const studentData = result.response.map((p) => ({
                    id: p.ID,
                    image: p.Image,
                    faceRecognitionID: p.FaceRecognitionID,
                    firstName: p.FirstName,
                    lastName: p.LastName,
                    gender: p.Gender,
                    gradeLevel: p.GradeLevel,
                    address: p.Address,
                    belongsToBusID: p.BelongsToBusID,
                    lastSeen: p.LastSeen,
                    isAtSchool: p.IsAtSchool,
                    isAtHome: p.IsAtHome,
                    isOnBus: p.IsOnBus,
                    parentID: p.ParentID,
                    busID: p.BusID,
                }));
                for (var i = 0; i < studentData.length; i++) {
                    studentData[i].busID = studentData[i].busID === null ? "N/A" : studentData[i].busID;
                }
                setData(studentData);
                setLoading(false);
            }
        };

        fetchStudents();

        return () => {
            ignore = true;
        };
    }, []);

    function handleCreateButton() {
        navigate("/students/create");
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <Box m="20px">
            <Header title="STUDENTS" subtitle="Managing the Students Members" />

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
                    loading={loading} />
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