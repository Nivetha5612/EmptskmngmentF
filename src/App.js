import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (

    <BrowserRouter>

      <Navbar setLoggedIn={setLoggedIn} />

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/tasks" element={<Tasks />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;