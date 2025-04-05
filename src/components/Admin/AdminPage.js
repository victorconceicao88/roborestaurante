import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, update } from "firebase/database";
import { database } from '../../firebaseConfig';
import AdminPanel from './AdminPanel';
import {
  LogOut, ChefHat, Loader2,
  Shield, Lock, User, AlertCircle,
  Key, RefreshCw, Edit, HelpCircle
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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [useMasterPassword, setUseMasterPassword] = useState(false);
  const navigate = useNavigate();


  // Conexão em tempo real com o Firebase
  useEffect(() => {
    if (isAuthenticated) {
      const ordersRef = ref(database, 'orders');
      
      const unsubscribe = onValue(ordersRef, (snapshot) => {
        const data = snapshot.val();
        const loadedOrders = data ? Object.values(data) : [];
        
        // Processar os pedidos para garantir que selectedOptions seja um objeto
        const processedOrders = loadedOrders.map(order => ({
          ...order,
          cart: order.cart.map(item => ({
            ...item,
            selectedOptions: item.selectedOptions ? 
              (typeof item.selectedOptions === 'string' ? 
                JSON.parse(item.selectedOptions) : 
                item.selectedOptions) : 
              null
          }))
        }));

        setOrders(processedOrders);
      });

      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  // Verificação inicial de autenticação e credenciais
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    const savedCredentials = localStorage.getItem('adminCredentials');
    const savedMasterPassword = localStorage.getItem('adminMasterPassword');

    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }

    if (!savedCredentials) {
      setIsFirstLogin(true);
    } else {
      try {
        const credentials = JSON.parse(savedCredentials);
        setUsername(credentials.username);
      } catch (e) {
        console.error("Erro ao analisar credenciais:", e);
      }
    }

    if (savedMasterPassword) {
      setMasterPassword(savedMasterPassword);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      try {
        const savedCredentials = localStorage.getItem('adminCredentials');
        const savedMasterPassword = localStorage.getItem('adminMasterPassword');

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
          
          if (!masterPassword) {
            throw new Error('Por favor, defina uma senha mestra para recuperação');
          }
          
          const credentials = {
            username: newUsername,
            password: newPassword
          };
          
          localStorage.setItem('adminCredentials', JSON.stringify(credentials));
          localStorage.setItem('adminMasterPassword', masterPassword);
          localStorage.setItem('adminAuth', 'true');
          setIsFirstLogin(false);
          setIsAuthenticated(true);
          setUsername(newUsername);
        } else if (useMasterPassword) {
          if (!savedMasterPassword) {
            throw new Error('Senha mestra não configurada');
          }
          
          if (password !== savedMasterPassword) {
            throw new Error('Senha mestra incorreta');
          }
          
          localStorage.setItem('adminAuth', 'true');
          setIsAuthenticated(true);
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
    setUseMasterPassword(false);
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

  const handleResetPassword = () => {
    if (!masterPassword) {
      setError('Por favor, digite a senha mestra');
      return;
    }

    const savedMasterPassword = localStorage.getItem('adminMasterPassword');
    if (masterPassword !== savedMasterPassword) {
      setError('Senha mestra incorreta');
      return;
    }

    // Reset to first login state
    localStorage.removeItem('adminCredentials');
    localStorage.removeItem('adminAuth');
    setIsFirstLogin(true);
    setShowForgotPassword(false);
    setMasterPassword('');
    setNewUsername('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    alert('Você pode agora definir novas credenciais de acesso');
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
            @media (max-width: 480px) {
              .header h1 { font-size: 18px; }
              .order-number { font-size: 14px; }
              .info-grid { grid-template-columns: 80px 1fr; font-size: 12px; }
              .items-table { font-size: 11px; }
              .items-table th, .items-table td { padding: 4px 6px; }
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
    return new Promise((resolve, reject) => {
      const orderRef = ref(database, `orders/${orderNumber}`);
      
      update(orderRef, { status: 'done' })
        .then(() => resolve())
        .catch((error) => {
          console.error("Erro ao atualizar pedido:", error);
          reject(error);
        });
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF1E8] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <div className="mx-auto bg-[#3D1106] text-[#FFB501] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <ChefHat size={28} className="sm:size-[32px]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#280B04]">
              {isFirstLogin ? 'Configuração Inicial' : showForgotPassword ? 'Redefinir Senha' : 'Acesso Administrativo'}
            </h1>
            <p className="text-[#6B7280] mt-1 sm:mt-2 text-sm sm:text-base">
              {isFirstLogin ? 'Defina suas credenciais de acesso' : 
               showForgotPassword ? 'Use a senha mestra para redefinir' : 'Entre com suas credenciais'}
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            {error && (
              <div className="bg-red-50 p-2 sm:p-3 rounded-lg text-red-700 text-xs sm:text-sm flex items-center">
                <AlertCircle className="mr-2 size-4 sm:size-[18px]" />
                {error}
              </div>
            )}
            
            {isFirstLogin ? (
              <>
                <div>
                  <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium flex items-center text-sm sm:text-base">
                    <User className="mr-2 size-4 sm:size-[18px]" />
                    Nome de Usuário
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                    placeholder="Digite seu nome de usuário"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium flex items-center text-sm sm:text-base">
                    <Lock className="mr-2 size-4 sm:size-[18px]" />
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                </div>
                
                <div>
                  <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium flex items-center text-sm sm:text-base">
                    <Lock className="mr-2 size-4 sm:size-[18px]" />
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                    placeholder="Confirme sua senha"
                    required
                    minLength={6}
                  />
                </div>
                
                <div>
                  <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium flex items-center text-sm sm:text-base">
                    <Key className="mr-2 size-4 sm:size-[18px]" />
                    Senha Mestra (para recuperação)
                  </label>
                  <input
                    type="password"
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                    placeholder="Defina uma senha mestra"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Esta senha será usada para redefinir suas credenciais caso você esqueça.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-xs sm:text-sm text-[#3D1106] hover:text-[#280B04] flex items-center"
                >
                  <RefreshCw className="mr-1 size-3 sm:size-[14px]" />
                  Gerar senha aleatória
                </button>
              </>
            ) : showForgotPassword ? (
              <>
                <div>
                  <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium flex items-center text-sm sm:text-base">
                    <Key className="mr-2 size-4 sm:size-[18px]" />
                    Senha Mestra
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                    placeholder="Digite a senha mestra"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Digite a senha mestra definida durante a configuração inicial.
                  </p>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setError('');
                    }}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 border border-[#3D1106] text-[#3D1106] rounded-lg hover:bg-gray-100 text-sm sm:text-base flex-1"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={!password}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#3D1106] text-[#FFB501] rounded-lg hover:bg-[#280B04] disabled:opacity-50 text-sm sm:text-base flex-1"
                  >
                    Redefinir Credenciais
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium flex items-center text-sm sm:text-base">
                    <User className="mr-2 size-4 sm:size-[18px]" />
                    Usuário
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                    placeholder="Digite seu usuário"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium flex items-center text-sm sm:text-base">
                    <Lock className="mr-2 size-4 sm:size-[18px]" />
                    Senha
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
                
                <div className="flex justify-between items-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUseMasterPassword(!useMasterPassword);
                      setPassword('');
                    }}
                    className="text-xs sm:text-sm text-[#3D1106] hover:text-[#280B04] flex items-center"
                  >
                    <HelpCircle className="mr-1 size-3 sm:size-[14px]" />
                    {useMasterPassword ? 'Usar senha normal' : 'Usar senha mestra'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setError('');
                    }}
                    className="text-xs sm:text-sm text-[#3D1106] hover:text-[#280B04]"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              </>
            )}
            
            {!showForgotPassword && (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3D1106] hover:bg-[#280B04] text-[#FFB501] py-2 sm:py-3 px-4 rounded-lg font-medium mt-4 sm:mt-6 flex items-center justify-center text-sm sm:text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 size-4 sm:size-[18px]" />
                    {isFirstLogin ? 'Configurando...' : 'Entrando...'}
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 size-4 sm:size-[18px]" />
                    {isFirstLogin ? 'Configurar Acesso' : 'Entrar'}
                  </>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF1E8]">
      <header className="sticky top-0 z-40 bg-[#3D1106]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="focus:outline-none flex items-center"
              >
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-[#FFB501] rounded-full flex items-center justify-center">
                  <ChefHat className="text-[#3D1106] size-4 sm:size-5" />
                </div>
                <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-[#FFB501]">Cozinha da Vivi</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
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
                className="flex items-center text-[#FFB501] hover:text-[#FFE5BA] transition-colors p-1 sm:p-2 rounded-lg text-xs sm:text-sm"
              >
                <Edit className="mr-1 sm:mr-2 size-3 sm:size-4" />
                <span className="hidden xs:inline">Alterar Credenciais</span>
              </button>
              
              
              <button 
                onClick={handleLogout}
                className="flex items-center text-[#FFB501] hover:text-[#FFE5BA] transition-colors p-1 sm:p-2 rounded-lg text-xs sm:text-sm"
              >
                <LogOut className="mr-1 sm:mr-2 size-3 sm:size-4" />
                <span className="hidden xs:inline">Sair</span>
              </button>
               
            </div>
          </div>
        </div>
      </header>

      {showPasswordChange && (
        <div className="container mx-auto px-4 py-4 sm:py-6 max-w-md">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#3D1106] mb-3 sm:mb-4 flex items-center">
              <Key className="mr-2 size-4 sm:size-5" />
              Alterar Credenciais
            </h2>
            
            {error && (
              <div className="bg-red-50 p-2 sm:p-3 rounded-lg text-red-700 text-xs sm:text-sm flex items-center mb-3 sm:mb-4">
                <AlertCircle className="mr-2 size-3 sm:size-4" />
                {error}
              </div>
            )}
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                  placeholder="Digite o novo nome de usuário"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
                />
              </div>
              
              <div>
                <label className="block text-[#280B04] mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] text-sm sm:text-base"
                  placeholder="Confirme a nova senha"
                  required
                  minLength={6}
                />
              </div>
              
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center space-y-3 xs:space-y-0">
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-xs sm:text-sm text-[#3D1106] hover:text-[#280B04] flex items-center"
                >
                  <RefreshCw className="mr-1 size-3 sm:size-[14px]" />
                  Gerar senha aleatória
                </button>
                
                <div className="flex space-x-2 w-full xs:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordChange(false);
                      setError('');
                    }}
                    className="px-3 sm:px-4 py-1 sm:py-2 border border-[#3D1106] text-[#3D1106] rounded-lg hover:bg-gray-100 text-sm sm:text-base flex-1 xs:flex-none"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handlePasswordChange}
                    disabled={!newUsername || !newPassword || newPassword !== confirmPassword}
                    className="px-3 sm:px-4 py-1 sm:py-2 bg-[#3D1106] text-[#FFB501] rounded-lg hover:bg-[#280B04] disabled:opacity-50 text-sm sm:text-base flex-1 xs:flex-none"
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