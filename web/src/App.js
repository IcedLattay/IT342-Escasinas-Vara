import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/user-authentication/LoginPage/LoginPage';
import RegistrationPage from './pages/user-registration/RegistrationPage/RegistrationPage';
import HomePage from './pages/HomePage/HomePage';
import Layout from './pages/LayoutPage/LayoutPage';
import ProtectedRoute from './security/ProtectedRoute';
import PublicRoute from './security/PublicRoute';
import AfterWalletTransaction from './pages/LoadingPages/AfterWalletTransaction';
import { AuthProvider } from './security/AuthContext';
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

import { BrowserRouter as Router, Routes, Route, Navigate, data } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* <Route 
            element={
                <Layout />
            }
          >
            <Route path="*" element={ <HomePage /> } />

          </Route> */}


          
          {/* <Route path="*" element={ <LoginPage /> } /> */}

          <Route path="/login" element={
            <PublicRoute><LoginPage /></PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute><RegistrationPage /></PublicRoute>
          } />

          <Route path="/loading" element={
            <AfterWalletTransaction/>
          }/>

          <Route 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={ <HomePage /> } />

          </Route>
          
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
