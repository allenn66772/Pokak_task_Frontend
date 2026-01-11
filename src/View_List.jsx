import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Sidebar from "./components/Sidebar";
import {viewTaskAPI } from "./service/allAPI";

function View_List() {
  const [tasks, setTasks] = useState([]);

  // 🔥 GET TASKS
  const handleGetTask = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await viewTaskAPI(reqHeader);

      if (result?.status === 200) {
        setTasks(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // load tasks on page load
  useEffect(() => {
    handleGetTask();
  }, []);

  return (
    <div className="flex w-full h-screen">
      <Sidebar />

      <div className="min-h-screen w-full bg-gray-50 p-10 relative">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-6">Today</h2>

        {/* Tasks */}
        <div className="space-y-3 w-full">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <label
                key={task._id}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
                  ${task.color === "yellow" ? "bg-yellow-100" : "bg-blue-100"}
                `}
              >
                <input type="checkbox" className="w-4 h-4" />

                <span className="text-sm">
                  {task.title}
                </span>
              </label>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No tasks for today</p>
          )}
        </div>

        {/* Floating Add Button */}
        <button
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center"
          aria-label="Add Task"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}

export default View_List;
