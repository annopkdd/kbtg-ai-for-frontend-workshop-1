import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import TransactionDetail from "./pages/TransactionDetail";
import Transfer from "./pages/Transfer";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/history" element={<History />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
