import { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext({
    isAuthenticated: false,
})

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return <AuthContext.Provider value={{ isAuthenticated }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
