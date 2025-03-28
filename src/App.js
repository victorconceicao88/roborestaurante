import { useState, useEffect } from 'react';
import OrderBot from './components/OrderBot';



function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Keyboard shortcut (Ctrl + Alt + A) to toggle admin panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key === 'a') {
        setIsAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="App">
      {/* Renderiza o OrderBot e passa isAdmin como prop se necessário */}
      <OrderBot />
      
      {/* Exemplo de como você poderia usar o estado isAdmin */}
      {isAdmin && (
        <div className="admin-panel">
          {/* Conteúdo do painel admin */}
          Painel Administrativo
        </div>
      )}
    </div>
  );
}

export default App;