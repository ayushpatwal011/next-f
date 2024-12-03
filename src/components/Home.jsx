import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { BACKEND_URI } from '../server/config.js';

const Home = () => {

  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${BACKEND_URI}/`, {
          withCredentials: true, 
        });
        setTodos(res.data.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  if (loading)
    return (
      <div className="w-screen min-h-screen flex justify-center items-center p-10 bg-gray-900 text-red-400">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="w-screen min-h-screen flex justify-center items-center p-10 bg-gray-900 text-red-400">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="w-screen min-h-screen flex justify-center items-top p-10 bg-gray-900">
      <main className="flex flex-col gap-2">
        <h1 className="text-green-500 font-bold text-2xl text-center">TODOS</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex w-auto px-20 items-center">
              <button onClick={() => deleteTodo(todo.id)} className="text-red-700 pr-3">
                x
              </button>
              <div className="text-gray-400 text-sm w-60">{todo.title}</div>
              <div className="text-xs text-gray-500">{todo.todoData}</div>
            </li>
          ))}
        </ul>
        <div className='flex justify-center'>
          <button
            type="submit"
            onClick={() => navigate("/add")}
            className="px-4 py-2 w-40 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Create New Todo
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
