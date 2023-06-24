import { useState } from "react";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <form>
            <h2>Sign Up</h2>
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
                onChange={(e) => setPassword(e.target.vale)}

            />
            <button>Registrarse</button>
        </form>

    );
}

export default SignUp; 