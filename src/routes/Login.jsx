import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import API_URL from "../auth/constants";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    if(auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                console.log("Usuario creado correctamente")
                setErrorMessage("");
                console.log("Sesión iniciada")
                goTo("/dashboard")

            } else {
                console.log("Error Algo pasó")
                const errorData = await response.json();
                const messageError = errorData.body.error;
                setErrorMessage(messageError)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Bienvenido de nuevo</h2>
            {errorMessage && <p>{errorMessage}</p>} 
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