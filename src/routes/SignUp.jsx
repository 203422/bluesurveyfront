import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import '../assets/styles/form.css'
import Button from "../components/Button";
import Wave from "../layout/Wave";



const SignUp = () => {

    const API_URL = import.meta.env.VITE_API_URL;

    const [name, setName] = useState("");
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
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            if (response.ok) {
                console.log("Usuario creado correctamente")
                setErrorMessage("");
                goTo("/login")

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
        goTo('/login')
    }

    return (
        <>
            <Wave />
            <div className="form-container">
                <form className="container form" onSubmit={handleSubmit}>
                    <h2 className="title_signup">Sign Up</h2>
                    {errorMessage && <p className="alert">{errorMessage}</p>}
                    <label className="label">Nombre</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="label">Correo</label>
                    <input
                        className="input"
                        type="email"
                        placeholder="correo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="label">Contraseña</label>
                    <input
                        className="input"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <Button
                        color="green"
                        text="Registrarse"
                        style="buttonForm"
                    />
                    <p className="text-center">¿Ya tienes cuenta? <span className="span" onClick={handleClick}>Inicia Sesión</span> </p>
                </form>
            </div>

        </>




    );
}

export default SignUp; 