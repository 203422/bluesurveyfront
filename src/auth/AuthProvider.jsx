import { useContext, createContext, useState, useEffect } from 'react'
import API_URL from "../auth/constants";

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => { },
    saveUser: () => { },
    getRefreshToken: () => { }, 
    getUser: () => {}
})

const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState("")
    const [user, setUser] = useState("")

    const requestNewAccessToken = async (refreshToken) => {
        try {
            const response = await fetch(`${API_URL}/refresh-token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if (response.ok) {
                const json = await response.json();
                return json.body.accessToken;
            }

        } catch (error) {
            console.log(error)
            return null;
        }
    }

    const getUserInfo = async (accessToken) => {
        try {
            const response = await fetch(`${API_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const json = await response.json();
                return json.body;
            } else {
                throw new Error(response.statusText)
            }

        } catch (error) {
            console.log(error)
            return null;
        }
    }

    const checkAuth = async () => {
        if (accessToken) {
            //El usuario está autenticado
        } else {
            //El usuario no está autenticado
            const token = getRefreshToken();
            if (token) {
                const newAccessToken = await requestNewAccessToken(token);
                if (newAccessToken) {
                    const userInfo = await getUserInfo(newAccessToken);
                    console.log('INfo en el checku', userInfo)
                    if(userInfo) {
                        saveSessionInfo(userInfo, newAccessToken, token)
                    }
                }
            }
        }
    }
    
    const saveSessionInfo = (userInfo, accessToken, refreshToken) => {
        setAccessToken(accessToken);
        localStorage.setItem("token", JSON.stringify(refreshToken));
        setIsAuthenticated(true);
        setUser(userInfo)
    }

    const getAccessToken = () => {
        return accessToken;
    }

    const getRefreshToken = () => {
        const tokenData = localStorage.getItem("token")
        if (tokenData) {
            const token = JSON.parse(tokenData)
            return token;
        }
        return null;
    }

    const saveUser = (userData) => {
        saveSessionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken)
    }

    const getUser = () => {
        return user;
    }

    useEffect(() => {
        checkAuth();
     }, []);


    return <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
