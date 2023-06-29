import { useAuth } from '../auth/AuthProvider'
import API_URL from '../auth/constants'
import { useEffect, useState } from 'react'

const Dashboard = () => {

    const [todos, setTodos] = useState([])
    const auth = useAuth();
    console.log(todos)

    useEffect(() => {
        loadTodos();
    }, [])

    const loadTodos = async () => {

        try {

            const response = await fetch(`${API_URL}/todos`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                }
            })

            if (response.ok) {
                const json = await response.json();
                setTodos(json);
            }
        } catch (error) {

        }


    }

    return (
        <>
            <h1>Dashboard de {auth.getUser().name} </h1>
            {todos.map((todo) => (<div key={todo.id}>{todo.tittle}</div>))}
        </>


    );
}

export default Dashboard; 