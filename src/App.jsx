import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Auth";
import AddTask from "./AddTask";
import View_List from "./View_List";

function App() {
  return <>
   
  <Routes>
    <Route path="/" element={<Auth/>}/>
    <Route path="/register" element={<Auth register/>}/>
    <Route path="/add-task" element={<AddTask/>}/>
    <Route path="/view-task" element={<View_List/>}/>
  </Routes>
  </>;
}

export default App;
