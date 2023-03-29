import React, { useState, useEffect } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useAuth from "../../context/AuthContext";
import ParentService from "../../services/ParentService";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Parents() {
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
            field: "phoneNumber",
            headerName: "Phone Number",
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
            field: "password",
            headerName: "Password",
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
                    navigate(`/parents/manage/${id}`, { state: { row } });
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

    useEffect(() => {
        let ignore = false;
        async function fetchParents() {
            const authToken = await getAuthToken();
            const result = await ParentService.getParents(authToken);
            if (result.isSuccess && !ignore) {
                const parentData = result.response.map((p) => ({
                    id: p.ID,
                    firstName: p.FirstName,
                    lastName: p.LastName,
                    email: p.Email,
                    phoneNumber: p.PhoneNumber,
                    address: p.Address,
                    password: p.Password,
                }));
                setData(parentData);
            }
        };

        fetchParents();

        return () => {
            ignore = true;
        };
    }, []);

    function handleCreateButton() {
        navigate("/parents/create");
    }

    return (
        <Box m="20px">
            <Header title="PARENTS" subtitle="Managing the Parents Members" />

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
                }}
                className="box">
                <DataGrid rows={data}
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
                    disableRowSelectionOnClick />
            </Box>
        </Box>
    );
};