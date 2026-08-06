import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            theme="colored"
          />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);