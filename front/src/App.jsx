import { Routes, Route, Navigate} from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage"
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { HomePage } from "./pages/HomePage";

function ProtectedRoute({ roles=['user', 'admin'], children }) {
  const userRole = secureLocalStorage.getItem('user_role');

  if (!userRole) {
    return <Navigate to="/login" />;
  }
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/home" />;
  }
  return children;
}
function App() {

    return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/home" element={<ProtectedRoute roles={['user', 'admin']}><HomePage></HomePage></ProtectedRoute>} />
    </Routes>
  );
}

export default App;