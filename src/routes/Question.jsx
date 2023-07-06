import React, { useState } from "react";

const Question = ({questions, setQuestions}) => {
    // const [questions, setQuestions] = useState([]);
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
        } else {
            setQuestions([...questions, newQuestion]);
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

    const renderAnswerInputs = () => {
        if (currentQuestionType === "opción unica" || currentQuestionType === "opción multiple") {
            return (
                <div>
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
                    <button onClick={addAnswer} type="button">Agregar respuesta</button>
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

            <div>
                <label className="label">Pregunta</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Escribe tu pregunta..."
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                />

                <label className="label">Tipo de pregunta</label>
                <select
                    value={currentQuestionType}
                    onChange={(e) => setCurrentQuestionType(e.target.value)}
                >
                    <option value="">Tipo de pregunta</option>
                    <option value="abierta">Pregunta abierta</option>
                    <option value="opción unica">Opción única</option>
                    <option value="opción multiple">Opción múltiple</option>
                </select>

                <button className="button_modal aceptar" type="button" onClick={handleAddQuestion}>
                    {editMode ? "Guardar cambios" : "Agregar pregunta"}
                </button>
                {editMode && (
                    <button type="button" onClick={handleCancelEdit}>
                        Cancelar
                    </button>
                )}
            </div>

            {renderAnswerInputs()}

            {questions.map((question, index) => (
                <div key={index}>
                    <p>Tipo de pregunta: {question.type}</p>
                    <p>Pregunta: {question.question}</p>
                    <p>Respuestas:</p>
                    <ul>
                        {question.answers.map((answer, answerIndex) => (
                            <li key={answerIndex}>{answer}</li>
                        ))}
                    </ul>
                    {!editMode && (
                        <button type="button" onClick={() => handleEditQuestion(index)}>
                            Editar pregunta
                        </button>
                    )}
                </div>
            ))}
        </>
    );
};

export default Question;
