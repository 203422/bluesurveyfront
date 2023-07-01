import { Link, json } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import API_URL from '../auth/constants';
import '../assets/styles/header.css'

const Header = ({ children }) => {

    const auth = useAuth();

    const handleSignout = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${API_URL}/signout`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${auth.getRefreshToken()}`
                }
            })

            if(response.ok) {
                auth.signOut();
            }

        } catch (error) {
            
        }
    }
    return (
        <>
            <header className="header">
                <nav className="nav">
                    <ul className="ul">
                        <li className="li">
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                    <li className="li">
                        <Link to="/me">Perfil</Link>
                    </li>
                    <li className="li">
                        <a href="#" onClick={handleSignout}>Salir</a>
                    </li>
                </nav>
            </header>
        </>
    )
}

export default Header;