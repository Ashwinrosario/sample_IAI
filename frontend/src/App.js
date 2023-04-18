import {Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Register from "./components/Signup/Register";
import Signin from "./components/Login/Signin";
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Signin />} />
    </Routes>
  );
}

export default App;
