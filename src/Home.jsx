import './assets/styles/home.css'
import Button from './components/Button'
import { useAuth } from './auth/AuthProvider';
import { Navigate } from 'react-router-dom';

const Home = () => {

    const auth = useAuth();

    if(auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    
    return (
        <div>
            <section className='container_title container'>
                <h1>Bienvenido a <span className='title_name'>BlueSurvey</span></h1>
            </section>

            <section className='container_content container'>

                <div className='content'>
                    <p className='p_description'>"Conéctate con tu audiencia, pregunta y ellos responden"</p>
                    <Button text='Iniciar Sesión' color='green' to="/login" />
                    <Button text='Registrarse' color='blue' to="/signup" />
                </div>
                <div className='container_content_img'>
                </div>
            </section>
        </div>
    );
}

export default Home;