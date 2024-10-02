import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import Single from './pages/Single';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import "./style.scss";
import ProtectedRoute from './ProtectedRoute';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/post/:id",
                element: <Single />
            },
            {
                path: "/write",
                element: (
                    <ProtectedRoute
                        element={<Write />}
                    />
                ),
            },
            {
                path: "/settings",
                element: (
                    <ProtectedRoute
                        element={<Settings />}
                    />
                ),
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);

function App() {
    return (
        <div className='app'>
            <div className='container'>
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
