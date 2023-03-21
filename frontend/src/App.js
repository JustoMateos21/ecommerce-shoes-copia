import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomeScreen from "./screens/HomeScreen";
function App() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gradient-to-t from-[#FFB8B8] to-[#1E1E1E]">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
