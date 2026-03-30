import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"

export default function ProtectedRoute({ children }) {
  const { userIsAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>Loading...</div>;

  if (!userIsAuthenticated) return <Navigate to="/login" />;

  return children;
}