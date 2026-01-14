import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Auth";
import AddTask from "./AddTask";
import View_List from "./View_List";
import { ToastContainer } from "react-toastify";

function App() {
  return <>
   
  <Routes>
    <Route path="/" element={<Auth/>}/>
    <Route path="/register" element={<Auth register/>}/>
    <Route path="/add-task" element={<AddTask/>}/>
    <Route path="/view-task" element={<View_List/>}/>
  </Routes>

  <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
  </>;
}

export default App;
