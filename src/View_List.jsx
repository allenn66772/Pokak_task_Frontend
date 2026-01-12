import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { viewTaskAPI, deleteTaskAPI } from "./service/allAPI";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Link } from "react-router-dom";


const colorMap = {
  yellow: "bg-yellow-100 border-l-4 border-yellow-400",
  blue: "bg-blue-100 border-l-4 border-blue-400",
  red: "bg-red-100 border-l-4 border-red-400",
  green: "bg-green-100 border-l-4 border-green-400",
  purple: "bg-purple-100 border-l-4 border-purple-400",
};

function View_List() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [value, setValue] = useState(dayjs());
  const [showCalendar, setShowCalendar] = useState(false);

  
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

  
  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      await deleteTaskAPI(id, reqHeader);
      handleGetTask();
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    const filtered = tasks.filter((task) => {
      if (!task.date) return false;


      return dayjs(task.date).isSame(value, "day");
    });

    setFilteredTasks(filtered);
  }, [value, tasks]);


  useEffect(() => {
    handleGetTask();
  }, []);

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
            <DateCalendar
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </LocalizationProvider>
        </div>
      </aside>

      {/* MAIN */}
      <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 md:p-10">

        {/* MOBILE CALENDAR */}
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="md:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          {showCalendar ? "Hide Calendar" : "Show Calendar"}
        </button>

        {showCalendar && (
          <div className="md:hidden mb-6 bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium mb-3">
              {value.format("MMMM YYYY")}
            </h3>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
          </div>
        )}

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/add-task"
            className="w-24 h-9 flex items-center justify-center
            bg-blue-700 text-white rounded-2xl
            border border-blue-600
            hover:bg-white hover:text-blue-600
            transition"
          >
            Back
          </Link>

          <h3 className="text-sm sm:text-base font-medium text-gray-700">
            {value.format("DD MMMM YYYY")}
          </h3>
        </div>

        {/* TASK LIST */}
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between
                gap-3 px-4 py-3 rounded-lg
                ${colorMap[task.color] || "bg-gray-100 border-l-4 border-gray-300"}`}
              >
                <div className="flex items-center gap-3">
                  <input type="checkbox" />
                  <span className="text-sm break-words">
                    {task.title}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              No tasks for this day
            </p>
          )}
        </div>

        {/* FLOATING ADD BUTTON */}
        <Link
          to="/add-task"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8
          w-12 h-12 rounded-full bg-white shadow
          flex items-center justify-center
          hover:bg-black hover:text-white"
        >
          <FiPlus />
        </Link>
      </div>
    </div>
  );
}

export default View_List;
