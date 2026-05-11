import React, { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask, updateTask } from './api';
import TaskForm from './components/TaskForm';
import { Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAddTask = async (task) => {
    await createTask(task);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'todo' ? 'inprogress' : task.status === 'inprogress' ? 'done' : 'todo';
    await updateTask(task.id, { ...task, status: nextStatus });
    fetchTasks();
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-4xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <CheckCircle className="text-blue-600 w-10 h-10" /> Task Manager
        </h1>
        <p className="text-gray-500 mt-2">Manage your daily goals efficiently</p>
      </header>

      <TaskForm onTaskAdded={handleAddTask} />

      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:border-blue-300 transition">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
              <p className="text-gray-600 text-sm">{task.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs font-medium uppercase">
                <span className="flex items-center gap-1 text-gray-400">
                   <Clock className="w-3 h-3" /> {task.due_date}
                </span>
                <span className={`px-2 py-1 rounded-full ${task.status === 'done' ? 'bg-green-100 text-green-700' : task.status === 'inprogress' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                  {task.status}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => handleToggleStatus(task)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition">
                <AlertCircle className="w-6 h-6" />
              </button>
              <button onClick={() => handleDelete(task.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition">
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;