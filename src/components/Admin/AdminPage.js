import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import {
  LogOut, ChefHat, Loader2,
  Shield, Lock, User, AlertCircle,
  Key, RefreshCw, Edit
} from 'lucide-react';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedCredentials = localStorage.getItem('adminCredentials');
    const savedOrders = localStorage.getItem('adminOrders');

    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }

    if (!savedCredentials) {
      setIsFirstLogin(true);
    } else {
      const credentials = JSON.parse(savedCredentials);
      setUsername(credentials.username);
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      try {
        const savedCredentials = localStorage.getItem('adminCredentials');

        if (isFirstLogin) {
          if (!newUsername.trim()) {
            throw new Error('Por favor, defina um nome de usuário');
          }
          
          if (newPassword.length < 6) {
            throw new Error('A senha deve ter pelo menos 6 caracteres');
          }
          
          if (newPassword !== confirmPassword) {
            throw new Error('As senhas não coincidem');
          }
          
          const credentials = {
            username: newUsername,
            password: newPassword
          };
          
          localStorage.setItem('adminCredentials', JSON.stringify(credentials));
          localStorage.setItem('adminAuth', 'true');
          setIsFirstLogin(false);
          setIsAuthenticated(true);
          setUsername(newUsername);
        } else {
          if (!savedCredentials) {
            throw new Error('Credenciais não encontradas');
          }
          
          const credentials = JSON.parse(savedCredentials);
          
          if (username !== credentials.username) {
            throw new Error('Usuário inválido');
          }
          
          if (password !== credentials.password) {
            throw new Error('Senha incorreta');
          }
          
          localStorage.setItem('adminAuth', 'true');
          setIsAuthenticated(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handlePasswordChange = () => {
    if (!newUsername.trim()) {
      setError('Por favor, defina um nome de usuário');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    const credentials = {
      username: newUsername,
      password: newPassword
    };
    
    localStorage.setItem('adminCredentials', JSON.stringify(credentials));
    setUsername(newUsername);
    setShowPasswordChange(false);
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    alert('Credenciais atualizadas com sucesso!');
  };

  const generatePassword = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 8; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setNewPassword(result);
    setConfirmPassword(result);
  };

  const handlePrintOrder = (order) => {
    const printContent = `
      <html>
        <head>
          <title>Pedido #${order.orderNumber}</title>
          <style>
            @page { size: auto; margin: 5mm; }
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 15px;
              color: #333;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 2px solid #3D1106;
            }
            .header h1 {
              color: #3D1106;
              margin: 0;
              font-size: 22px;
              font-weight: bold;
            }
            .order-info {
              margin-bottom: 5px;
              font-size: 14px;
            }
            .order-number {
              font-weight: bold;
              font-size: 16px;
              margin: 5px 0;
            }
            .section-title {
              color: #3D1106;
              font-size: 16px;
              font-weight: bold;
              margin: 15px 0 8px 0;
              border-bottom: 1px solid #ddd;
              padding-bottom: 3px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 100px 1fr;
              gap: 5px;
              margin-bottom: 10px;
              font-size: 13px;
            }
            .info-label {
              font-weight: bold;
              color: #555;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
              font-size: 13px;
            }
            .items-table th {
              background-color: #3D1106;
              color: white;
              text-align: left;
              padding: 6px 8px;
              font-weight: bold;
            }
            .items-table td {
              padding: 6px 8px;
              border-bottom: 1px solid #eee;
            }
            .item-options {
              font-size: 11px;
              color: #666;
              margin-top: 3px;
              line-height: 1.4;
            }
            .item-option {
              display: flex;
              align-items: center;
            }
            .item-option-icon {
              margin-right: 5px;
              width: 14px;
              text-align: center;
            }
            .total-row {
              font-weight: bold;
              background-color: #f5f5f5;
            }
            .grand-total {
              font-size: 15px;
              background-color: #FFB501 !important;
              color: #3D1106;
            }
            .footer {
              margin-top: 25px;
              font-size: 11px;
              text-align: center;
              color: #777;
              border-top: 1px solid #eee;
              padding-top: 10px;
            }
            @media print {
              body { padding: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Cozinha da Vivi</h1>
            <div class="order-number">Pedido #${order.orderNumber}</div>
            <div class="order-info">
              ${new Date(order.timestamp).toLocaleString('pt-PT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
  
          <div class="section-title">Informações do Cliente</div>
          <div class="info-grid">
            <div class="info-label">Nome:</div>
            <div>${order.nome}</div>
            
            <div class="info-label">Contato:</div>
            <div>${order.contato}</div>
            
            <div class="info-label">Tipo:</div>
            <div>${order.entrega ? 'Entrega' : 'Retirada no local'}</div>
            
            ${order.entrega ? `
              <div class="info-label">Endereço:</div>
              <div>${order.endereco}</div>
            ` : ''}
            
            <div class="info-label">Pagamento:</div>
            <div>
              ${order.metodoPagamento === 'mbway' ? `MBWay (${order.mbwayPhone})` : 
                order.metodoPagamento === 'cartao' ? 'Cartão' : 
                order.metodoPagamento === 'multibanco' ? 'Multibanco' : 'Dinheiro'}
            </div>
          </div>
  
          ${order.observacoes ? `
            <div class="section-title">Observações</div>
            <div style="margin-bottom:15px;font-size:13px;">
              ${order.observacoes}
            </div>
          ` : ''}
  
          <div class="section-title">Itens do Pedido</div>
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qtd</th>
                <th>Preço</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.cart.map(item => `
                <tr>
                  <td>
                    ${item.nome}
                    ${item.selectedOptions ? `
                      <div class="item-options">
                        ${item.selectedOptions.carnes?.length > 0 ? `
                          <div class="item-option">
                            <span class="item-option-icon">🥩</span>
                            <span>Carnes: ${item.selectedOptions.carnes.join(", ")}</span>
                          </div>
                        ` : ''}
                        ${item.selectedOptions.acompanhamentos?.length > 0 ? `
                          <div class="item-option">
                            <span class="item-option-icon">🍚</span>
                            <span>Acomp: ${item.selectedOptions.acompanhamentos.join(", ")}</span>
                          </div>
                        ` : ''}
                        ${item.selectedOptions.salada ? `
                          <div class="item-option">
                            <span class="item-option-icon">🥗</span>
                            <span>Salada: ${item.selectedOptions.salada}</span>
                          </div>
                        ` : ''}
                        ${item.selectedOptions.bebida ? `
                          <div class="item-option">
                            <span class="item-option-icon">🥤</span>
                            <span>Bebida: ${item.selectedOptions.bebida}</span>
                          </div>
                        ` : ''}
                      </div>
                    ` : ''}
                  </td>
                  <td>${item.quantidade}</td>
                  <td>€${(item.precoFinal || item.preco).toFixed(2)}</td>
                  <td>€${((item.precoFinal || item.preco) * item.quantidade).toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="3" style="text-align:right">Subtotal:</td>
                <td>€${order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0).toFixed(2)}</td>
              </tr>
              ${order.entrega ? `
              <tr class="total-row">
                <td colspan="3" style="text-align:right">Taxa de Entrega:</td>
                <td>€4.00</td>
              </tr>
              ` : ''}
              <tr class="grand-total">
                <td colspan="3" style="text-align:right">TOTAL:</td>
                <td>€${(order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0) + (order.entrega ? 4 : 0)).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
  
          <div class="footer">
            Pedido gerado em ${new Date().toLocaleString('pt-PT')} • Cozinha da Vivi
          </div>
  
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 100);
              }, 200);
            }
          </script>
        </body>
      </html>
    `;
  
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.left = '-9999px';
    document.body.appendChild(iframe);
    
    iframe.contentDocument.open();
    iframe.contentDocument.write(printContent);
    iframe.contentDocument.close();
    
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 2000);
  };

  const handleMarkAsDone = (orderNumber) => {
    return new Promise((resolve) => {
      const updatedOrders = orders.map(order => 
        order.orderNumber === orderNumber ? { ...order, status: 'done' } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));
      resolve();
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF1E8] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto bg-[#3D1106] text-[#FFB501] w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ChefHat size={32} />
            </div>
            <h1 className="text-2xl font-bold text-[#280B04]">
              {isFirstLogin ? 'Configuração Inicial' : 'Acesso Administrativo'}
            </h1>
            <p className="text-[#6B7280] mt-2">
              {isFirstLogin ? 'Defina suas credenciais de acesso' : 'Entre com suas credenciais'}
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 p-3 rounded-lg text-red-700 text-sm flex items-center">
                <AlertCircle className="mr-2" size={18} />
                {error}
              </div>
            )}
            
            {isFirstLogin ? (
              <>
                <div>
                  <label className="block text-[#280B04] mb-2 font-medium flex items-center">
                    <User className="mr-2" size={18} />
                    Nome de Usuário
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106]"
                    placeholder="Digite seu nome de usuário"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#280B04] mb-2 font-medium flex items-center">
                    <Lock className="mr-2" size={18} />
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106]"
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                </div>
                
                <div>
                  <label className="block text-[#280B04] mb-2 font-medium flex items-center">
                    <Lock className="mr-2" size={18} />
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106]"
                    placeholder="Confirme sua senha"
                    required
                    minLength={6}
                  />
                </div>
                
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-sm text-[#3D1106] hover:text-[#280B04] flex items-center"
                >
                  <RefreshCw className="mr-1" size={14} />
                  Gerar senha aleatória
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[#280B04] mb-2 font-medium flex items-center">
                    <User className="mr-2" size={18} />
                    Usuário
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106]"
                    placeholder="Digite seu usuário"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#280B04] mb-2 font-medium flex items-center">
                    <Lock className="mr-2" size={18} />
                    Senha
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106]"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
              </>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3D1106] hover:bg-[#280B04] text-[#FFB501] py-3 px-4 rounded-lg font-medium mt-6 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  {isFirstLogin ? 'Configurando...' : 'Entrando...'}
                </>
              ) : (
                <>
                  <Shield className="mr-2" size={18} />
                  {isFirstLogin ? 'Configurar Acesso' : 'Entrar'}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF1E8]">
      <header className="sticky top-0 z-40 bg-[#3D1106]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="focus:outline-none flex items-center"
              >
                <div className="h-10 w-10 bg-[#FFB501] rounded-full flex items-center justify-center">
                  <ChefHat className="text-[#3D1106]" size={20} />
                </div>
                <span className="ml-3 text-xl font-bold text-[#FFB501]">Painel Admin</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
                        <button
              onClick={() => {
                setShowPasswordChange(!showPasswordChange);
                try {
                  const credentials = JSON.parse(localStorage.getItem('adminCredentials') || '{}');
                  setNewUsername(credentials.username || '');
                } catch (e) {
                  setNewUsername('');
                }
              }}
              className="flex items-center text-[#FFB501] hover:text-[#FFE5BA] transition-colors p-2 rounded-lg text-sm"
            >
              <Edit className="mr-2" size={16} />
              <span>Alterar Credenciais</span>
            </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center text-[#FFB501] hover:text-[#FFE5BA] transition-colors p-2 rounded-lg"
              >
                <LogOut className="mr-2" size={18} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {showPasswordChange && (
        <div className="container mx-auto px-4 py-6 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#3D1106] mb-4 flex items-center">
              <Key className="mr-2" size={20} />
              Alterar Credenciais
            </h2>
            
            {error && (
              <div className="bg-red-50 p-3 rounded-lg text-red-700 text-sm flex items-center mb-4">
                <AlertCircle className="mr-2" size={18} />
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#280B04] mb-2 font-medium">
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106]"
                  placeholder="Digite o novo nome de usuário"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[#280B04] mb-2 font-medium">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106]"
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                />
              </div>
              
              <div>
                <label className="block text-[#280B04] mb-2 font-medium">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106]"
                  placeholder="Confirme a nova senha"
                  required
                  minLength={6}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-sm text-[#3D1106] hover:text-[#280B04] flex items-center"
                >
                  <RefreshCw className="mr-1" size={14} />
                  Gerar senha aleatória
                </button>
                
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordChange(false);
                      setError('');
                    }}
                    className="px-4 py-2 border border-[#3D1106] text-[#3D1106] rounded-lg hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    disabled={!newUsername || !newPassword || newPassword !== confirmPassword}
                    className="px-4 py-2 bg-[#3D1106] text-[#FFB501] rounded-lg hover:bg-[#280B04] disabled:opacity-50"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdminPanel 
        orders={orders} 
        onPrintOrder={handlePrintOrder}
        onMarkAsDone={handleMarkAsDone}
      />
    </div>
  );
};

export default AdminPage;