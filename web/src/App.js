import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/user-authentication/LoginPage/LoginPage';
import RegistrationPage from './pages/user-registration/RegistrationPage/RegistrationPage';
import HomePage from './pages/HomePage/HomePage';
import Layout from './pages/LayoutPage/LayoutPage';
import ProtectedRoute from './security/ProtectedRoute';
import PublicRoute from './security/PublicRoute';
import AfterWalletTransaction from './pages/LoadingPages/AfterWalletTransaction';
import { AuthContext, AuthProvider } from './security/AuthContext';
import {formatBalance} from "./helper-functions/WalletHelpFunctions";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

import { BrowserRouter as Router, Routes, Route, Navigate, data } from "react-router-dom";
import { useContext } from 'react';

function DebugPanel() {
  const { user, wallet, userIsAuthenticated, isLoading } = useContext(AuthContext);

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: ".8rem",
        right: "1rem",
        zIndex: 99999,
        background: "white",
        border: "1px solid black",
        padding: ".5rem",
        fontSize: ".75rem",
        // visibility: "hidden"
      }}
    >
      <div>
        <div style={{ marginBottom: ".1rem" }}>Authenticated User</div>
        {(user && userIsAuthenticated) ? (
          <>
            <div>Name: {`${user.firstname} ${user.lastname}`}</div>
            <div>Email: {user.email}</div>
          </>
        ) : (
          <div style={{ color: "#6b6b6b" }}>Null</div>
        )}
      </div>

      <div>
        <div style={{ marginBottom: ".1rem" }}>Wallet</div>
        {wallet ? (
          <div>Balance: {`${wallet.currency} ${formatBalance(wallet.balance)}`}</div>
        ) : (
          <div style={{ color: "#6b6b6b" }}>Null</div>
        )}
      </div>

      <div>isLoading: {String(isLoading)}</div>
      <div>userIsAuthenticated: {String(userIsAuthenticated)}</div>
    </div>
  );
}

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

          {/* THE CORRECT ROUTING */}
          <Route path="/login" element={
            <PublicRoute><LoginPage /></PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute><RegistrationPage /></PublicRoute>
          } />

          <Route path="/loading" element={
            <ProtectedRoute><AfterWalletTransaction/></ProtectedRoute>
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

        <DebugPanel />
      </Router>
    </AuthProvider>
  );
}

export default App;
