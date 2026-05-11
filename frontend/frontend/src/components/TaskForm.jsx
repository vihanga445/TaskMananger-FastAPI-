import React, { useState } from 'react';
import { PlusCircle, Calendar, FileText } from 'lucide-react';

const TaskForm = ({ onTaskAdded }) => {
    const [task, setTask] = useState({ title: '', description: '', due_date: '', status: 'todo' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        onTaskAdded(task);
        setTask({ title: '', description: '', due_date: '', status: 'todo' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                    type="text" placeholder="Task Title" required
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    value={task.title} onChange={(e) => setTask({...task, title: e.target.value})}
                />
                <input 
                    type="date" required
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    value={task.due_date} onChange={(e) => setTask({...task, due_date: e.target.value})}
                />
                <textarea 
                    placeholder="Description"
                    className="p-2 border rounded-lg md:col-span-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    value={task.description} onChange={(e) => setTask({...task, description: e.target.value})}
                />
            </div>
            <button type="submit" className="mt-4 flex items-center justify-center w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
                <PlusCircle className="mr-2 w-5 h-5" /> Add Task
            </button>
        </form>
    );
};

export default TaskForm;