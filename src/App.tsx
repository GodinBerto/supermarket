import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./authentication/login";
import Dashboard from "./dashboard";
import Item from "./dashboard/items";
import Register from "./authentication/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} index />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/items" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
