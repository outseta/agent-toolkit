import { Link, Route, Routes, Outlet, BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import { Layout } from "./react-widgets";

/*
 * This example demonstrates a complete React application structure
 * using the AuthProvider pattern for Outseta integration.
 */

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <div className="p-4">
                  <h2 className="text-2xl font-bold">Home</h2>
                  <p>Home page visible to all.</p>
                </div>
              }
            />
            <Route
              path="login"
              element={
                <div className="p-4">
                  <h2 className="text-2xl font-bold">Login</h2>
                  <p>Please log in to access your account.</p>
                </div>
              }
            />
            <Route
              path="signup"
              element={
                <div className="p-4">
                  <h2 className="text-2xl font-bold">Sign Up</h2>
                  <p>Create an account to get started.</p>
                </div>
              }
            />
            <Route
              path="my-profile"
              element={
                <div className="p-4">
                  <h2 className="text-2xl font-bold">My Profile</h2>
                  <p>Manage your personal information.</p>
                </div>
              }
            />
            <Route
              path="my-billing"
              element={
                <div className="p-4">
                  <h2 className="text-2xl font-bold">Billing</h2>
                  <p>Manage your subscription and payment methods.</p>
                </div>
              }
            />
            <Route
              path="logout"
              element={
                <div className="p-4">
                  <h2 className="text-2xl font-bold">Logged Out</h2>
                  <p>You have been successfully logged out.</p>
                  <Link to="/" className="text-blue-500 underline">
                    Return Home
                  </Link>
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div className="p-4">
                  <h2 className="text-2xl font-bold">Not Found</h2>
                  <p>The page you are looking for does not exist.</p>
                </div>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
