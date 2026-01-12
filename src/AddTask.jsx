import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { MdAddReaction } from "react-icons/md";
import dayjs from "dayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addTaskAPI } from "./service/allAPI";
import { Link } from "react-router-dom";

function AddTask() {
  const [value, setValue] = useState(dayjs());

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  const [checked, setChecked] = useState(false);
  const [repeat, setRepeat] = useState("Daily");
  const [days, setDays] = useState([]);

  const [tags, setTags] = useState([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTag, setNewTag] = useState("");

  const defaultTags = ["Daily Routine", "Study Routine"];

  // ---------------- ADD TASK ----------------
  const handleAddTask = async () => {
    if (!title) {
      alert("Title is required");
      return;
    }

    const taskData = {
      title,
      description,
      color,
      date: value,
      isRepeatEnabled: checked,
      repeatType: repeat,
      repeatDays: days,
      tags,
    };

    try {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await addTaskAPI(taskData, reqHeader);

      if (result?.status === 200) {
        alert("Task added successfully");
        console.log(result.data);
        
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create task");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-90 bg-white p-6">
        <h1 className="text-xl font-bold mb-6">Listify</h1>

        <h3 className="text-sm font-medium mb-2">
          {value.format("MMMM YYYY")}
        </h3>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={value} onChange={setValue} />
        </LocalizationProvider>
      </aside>

      <div className="w-px bg-gray-300" />

      {/* Main */}
      <main className="flex-1 px-10 py-8 relative">
       
   <div className="flex gap-3">
<Link
  to="/view-task"
  className="w-24 h-9 flex items-center justify-center
             bg-blue-700 text-white rounded-2xl
             border border-blue-600
             hover:bg-white hover:text-blue-600
             transition duration-200"
>
  View Tasks
</Link>
          <h2 className="flex items-center gap-3 font-extrabold text-3xl mb-6">
            New Task <MdAddReaction />
          </h2>
         
   </div>

        {/* Inputs */}
        <div className="space-y-4 max-w-2xl">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Task title"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Task description"
          />
        </div>

        {/* Colors */}
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Card Color</h3>

          <div className="flex gap-3">
            {[
              ["green", "bg-green-400 ring-green-600"],
              ["purple", "bg-purple-400 ring-purple-600"],
              ["blue", "bg-blue-400 ring-blue-600"],
              ["red", "bg-red-500 ring-red-600"],
            ].map(([c, cls]) => (
              <label key={c} className="cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  className="sr-only peer"
                  onChange={() => setColor(c)}
                />
                <div
                  className={`w-8 h-8 rounded-full ${cls} peer-checked:ring-2`}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Repeat + Tags */}
        <div className="mt-8 bg-white rounded-xl shadow p-6 max-w-3xl grid grid-cols-2 gap-6">
          {/* Repeat */}
          <div>
            <h4 className="font-medium mb-2">Repeat</h4>

            <button
              onClick={() => setChecked(!checked)}
              className={`w-10 h-5 flex items-center rounded-full p-1 mb-4 ${
                checked ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition ${
                  checked ? "translate-x-5" : ""
                }`}
              />
            </button>

            <div className="flex bg-gray-100 rounded-lg p-1 mb-3">
              {["Daily", "Weekly", "Monthly"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRepeat(r)}
                  className={`flex-1 py-1 rounded ${
                    repeat === r && "bg-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div
              className={`flex gap-2 flex-wrap ${
                !checked && "opacity-40 pointer-events-none"
              }`}
            >
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span
                  key={d}
                  onClick={() =>
                    setDays(
                      days.includes(d)
                        ? days.filter((x) => x !== d)
                        : [...days, d]
                    )
                  }
                  className={`px-2 py-1 border rounded-full cursor-pointer ${
                    days.includes(d) && "bg-blue-500 text-white"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="font-medium mb-3">Tags</h4>

            <div className="flex gap-2 flex-wrap">
              {[...defaultTags, ...tags.filter(t => !defaultTags.includes(t))].map(
                (tag) => (
                  <span
                    key={tag}
                    onClick={() =>
                      setTags(
                        tags.includes(tag)
                          ? tags.filter((t) => t !== tag)
                          : [...tags, tag]
                      )
                    }
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                      tags.includes(tag)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {tag}
                  </span>
                )
              )}

              <span
                onClick={() => setShowTagModal(true)}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs cursor-pointer"
              >
                Add More +
              </span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleAddTask}
          className="absolute bottom-8 right-8 w-12 h-12 bg-white shadow hover:bg-black hover:text-white rounded-full flex items-center justify-center"
        >
          <FiCheck />
        </button>

        {/* Add Tag Modal */}
        {showTagModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-80 p-6">
              <h3 className="font-semibold mb-4">Add Tag</h3>

              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
                placeholder="Tag name"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowTagModal(false);
                    setNewTag("");
                  }}
                  className="text-gray-500"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (newTag.trim() && !tags.includes(newTag.trim())) {
                      setTags([...tags, newTag.trim()]);
                    }
                    setNewTag("");
                    setShowTagModal(false);
                  }}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AddTask;
