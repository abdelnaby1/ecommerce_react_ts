import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RootLayout from "../pages/Layout";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import ProductPage from "../pages/Product";
import CookieService from "../services/CookieService";
import ProductsPage from "../pages/Products";
import AdminDashboardPage from "../pages/dashboard";
import AdminRootLayout from "../pages/dashboard/Layout";
import AdminProductsPage from "../pages/dashboard/Products";
import AdminCategoriesPage from "../pages/dashboard/Categories";
import AdminSettingsPage from "../pages/dashboard/Settings";
import AdminProductPage from "../pages/dashboard/Product";

const token: string = CookieService.get("jwt");
const isAllowed = token ? true : false;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route
          path="products/:id"
          element={
            <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
              <ProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute isAllowed={isAllowed} redirectPath="/login">
              <ProductsPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/dashboard"
        element={<AdminRootLayout />}
        errorElement={<ErrorHandler />}
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/:id" element={<AdminProductPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
      <Route
        path="login"
        element={
          <ProtectedRoute isAllowed={!isAllowed} redirectPath="/">
            <LoginPage />
          </ProtectedRoute>
        }
        errorElement={<ErrorHandler />}
      />
      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
