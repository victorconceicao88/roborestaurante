import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderBot from './components/OrderBot';
import AdminPage from './components/Admin/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderBot />} />
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Adicione esta rota para lidar com atualizações de página no admin */}
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;