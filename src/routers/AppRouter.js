import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PivateRoute } from './PivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginScreen />} /> */}
        {/* Public routes..... */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          }
        />

        {/* <Route path="/*" element={<DashboardRoutes />} /> */}
        {/* Private Routes.... */}
        <Route
          path="/*"
          element={
            <PivateRoute>
              <DashboardRoutes />
            </PivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
