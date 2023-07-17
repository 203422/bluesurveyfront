import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import Button from '../components/Button'
import Wave from '../layout/Wave'


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
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

                if (json.body.accessToken && json.body.refreshToken) {
                    console.log(json)
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

    const handleClick = () => {
        goTo('/signup')
    }

    return (
        <>
            <Wave />
            <div className="form-container">
                <form className="form container" onSubmit={handleSubmit}>
                    <h2 className="title_login">Bienvenido de nuevo</h2>
                    {errorMessage && <p className="alert">{errorMessage}</p>}
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
                    <p className="text-center">¿Aún no tienes cuenta? <span className="span" onClick={handleClick}>Registrate</span> </p>
                </form>
            </div>
        </>
    );
}

export default Login; 