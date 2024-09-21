import { LoginPage } from "./pages/login-page";
import { Routes, Route,} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;