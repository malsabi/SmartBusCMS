import "./index.css"
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BingMapsReact from "bingmaps-react"
import useAuth from "../../context/AuthContext";
import BusService from "../../services/BusService";
import AlertMessage from "../../components/AlertMessage";

export default function LiveTracking() {

    const { getAuthToken } = useAuth();
    const [pushPins, setPushPins] = useState([]);
    const [status, setStatus] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        const timerId = setTimeout(async () => {
            const currentPushPins = [];
            const authToken = await getAuthToken();
            const result = await new BusService().getBuses(authToken);

            if (result == null) {
                setStatus("Server is not responding");
                setAlertOpen(true);
                return;
            }

            if (result.isSuccess) {
                for (var i = 0; i < result.response.length; i++) 
                {
                    const bus = result.response[i];
                    if (bus.IsInService && bus.CurrentLocation) {
                        const lon = bus.CurrentLocation.split("|")[0];
                        const lat = bus.CurrentLocation.split("|")[1];
                        currentPushPins.push({
                            center: {
                                longitude: lon,
                                latitude: lat
                            },
                            options: {
                                title: `Bus ID(${bus.ID})`
                            }
                        });
                    }
                }
            }
            setPushPins(currentPushPins);
        }, 3000);
        return () => clearTimeout(timerId);
    }, [getAuthToken]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <Box m="20px">
            <Header title="LIVE MAP TRACKING" subtitle="Tracks all bus vehicles" />
            <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                <BingMapsReact
                    bingMapsKey="MB5JgYFBR6Do4sbOBKKb~8w2jQwZixHLZlJCtmur0Dw~AoPVZ0u1expsY19vucXpk58YX-bcjiQIkO-ZPi5RNIfAgQ0JOiUgvhPCKZXbjgrz"
                    pushPins={pushPins}
                    height="70vh"
                    mapOptions={{
                        navigationBarMode: "square",
                    }}
                    width="100%"
                    viewOptions={{
                        center: { latitude: 25.276987, longitude: 55.296249 },
                        mapTypeId: "canvasLight",
                        zoom: 8,
                    }} />
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