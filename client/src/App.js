import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import {Routes,Route} from "react-router-dom"
import Tasks from "./components/Tasks";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
      </Routes>
    </div>
  );
}

export default App;