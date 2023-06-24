import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = useAuth();
    if(auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <form>
            <h2>Bienvenido de nuevo</h2>
            <label>Correo</label>
            <input
                type="email"
                placeholder="correo@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Contraseña</label>
            <input
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Iniciar Sesión</button>
        </form>
    );
}

export default Login; 