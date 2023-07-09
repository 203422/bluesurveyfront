import { useState, useEffect } from "react"
import API_URL from "../auth/constants"
import '../assets/styles/formSurvey.css'
import Wave from "../layout/Wave";
import { useParams } from "react-router-dom";

const FormSurvey = () => {
  const { id } = useParams()

  useEffect(() => {
    getSurvey();
  }, [])

  const [showSurvey, setShowSurvey] = useState({})
  const [inputsValue, setInputsValue] = useState({ surveyId: id })

  const getSurvey = async () => {
    const response = await fetch(`${API_URL}/public-survey/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (response.ok) {
      const json = await response.json();
      setShowSurvey(json)
    }
  }

  const handleInputChange = (event, questionIndex) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setInputsValue((prevInputsValue) => {
        const previousValues = prevInputsValue[questionIndex] || [];
        let updatedValues;

        if (checked) {
          updatedValues = [...previousValues, value];
        } else {
          updatedValues = previousValues.filter((v) => v !== value);
        }

        return {
          ...prevInputsValue,
          [questionIndex]: updatedValues,
        };
      });
    } else {
      setInputsValue((prevInputsValue) => ({
        ...prevInputsValue,
        [questionIndex]: value,
      }));
    }


  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputsValue)
  }

  return (
    <>
      <Wave />
      {console.log(id)}
      <div className="container_form_public container">
        <form onSubmit={handleSubmit} className="container_form_public_content">
          <div className="header_form_public">
            <h1>{showSurvey.title} </h1>
            <p>{showSurvey.description}</p>
          </div>
          <div className="form_public_content">
            {showSurvey.questions && showSurvey.questions.map((question, index) => (
              <div key={index}>
                <div className='container_question_public'>
                  <label className="label_form_public">{question.question}</label>

                  {question.type === "abierta" && (
                    <div className="">
                      <input
                        className="input_public"
                        type="text"
                        placeholder="Escribe una o varias palabras..."
                        name={`question_${index}`}
                        value={inputsValue[index] || ''}
                        onChange={(event) => handleInputChange(event, index)}
                      />
                    </div>
                  )}

                  {question.type === "opción unica" && (
                    <div>
                      {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className="radio_container">
                          <input
                            type="radio"
                            id={`question_${index}_answer_${answerIndex}`}
                            name={`question_${index}`}
                            value={answer}
                            onChange={(event) => handleInputChange(event, index)}
                          />
                          <label htmlFor={`question_${index}_answer_${answerIndex}`} className="label_radio">{answer}</label>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "opción multiple" && (
                    <div>
                      {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex}>
                          <input
                            type="checkbox"
                            id={`question_${index}_answer_${answerIndex}`}
                            name={`question_${index}`}
                            value={answer}
                            onChange={(event) => handleInputChange(event, index)}
                          />
                          <label htmlFor={`question_${index}_answer_${answerIndex}`} className="label_checkbox">{answer}</label>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.answer}

                </div>
              </div>
            ))}
            <button className="aceptar button_modal button_public">Enviar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormSurvey;
