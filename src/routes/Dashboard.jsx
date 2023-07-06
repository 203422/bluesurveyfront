import { useAuth } from '../auth/AuthProvider'
import API_URL from '../auth/constants'
import { useEffect, useState } from 'react'
import '../assets/styles/dashboard.css'
import Header from '../layout/Header'
import SurveyModal from '../components/SurveyModal'
import Survey from '../components/Survey'
import createIcon from '../assets/img/createW.svg'

const Dashboard = () => {

    const [stateModal, setStateModal] = useState(false)
    const [surveys, setSurveys] = useState([])
    const [selectedSurvey, setSelectedSurvey] = useState(null);


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



            <div className='container'>
                {/* <h1>Dashboard de {auth.getUser().name}</h1> */}
                <button className='crear_encuesta' onClick={() => setStateModal(!stateModal)}>
                    Crear encuesta
                    <img src={createIcon} className='icon_create' />
                </button>
                <div className="container_surveys">

                    {surveys.map((survey) => (<div onClick={() => setSelectedSurvey(survey._id)} className="container_survey" key={survey._id}>
                        <div className='container_survey_header'>
                            <div className='icons'>

                            </div>
                            {survey.title}
                        </div>
                        <div className='container_survey_footer'>
                            Preguntas: {survey.questions.length}
                        </div>

                    </div>))}

                    {selectedSurvey && <Survey
                        id={selectedSurvey}
                        closeSurvey={setSelectedSurvey}
                        updateSurveys={loadSurveys}
                    />}

                </div>
                <SurveyModal
                    state={stateModal}
                    changeState={setStateModal}
                    updateSurvey={setSurveys}
                />


            </div>




        </>
    );
}

export default Dashboard; 