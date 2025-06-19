import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import TransactionDetail from "./pages/TransactionDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
