// import logo from './logo.svg';
import "./App.css";
import MainPage from "./views/MainPage";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import ItemPage from "./views/ItemPage";
import ItemEditPage from "./views/ItemEditPage";

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
        <Route index element={<ItemPage />}></Route>
        <Route path="items/:id/edit" element={<ItemEditPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
