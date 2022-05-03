// import logo from './logo.svg';
import './App.css';
import MainPage from "./views/MainPage";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
    <Route
      path="/"
      element={
        <RequireAuth>
          <MainPage />
        </RequireAuth>
      }
    >
      {/* <Route index element={<ProductPage />}></Route>
      <Route path="products/:id/edit" element={<ProductEditPage />} />
      <Route path="products/:id/images" element={<ImagesPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="categories" element={<CategoryPage />} /> */}
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
  );
}

export default App;
