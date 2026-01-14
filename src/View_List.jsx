import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { deleteTaskAPI, viewTaskByDateAPI } from "./service/allAPI";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const colorMap = {
  yellow: "bg-yellow-100 border-l-4 border-yellow-400",
  blue: "bg-blue-100 border-l-4 border-blue-400",
  red: "bg-red-100 border-l-4 border-red-400",
  green: "bg-green-100 border-l-4 border-green-400",
  purple: "bg-purple-100 border-l-4 border-purple-400",
};

function View_List() {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [value, setValue] = useState(dayjs());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    fetchTasksByDate();
  }, [value]);

  const fetchTasksByDate = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const selectedDate = value.format("YYYY-MM-DD");
      const result = await viewTaskByDateAPI(selectedDate, reqHeader);

      if (result?.status === 200) {
        setFilteredTasks(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      await deleteTaskAPI(id, reqHeader);
      fetchTasksByDate();
      toast.success("Deleted Sucessfully")
    } catch (error) {
      console.error(error);
    }
  };

  const listCounts = filteredTasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex w-full h-screen">
      {/* SIDEBAR */}
      <aside className="hidden md:block w-90 bg-white shrink-0">
        <div className="ms-8 py-6">
          <h1 className="text-xl font-bold mb-8">Listify</h1>

          <h3 className="text-sm font-medium mb-3">
            {value.format("MMMM YYYY")}
          </h3>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={value} onChange={setValue} />
          </LocalizationProvider>
        </div>

        {/* TASKS & LISTS */}
        <div className="mx-8 mt-4 bg-white rounded-xl shadow p-4">
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">
              Tasks
            </h4>

            <div className="flex justify-between bg-gray-50 px-3 py-2 rounded-md">
              <span className="text-sm">Today</span>
              <span className="text-sm font-medium">
                {filteredTasks.length}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">
              Lists
            </h4>

            {Object.entries(listCounts).map(([name, count]) => (
              <div
                key={name}
                className="flex justify-between text-sm py-1"
              >
                <span>{name}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="min-h-screen w-full bg-gray-50 p-6">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="md:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {showCalendar ? "Hide Calendar" : "Show Calendar"}
        </button>

        {showCalendar && (
          <div className="md:hidden mb-6 bg-white p-4 rounded-lg shadow">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={value} onChange={setValue} />
            </LocalizationProvider>
          </div>
        )}

        <div className="flex justify-between mb-6">
          <Link
            to="/add-task"
            className="bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            Back
          </Link>

          <h3 className="font-medium">
            {value.format("DD MMMM YYYY")}
          </h3>
        </div>

        <div className="space-y-3">
          {filteredTasks.length ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`flex justify-between px-4 py-3 rounded-lg ${
                  colorMap[task.color]
                }`}
              >
                <span>{task.title}</span>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No tasks for this day</p>
          )}
        </div>

        <Link
          to="/add-task"
          className="fixed bottom-6 right-6 w-12 h-12 bg-white shadow rounded-full flex items-center justify-center"
        >
          <FiPlus />
        </Link>
      </div>
    </div>
  );
}

export default View_List;
