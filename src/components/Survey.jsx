import { useState } from 'react';
import '../assets/styles/survey.css'
import API_URL from '../auth/constants';
import { useAuth } from '../auth/AuthProvider'; 

const Survey = ({ state, changeState, updateSurvey }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const auth = useAuth();

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
                    description
                })
            });

            if (response.ok) {
                const newSurvey = await response.json();
                updateSurvey( (surveys) => [...surveys, newSurvey])
                console.log('Encuesta creada correctamente');
                setTitle("")
                setDescription("")
                changeState(false)
            } else {
                console.log("La encuesta no se pudo crear");
            }

        } catch (error) {
            console.log(error)
        }
    }

    const toggleModal = () => {
        setTitle("");
        setDescription("")
        changeState(false)
    }

    return (
        <>
            {state &&
                <div className='overlay'>
                    <div className='container-content container'>
                        <form className='form_modal' onSubmit={handleSubmit}>
                            <label className='label_modal'>Nombre de la encuesta</label>
                            <input
                                className='input'
                                placeholder='Título'
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <label className='label_modal'>Descripcion</label>
                            <input
                                className='input'
                                placeholder="Descripcion"
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className='buttons_modal'>
                                <button className='aceptar button_modal' type='submit'>Aceptar</button>
                                <button className='cancelar button_modal' onClick={toggleModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default Survey;