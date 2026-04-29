import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./admin/components/AdminLayout";
import Categories from "./admin/pages/Categories/Categories";
import Products from "./admin/pages/products/Product";

import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/home/Home";

import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import CartPage from "./pages/cart/CartPage";
import Login from "./auth/login/Login";
import Signup from "./auth/signup/Signup";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* 🌐 WEBSITE (DEFAULT) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* 🔐 ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="categories" />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
