import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import ShopScreen from "./screens/ShopScreen";
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-t from-[#FFB8B8] to-[#1E1E1E]">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/search" element={<ShopScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
