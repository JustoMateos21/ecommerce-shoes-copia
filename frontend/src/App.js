import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import ShopScreen from "./screens/ShopScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import ProtectedRoutes from "./Components/ProtectedRoutes";
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-t from-[#FFB8B8] to-[#1E1E1E]">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/search" element={<ShopScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/delivery" element={<DeliveryScreen />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoutes>
                <CheckoutScreen />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
