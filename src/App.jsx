import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EdgeStoreProvider } from "./lib/edgestore";

import Home from "./pages/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/Signup";
import Home_layout from "./Layout/home";
import Email from "./pages/verify/Email";
import Profile from "./pages/profile";
import Car from "./pages/car";
import Order from "./pages/orders";
// Admin
import Admin from "./Layout/admin";
import Index from "./pages/admin";
import AdminCars from "./pages/admin/cars";
import AdminLogin from "./pages/admin/auth/Login";
import AdminAuth from "./pages/admin/auth";
import AdminSignup from "./pages/admin/auth/Signup";

function App() {
  return (
    <EdgeStoreProvider basePath="http://localhost:5000/admin/uploadstore">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home_layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/car/:id" element={<Car />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/email-verify" element={<Email />} />

          <Route path="/admin/">
            <Route index element={<Index />} />

            <Route path="dashboard" element={<Admin />}>
              <Route index element={<Index />} />
              <Route path="cars" element={<AdminCars />} />
              <Route path="orders" element={<div>orders admin</div>} />
              <Route path="account" element={<div>users admin</div>} />
            </Route>

            <Route path="auth">
              <Route index element={<AdminAuth />} />
              <Route path="signup" element={<AdminSignup />} />
              <Route path="login" element={<AdminLogin />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </EdgeStoreProvider>
  );
}

export default App;
