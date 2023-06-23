import './assets/styles/home.css'
import Button from './components/Button'

const Home = () => {
    return (
        <div>
            <section className='container_title container'>
                <h1>Bienvenido a <span className='title_name'>BlueSurvey</span></h1>
            </section>

            <section className='container_content container'>

                <div className='content'>
                    <p className='p_description'>"Conéctate con tu audiencia, pregunta y ellos responden"</p>
                    <Button text='Iniciar Sesión' color='green' />
                    <Button text='Registrarse' color='blue' />
                </div>
                <div className='container_content_img'>
                </div>
            </section>
        </div>
    );
}

export default Home;