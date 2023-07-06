import { useState } from 'react';
import '../assets/styles/survey.css'
import API_URL from '../auth/constants';
import { useAuth } from '../auth/AuthProvider';
import Question from '../routes/Question';

const Survey = ({ state, changeState, updateSurvey }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [questions, setQuestions] = useState([])

    const auth = useAuth();

    const handleUpdateQuestions = (newQuestions) => {
        setQuestions(newQuestions);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`${API_URL}/surveys`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    questions,

                })
            });

            if (response.ok) {
                const newSurvey = await response.json();
                updateSurvey((surveys) => [...surveys, newSurvey])
                console.log('Encuesta creada correctamente');
                setTitle("")
                setDescription("")
                setQuestions([])
                changeState(false)
            } else {
                console.log("La encuesta no se pudo crear");
                const errorData = await response.json()
                const messageError = errorData.body.error;
                setErrorMessage(messageError)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const toggleModal = () => {
        setTitle("");
        setDescription("")
        setErrorMessage("")
        setQuestions([])
        changeState(false)
    }


    return (
        <>
            {state &&
                <div className='overlay'>
                    <div className='container_modal container'>
                        <form className='form_modal' onSubmit={handleSubmit}>
                            <div className='header_modal'>
                                {errorMessage && <p className="alert">{errorMessage}</p>}
                                <label className='label'>Nombre de la encuesta</label>
                                <input
                                    className='input'
                                    placeholder='Título'
                                    type='text'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <label className='label'>Descripcion</label>
                                <input
                                    className='input'
                                    placeholder="Descripcion"
                                    type='text'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className='content_modal'>
                                <Question
                                    questions={questions}
                                    setQuestions={handleUpdateQuestions}
                                    
                                />

                            </div>

                            <div className='footer_modal'>
                                <div className='buttons_modal'>
                                    <button className='aceptar button_modal' type='submit'>Aceptar</button>
                                    <button type='button' className='cancelar button_modal' onClick={toggleModal}>Cancelar</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default Survey;