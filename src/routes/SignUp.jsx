import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import API_URL from "../auth/constants";

const SignUp = () => {

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

    return (

        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {errorMessage && <p>{errorMessage}</p>} 
            <label>Nombre</label>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>Correo</label>
            <input
                type="email"
                placeholder="correo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label>Contraseña</label>
            <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />
            <button>Registrarse</button>
        </form>

    );
}

export default SignUp; 