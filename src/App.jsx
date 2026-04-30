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
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import NonAdminRoute from "./routes/NonAdminRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        {/* 🌐 WEBSITE (DEFAULT) */}
        <Route
          path="/"
          element={
            <NonAdminRoute>
              <MainLayout />
            </NonAdminRoute>
          }
        >
          <Route index element={<Home />} />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 🔐 ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="categories" />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
