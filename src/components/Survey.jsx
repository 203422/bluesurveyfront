import API_URL from '../auth/constants'
import { useAuth } from '../auth/AuthProvider'
import { useEffect, useState } from 'react';
import xmark from '../assets/img/xmark.svg'
import deleteIcon from '../assets/img/delete.svg'

const Survey = ({ id, closeSurvey, updateSurveys }) => {

    const [showSurvey, setShowSurvey] = useState({});


    const auth = useAuth();

    useEffect(() => {
        loadDataSurvey();
    }, [])

    const loadDataSurvey = async () => {
        const response = await fetch(`${API_URL}/surveys/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`
            }
        })

        if (response.ok) {
            const json = await response.json();
            setShowSurvey(json)
        }
    }

    const deleteSurvey = async () => {
        const response = await fetch(`${API_URL}/surveys/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`
            }
        })

        if (response.ok) {
            console.log('Encuesta eliminada')
            closeSurvey(null)
            updateSurveys();
        } else {
            console.log('Error al eliminar')
        }
    }

    return (
        <>
            <div className='overlay'>
                <div className='container_survey_pre container'>
                    <img onClick={() => closeSurvey(null)} className='xmark' src={xmark} />
                    <div className='survey_pre_header'>
                        <h2 className='title_survey'>{showSurvey.title}</h2>
                        <p className='description_survey'>{showSurvey.description}</p>
                    </div>
                    <div className='survey_pre_content'>
                        {showSurvey.questions && showSurvey.questions.map((question, id) => (
                            <div key={id}>
                                <div className='container_question'>
                                    <p className='question'>{question.question}</p>

                                    {question.type == "abierta" ? <div className='container_answer_open'>
                                        <p>Escribe una o varias palabras...</p>
                                    </div> : null}
                                    <ul>
                                        {question.answers && question.answers.map((answer, index) => (
                                            <li key={index}>{answer}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='survery_pre_footer' >
                        <button className='button_delete' onClick={deleteSurvey}>
                            <img src={deleteIcon} />
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Survey;