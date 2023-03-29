import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { LOGIN_RESPONSE_KEY } from "../consts/AppConsts";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = React.useState(null);

    useEffect(() => {
        const getUserToken = async () => {
            try {
                const token = await Cookies.get(LOGIN_RESPONSE_KEY);
                if (token !== userToken) {
                    setUserToken(token);
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        getUserToken();
    }, [userToken]);

    async function handleLogin(token) {
        setUserToken(token);
        Cookies.set(LOGIN_RESPONSE_KEY, token);
    }

    async function handleLogout() {
        setUserToken(null);
        Cookies.remove(LOGIN_RESPONSE_KEY);
    }

    async function handleAuthToken()
    {
        if (Cookies.get(LOGIN_RESPONSE_KEY) !== undefined)
        {
            const jsonData = JSON.parse(Cookies.get(LOGIN_RESPONSE_KEY));
            return jsonData.authToken;
        }
        return null;
    }

    async function handleAdminInfo()
    {
        if (Cookies.get(LOGIN_RESPONSE_KEY) !== undefined)
        {
            const jsonData = JSON.parse(Cookies.get(LOGIN_RESPONSE_KEY));
            return jsonData.adminDto;
        }
        return null;
    }

    const value = {
        userToken,
        getAuthToken: handleAuthToken,
        getAdminInfo: handleAdminInfo,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return React.useContext(AuthContext);
};