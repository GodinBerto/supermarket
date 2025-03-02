import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./authentication/login";
import Dashboard from "./dashboard";
import Item from "./dashboard/items";
import Register from "./authentication/register";
import Categories from "./dashboard/categories";
import Departments from "./dashboard/department";
import Staff from "./dashboard/staff";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} index />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/items" element={<Item />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </Router>
  );
}

export default App;
