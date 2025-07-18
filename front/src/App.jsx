import { Routes, Route, Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import  secureLocalStorage  from  "react-secure-storage"
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import axios_instance from '../constants/axios';
import { requests } from '../constants/requests';
import PropTypes from 'prop-types';

function ProtectedRoute({ roles = ['user', 'admin'], children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    axios_instance.get(requests.session, { withCredentials: true })
      .then(response => {
        setHasSession(true);
        const userRole = response.data.isAdmin ? 'admin' : 'user';
        secureLocalStorage.setItem('user_role', userRole);
        if (roles.includes(userRole)) {
          setIsAuthorized(true);
        }
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [roles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasSession) {
    return <Navigate to="/login" />;
  }
  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.node.isRequired,
};

function App() {
  
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" element={<ProtectedRoute roles={['user', 'admin']}><HomePage></HomePage></ProtectedRoute>} />
        <Route path="/admin/config" element={<ProtectedRoute roles={['admin']}><AdminPage></AdminPage></ProtectedRoute>} />
        <Route path="/admin/register" element={<ProtectedRoute roles={['admin']}><RegistrationPage admin={true}/></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
}

export default App;