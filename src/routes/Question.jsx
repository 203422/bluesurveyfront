import React, { useState } from "react";
import '../assets/styles/question.css'
import editIcon from '../assets/img/edit.svg'
import deleteIcon from '../assets/img/delete.svg'
import { toast } from 'react-hot-toast';


const Question = ({ questions, setQuestions }) => {
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentQuestionType, setCurrentQuestionType] = useState("");
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

    const handleAddQuestion = () => {
        const newQuestion = {
            question: currentQuestion,
            type: currentQuestionType,
            answers: currentAnswers
        };

        if (editMode) {
            const updatedQuestions = [...questions];
            updatedQuestions[selectedQuestionIndex] = newQuestion;
            setQuestions(updatedQuestions);
            setSelectedQuestionIndex(null);
            setEditMode(false);
            toast.success('Cambios guardados')
        } else {
            setQuestions([...questions, newQuestion]);
            toast.success('Pregunta agregada')
        }

        setCurrentQuestion("");
        setCurrentQuestionType("");
        setCurrentAnswers([]);

    };

    const handleAnswerChange = (index, event) => {
        const updatedAnswers = [...currentAnswers];
        updatedAnswers[index] = event.target.value;
        setCurrentAnswers(updatedAnswers);
    };

    const handleEditQuestion = (index) => {
        const selectedQuestion = questions[index];
        setCurrentQuestion(selectedQuestion.question);
        setCurrentQuestionType(selectedQuestion.type);
        setCurrentAnswers(selectedQuestion.answers);
        setSelectedQuestionIndex(index);
        setEditMode(true);
    };

    const handleDeleteQuestion = (index) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
        
        toast.success('Pregunta eliminada')
    }

    const renderAnswerInputs = () => {
        if (currentQuestionType === "opción unica" || currentQuestionType === "opción multiple") {
            return (
                <div className="container_add_answer">
                    <label className="label">Respuestas:</label>
                    {currentAnswers.map((answer, index) => (
                        <input
                            className="input"
                            type="text"
                            key={index}
                            value={answer}
                            onChange={(e) => handleAnswerChange(index, e)}
                            placeholder={`Respuesta ${index + 1}`}
                        />
                    ))}
                    <button onClick={addAnswer} type="button" className="button add_question">Agregar respuesta</button>
                </div>
            );
        }
        return null;
    };

    const addAnswer = () => {
        setCurrentAnswers([...currentAnswers, ""]);
    };

    const handleCancelEdit = () => {
        setCurrentQuestion("");
        setCurrentQuestionType("");
        setCurrentAnswers([]);
        setSelectedQuestionIndex(null);
        setEditMode(false);
    };

    return (
        <>

            <div className="container_create_question">
                <label className="label">Pregunta</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Escribe tu pregunta..."
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                />

                <div className="container_type_question">
                    <label className="label">Tipo de pregunta</label>
                    <select
                        className="select button"
                        value={currentQuestionType}
                        onChange={(e) => setCurrentQuestionType(e.target.value)}
                    >
                        <option value="">Tipo de pregunta</option>
                        <option value="abierta">Pregunta abierta</option>
                        <option value="opción unica">Opción única</option>
                        <option value="opción multiple">Opción múltiple</option>
                    </select>
                    <button className="button_add_question aceptar button" type="button" onClick={handleAddQuestion}>
                        {editMode ? "Guardar cambios" : "Agregar pregunta"}
                    </button>
                    {editMode && (
                        <button type="button" className="button" onClick={handleCancelEdit}>
                            Cancelar
                        </button>
                    )}
                </div>
            </div>


            <div className="content_questions">

                {renderAnswerInputs()}
                {questions.map((question, index) => (
                    <div key={index} className="container_question">
                        <p>Tipo de pregunta: {question.type}</p>
                        <p>Pregunta: {question.question}</p>
                        <p>Respuestas:</p>
                        <ul>
                            {question.answers.map((answer, answerIndex) => (
                                <li key={answerIndex}>{answer}</li>
                            ))}
                        </ul>
                        {!editMode && (
                            <div className="container_icons_question">
                                <button className="button_edit" type="button">
                                    <img src={editIcon} onClick={() => handleEditQuestion(index)} />
                                </button>
                                <button className="button_delete" type="button">
                                    <img src={deleteIcon} onClick={() => handleDeleteQuestion(index)} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </>
    );
};

export default Question;
