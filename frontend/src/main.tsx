import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.ts";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.tsx";
import AdminRoute from "./components/admin/AdminRoute.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import ProductScreen from "./screens/ProductScreen.tsx";
import CategoryScreen from "./screens/CategoryScreen.tsx";
import CheckoutScreen from "./screens/CheckoutScreen.tsx";
import OrderInfoScreen from "./screens/OrderInfoScreen.tsx";
import UserProfileScreen from "./screens/UserProfileScreen.tsx";
import UserWishListScreen from "./screens/UserWishListScreen.tsx";
import UserSettingsScreen from "./screens/UserSettingsScreen.tsx";
import AdminOrderScreen from "./components/admin/AdminOrderScreen.tsx";
import AdminProductScreen from "./components/admin/AdminProductScreen.tsx";
import AdminUsersScreen from "./components/admin/AdminUsersScreen.tsx";
import AddProductScreen from "./components/admin/AddProductScreen.tsx";
import EditProductScreen from "./components/admin/EditProductScreen.tsx";
import EditUserScreen from "./components/admin/EditUserScreen.tsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/:category" element={<CategoryScreen />} />
      <Route path="/:category/:id"element={<ProductScreen />} />
      <Route path="/checkout" element={<CheckoutScreen />} />

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orders" element={<AdminOrderScreen />} />
        <Route path="/admin/products" element={<AdminProductScreen />} />
        <Route path="/admin/product/:id" element={<EditProductScreen />} />
        <Route path="/admin/products/addproduct" element={<AddProductScreen />} />
        <Route path="/admin/users" element={<AdminUsersScreen />} />
        <Route path="/admin/user/:id" element={<EditUserScreen />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path='/order/:id' element={<OrderInfoScreen />} />
        <Route path="/profile/orders" element={<UserProfileScreen />} />
        <Route path="/profile/wishlist" element={<UserWishListScreen />} />
        <Route path="/profile/settings" element={<UserSettingsScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
