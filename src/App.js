import React from 'react';
import './App.css';
import OrderBot from './components/OrderBot';  // Adicione esta linha

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center my-8">Bem-vindo ao Restaurante</h1>
      <OrderBot />
    </div>
  );
}

export default App;
