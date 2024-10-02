import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ element }) => {
    const { currentUser } = useContext(AuthContext);
    
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;