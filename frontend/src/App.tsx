import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Index from "./pages";
import Login from "./pages/login";
import Signup from "./pages/signup";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
