import React,{ useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appWrite/auth";
import { login,logout } from "./store/authSlice";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";


function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  },[]);

  if (loading == true) {
    return null;
  } else {
    return (
      <div className="min-h-screen flex flex-wrap content-between  bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
