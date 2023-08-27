import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PlanDetail from "./components/PlanDetail";
import Subs from "./components/Subscribtion/subs";
// import SubscribtionPlan from "./components/Subscribtion/subscribtion";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Subs />} />
          <Route path="/curSubscription" element={<PlanDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
