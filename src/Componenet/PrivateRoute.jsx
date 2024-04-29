import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component, isAdmin }) => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (isAdmin) {
        const isAdminUser = localStorage.getItem('type');
        console.log("========pvt type=======",isAdminUser);
        if (isAdminUser !== 'admin') {
            console.log("Asdasdasd");
            return <Navigate to="/" />;
        }
    }

    return <Component />;
};

export default PrivateRoute;