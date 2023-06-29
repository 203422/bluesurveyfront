import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import API_URL from "../auth/constants";
import Button from '../components/Button'
import '../assets/styles/login.css'

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
                setErrorMessage("");
                console.log("Sesión iniciada")
                
                const json = await response.json();

                if(json.body.accessToken && json.body.refreshToken) {
                    // console.log("Access Token", json.body.accessToken, "RefreshToken", json.body.refreshToken)
                    auth.saveUser(json)
                    goTo("/dashboard")
                }

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
        <form className="form container" onSubmit={handleSubmit}>
            <h2 className="title_login">Bienvenido de nuevo</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <label className="label">Correo</label>
            <input
                className="input"
                type="email"
                placeholder="correo@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label">Contraseña</label>
            <input
                className="input"
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                text="Iniciar Sesión"
                color="green"
                style="buttonForm"

            />
        </form>
    );
}

export default Login; 