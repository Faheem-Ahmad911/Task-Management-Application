"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // API URL for communicating with the Django backend
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/api/tasks/`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    await fetch(`${API_URL}/api/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        completed: false,
      }),
    });

    setTitle("");
    setDescription("");

    fetchTasks();
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Task Manager
      </h1>

      <div className="border p-4 rounded mb-6">
        <input
          className="border p-2 w-full mb-3"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={createTask}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="border p-4 rounded mb-3"
        >
          <h2 className="font-bold">
            {task.title}
          </h2>

          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}