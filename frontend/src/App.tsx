import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Index from "./pages";
import Login from "./pages/login";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
