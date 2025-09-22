import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { route } from "./routes/route";
import "./App.css";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {route.map((rout) => {
            return <Route path={rout.path} element={<h1>{rout.title}</h1>} />;
          })}
        </Route>
      </Routes>
<<<<<<< HEAD
     
=======
>>>>>>> f41ee9ff46934b87444fc85ca20d742cb3ed787b
    </>
  );
}
