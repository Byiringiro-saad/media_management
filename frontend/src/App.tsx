import * as React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//global styles
import "react-toastify/dist/ReactToastify.css";

//pages
import Index from "./pages";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Media from "./pages/media";

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Media />} />
      </Routes>
    </Router>
  );
};

export default App;
