import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import FoodDetails from "./pages/FoodDetails";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import AdminMenu from "./pages/AdminMenu";
import AddMenu from "./pages/AddMenu";
import EditMenu from "./pages/EditMenu";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/menu/:id" element={<FoodDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/admin/menu/add" element={<AddMenu />} />
        <Route path="/admin/edit-menu/:id" element={<EditMenu />} />
        <Route path="/wishlist" element={<Favorites />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;