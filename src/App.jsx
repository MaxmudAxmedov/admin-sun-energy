import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { route } from "./routes/route";
import "./App.css";
import { ClipLoader } from "react-spinners";
const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
};

const loginPage = route.find((r) => r.path === "login");
const notFoundPage = route.find((r) => r.path === "*");

export default function App() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ClipLoader color="#36d7b7" size={150} />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<loginPage.element />} />

        <Route path="/" element={<MainLayout />}>
          {route.map((rout, index) => {
            if (rout.path === "login" || rout.path === "*") {
              return null;
            }
            return (
              <Route key={index}>
                <Route
                  path={rout.path}
                  element={
                    <ProtectedRoute>
                      <rout.element />
                    </ProtectedRoute>
                  }
                />
                {rout.create && (
                  <Route
                    path={`${rout.path}/create`}
                    element={
                      <ProtectedRoute>
                        <rout.create />
                      </ProtectedRoute>
                    }
                  />
                )}
                {rout.edit && (
                  <Route
                    path={`${rout.path}/edit/:id`}
                    element={
                      <ProtectedRoute>
                        <rout.edit />
                      </ProtectedRoute>
                    }
                  />
                )}
              </Route>
            );
          })}
        </Route>

        <Route path="*" element={<notFoundPage.element />} />
      </Routes>
    </Suspense>
  );
}
