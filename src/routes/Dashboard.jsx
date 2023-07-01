import { useAuth } from '../auth/AuthProvider'
import API_URL from '../auth/constants'
import { useEffect, useState } from 'react'
import '../assets/styles/dashboard.css'
import Header from '../layout/Header'
import Survey from '../components/Survey'

const Dashboard = () => {

    const [stateModal, setStateModal] = useState(false)
    const [surveys, setSurveys] = useState([])

    const auth = useAuth();

    useEffect(() => {
        loadSurveys();
    }, [])

    const loadSurveys = async () => {
        try {
            const response = await fetch(`${API_URL}/surveys`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                }
            })

            if (response.ok) {
                const json = await response.json();
                setSurveys(json)
            } else {
                console.log('Error en la conexion')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />

            <h1>Dashboard de {auth.getUser().name}</h1>

            <div className='container container_surveys'>
                <Survey
                    state={stateModal}
                    changeState={setStateModal}
                    updateSurvey = {setSurveys}
                />
                <button onClick={() => setStateModal(!stateModal)}>Crear encuesta</button>
            </div>

            {surveys.map((survey) => (<div key={survey._id}>{survey.title}</div>))}

        </>
    );
}

export default Dashboard; 