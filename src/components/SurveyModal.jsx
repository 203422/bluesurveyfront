import { useState, useEffect } from 'react';
import '../assets/styles/survey.css'
import { useAuth } from '../auth/AuthProvider';
import Question from '../routes/Question';
import { Toaster, toast } from 'react-hot-toast';


const Survey = ({ state, changeState, enableEditMode, survey, id, loadDataSurvey, updateSurvey }) => {

    const API_URL = import.meta.env.VITE_API_URL;
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [questions, setQuestions] = useState([])

    const auth = useAuth();

    useEffect(() => {
        if (enableEditMode) {
            setTitle(survey.title);
            setDescription(survey.description);
            setQuestions(survey.questions);
        } else {
            setTitle('');
            setDescription('');
            setQuestions([]);
        }
    }, [enableEditMode, survey]);

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
                toast.success('Encuesta creada')
                setTitle("")
                setDescription("")
                setQuestions([])
                setErrorMessage("")
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

    const sendUpdateSurvey = async () => {
        try {
            const response = await fetch(`${API_URL}/surveys/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    questions,
                })
            })
            if (response.ok) {
                toast.success('Encuesta actualizada')
                loadDataSurvey();
            }

        } catch (error) {
            console.log('Error al actualizar')
        }
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

                                    {
                                        enableEditMode ? <button type='button' className='aceptar button_modal' onClick={sendUpdateSurvey}>Actualizar encuesta</button> :
                                            <button className='aceptar button_modal' type='submit'>Aceptar</button>
                                    }



                                    <button type='button' className='cancelar button_modal' onClick={toggleModal}>Cancelar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: "1.6rem",
                        backgroundColor: "#fff"
                    }
                }}
            />
        </>
    );
}

export default Survey;