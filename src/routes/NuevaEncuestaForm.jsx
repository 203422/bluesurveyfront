import React, { useState } from 'react';
// import axios from 'axios';

const NuevaEncuestaForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [preguntas, setPreguntas] = useState([{ tipo: '', texto: '', opciones: [] }]);
  
  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handlePreguntaChange = (event, index) => {
    const { name, value } = event.target;
    const updatedPreguntas = [...preguntas];
    updatedPreguntas[index][name] = value;
    setPreguntas(updatedPreguntas);
  };

  const handleAgregarPregunta = () => {
    setPreguntas([...preguntas, { tipo: '', texto: '', opciones: [] }]);
  };

  const handleEliminarPregunta = (index) => {
    const updatedPreguntas = [...preguntas];
    updatedPreguntas.splice(index, 1);
    setPreguntas(updatedPreguntas);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nuevaEncuesta = {
      titulo,
      descripcion,
      preguntas
    };

    try {
      // Aquí puedes hacer la solicitud POST a tu API para guardar la encuesta en MongoDB
      const response = await axios.post('/api/encuestas', nuevaEncuesta);
      console.log(response.data); // Respuesta del servidor
      // Aquí puedes realizar alguna acción adicional, como redirigir al usuario a otra página
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={handleTituloChange} />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={handleDescripcionChange}></textarea>
      </div>
      <div>
        <h3>Preguntas:</h3>
        {preguntas.map((pregunta, index) => (
          <div key={index}>
            <div>
              <label>Tipo:</label>
              <select name="tipo" value={pregunta.tipo} onChange={(event) => handlePreguntaChange(event, index)}>
                <option value="">Seleccionar</option>
                <option value="opcion_multiple">Opción Múltiple</option>
                <option value="opcion_unica">Opción Única</option>
                <option value="respuesta_abierta">Respuesta Abierta</option>
              </select>
            </div>
            <div>
              <label>Texto:</label>
              <input type="text" name="texto" value={pregunta.texto} onChange={(event) => handlePreguntaChange(event, index)} />
            </div>
            {pregunta.tipo !== 'respuesta_abierta' && (
              <div>
                <label>Opciones:</label>
                <input
                  type="text"
                  name="opciones"
                  value={pregunta.opciones.join(', ')}
                  onChange={(event) => handlePreguntaChange(event, index)}
                />
              </div>
            )}
            <button type="button" onClick={() => handleEliminarPregunta(index)}>
              Eliminar Pregunta
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAgregarPregunta}>
          Agregar Pregunta
        </button>
      </div>
      <button type="submit">Guardar Encuesta</button>
    </form>
  );
};

export default NuevaEncuestaForm;