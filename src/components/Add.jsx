import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URI } from '../server/config.js'

const Add = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [todoData, setTodoData] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && todoData.trim()) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND_URI}/add`, 
          { title, todoData },
          { withCredentials: true } 
        );
  
        console.log('Response:', response.data); 
        setTitle('');
        setTodoData('');
      } catch (error) {
        console.error('Error adding todo:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <div className="w-screen min-h-screen h-auto flex justify-center items-top p-10 bg-gray-900">
      <main className="flex flex-col gap-2">
        <h1 className="text-green-500 font-bold text-2xl text-center">Add new TODO</h1>
  
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Add Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
  
          <textarea
            value={todoData}
            placeholder="Add Todo Data"
            onChange={(e) => setTodoData(e.target.value)}
            className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          
          {loading ? (
            <p  className="px-4 py-2 text-white text-center bg-blue-500 rounded-lg">Loading...</p>
          ) : (
            
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Add
            </button>
            
          )}
          <button
              type="submit"
              onClick={() => navigate("/")}
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              Go Back
            </button>
          
        </form>
      </main>
    </div>
  );
  
}

export default Add