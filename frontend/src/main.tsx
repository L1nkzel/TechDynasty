import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen.tsx";
import ProductScreen from "./screens/ProductScreen.tsx";
import CategoryScreen from "./screens/CategoryScreen.tsx";
import store from "./store";
import CheckoutScreen from "./screens/CheckoutScreen.tsx";
import OrderInfoScreen from "./screens/OrderInfoScreen.tsx";
import UserProfileScreen from "./screens/UserProfileScreen.tsx";
import UserWishListScreen from "./screens/UserWishListScreen.tsx";
import UserSettingsScreen from "./screens/UserSettingsScreen.tsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/:category" element={<CategoryScreen />} />
      <Route path="/:category/:id"element={<ProductScreen />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      <Route path='/order/:id' element={<OrderInfoScreen />} />
      <Route path="/profile/orders" element={<UserProfileScreen />} />
      <Route path="/profile/wishlist" element={<UserWishListScreen />} />
      <Route path="/profile/settings" element={<UserSettingsScreen />} />
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
