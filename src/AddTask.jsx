import React from 'react'
import { FiMoon, FiBell, FiCheck } from "react-icons/fi";
import { MdAddReaction } from 'react-icons/md';

function AddTask() {
  return (
    <>
        <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-6">
        <h1 className="text-xl font-bold mb-8">Listify</h1>

        {/* Calendar */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-2">February 2024</h3>

          <div className="grid grid-cols-7 gap-2 text-xs text-center text-gray-500 mb-2">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs text-center text-gray-600">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
            <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span>
            <span className="bg-green-400 text-white rounded-full">14</span>
            <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span>
            <span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span>
          </div>
        </div>

        {/* Tasks */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Tasks</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Today</span>
            <span>2</span>
          </div>
        </div>

        {/* Lists */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Lists</h3>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Daily Routine</span>
            <span>1</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Study</span>
            <span>0</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mt-12 px-10 py-8 relative">

        {/* Top Right Icons */}
        {/* <div className="absolute top-6 right-8 flex gap-4 items-center">
          <FiMoon />
          <FiBell />
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div> */}


            <h2 className=" flex font-extrabold text-3xl mb-6 gap-3">New Task <span><MdAddReaction /></span></h2>
    

        {/* Inputs */}
        <div className="space-y-4 max-w-2xl">
          <input className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Name your new task" />
          <input className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Describe your new task" />
        </div>

        {/* Card Color */}
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Card Color</h3>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-green-200"></div>
            <div className="w-8 h-8 rounded-full bg-purple-300"></div>
            <div className="w-8 h-8 rounded-full bg-orange-200"></div>
            <div className="w-8 h-8 rounded-full bg-cyan-200"></div>
            <div className="w-8 h-8 rounded-full bg-yellow-300"></div>
            <div className="w-8 h-8 rounded-full bg-lime-400"></div>
            <div className="w-8 h-8 rounded-full bg-teal-300"></div>
            <div className="w-8 h-8 rounded-full bg-blue-400"></div>
            <div className="w-8 h-8 rounded-full bg-indigo-400"></div>
            <div className="w-8 h-8 rounded-full bg-pink-400"></div>
            <div className="w-8 h-8 rounded-full bg-red-500"></div>
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>
        </div>

        {/* Repeat Card */}
        <div className="mt-8 bg-white rounded-xl shadow p-6 max-w-3xl">
          <div className="grid grid-cols-2 gap-6">

            {/* Repeat */}
            <div>
              <h4 className="text-sm font-medium mb-1">Repeat</h4>
              <p className="text-xs text-gray-400 mb-3">Set a cycle for your task</p>

              <div className="flex bg-gray-100 rounded-lg p-1 text-sm mb-4">
                <button className="flex-1 bg-white rounded-md py-1">Daily</button>
                <button className="flex-1">Weekly</button>
                <button className="flex-1">Monthly</button>
              </div>

              <div className="flex gap-2 text-xs text-gray-500 mb-4">
                <span className="px-2 py-1 border rounded-full">Mon</span>
                <span className="px-2 py-1 border rounded-full">Tue</span>
                <span className="px-2 py-1 border rounded-full">Wed</span>
                <span className="px-2 py-1 border rounded-full">Thu</span>
                <span className="px-2 py-1 border rounded-full">Fri</span>
                <span className="px-2 py-1 border rounded-full">Sat</span>
                <span className="px-2 py-1 border rounded-full">Sun</span>
              </div>

              <div className="flex justify-between text-xs text-gray-400">
                <span>Repeat</span>
                <span>Every week ›</span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-sm font-medium mb-4">Set a tag for your task</h4>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Daily Routine</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Add More +</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Study Routine</span>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Button */}
        <button className="absolute bottom-8 right-8 w-12 h-12 bg-white shadow rounded-full flex items-center justify-center">
          <FiCheck />
        </button>

      </main>
    </div>
    
    </>
  )
}

export default AddTask