import { useState, useEffect } from 'react';
import { ref, onValue, update } from "firebase/database";
import { database } from '../../firebaseConfig'; // Importação corrigida
import {
  ShoppingCart, Check, Printer,
  CreditCard, Truck, Home, List,
  Calendar, Sun, Moon,
  ChevronUp, ChevronDown, CookingPot,
  Edit, MessageCircle, X, Save, Plus, Minus
} from 'lucide-react';


// ========== COMPONENTE ORDER ITEM ========== //
const OrderItem = ({ 
  order, 
  onPrint, 
  onMarkAsDone, 
  onSendToKitchen,
  onEdit,
  onSaveEdit,
  onWhatsApp,
  isEditing,
  editedOrder,
  setEditedOrder
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isMarkingDone, setIsMarkingDone] = useState(false);
  const [isSendingToKitchen, setIsSendingToKitchen] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    onPrint(order);
    setTimeout(() => setIsPrinting(false), 1000);
  };

  const handleMarkAsDone = async () => {
    setIsMarkingDone(true);
    await onMarkAsDone(order.orderNumber);
    setIsMarkingDone(false);
  };

  const handleSendToKitchen = () => {
    setIsSendingToKitchen(true);
    onSendToKitchen(order);
    setTimeout(() => setIsSendingToKitchen(false), 1000);
  };

  const handleWhatsApp = () => {
    onWhatsApp(order);
  };

  const total = order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0) + (order.entrega ? 4 : 0);

  const orderDate = new Date(order.timestamp);
  const formattedDate = orderDate.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedTime = orderDate.toLocaleTimeString('pt-PT', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleItemQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...editedOrder.cart];
    updatedCart[index].quantidade = newQuantity;
    setEditedOrder({...editedOrder, cart: updatedCart});
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...editedOrder.cart];
    updatedCart.splice(index, 1);
    setEditedOrder({...editedOrder, cart: updatedCart});
  };

  const handleFieldChange = (field, value) => {
    setEditedOrder({...editedOrder, [field]: value});
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-200 hover:shadow-md transition-shadow ${
      order.status === 'done' ? 'opacity-70 bg-gray-50' : ''
    }`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-1 sm:gap-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-800 truncate">Pedido #{order.orderNumber}</h3>
            {order.status === 'done' && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                Concluído
              </span>
            )}
            {order.status === 'pending' && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                Pendente
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
            {formattedDate} às {formattedTime} • {order.entrega ? 'Entrega' : 'Retirada'}
          </p>
          {isEditing ? (
            <div className="mt-1 sm:mt-2 space-y-1 sm:space-y-2">
              <input
                type="text"
                value={editedOrder.nome}
                onChange={(e) => handleFieldChange('nome', e.target.value)}
                className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                placeholder="Nome"
              />
              <input
                type="text"
                value={editedOrder.contato}
                onChange={(e) => handleFieldChange('contato', e.target.value)}
                className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                placeholder="Contato"
              />
              {editedOrder.entrega && (
                <input
                  type="text"
                  value={editedOrder.endereco}
                  onChange={(e) => handleFieldChange('endereco', e.target.value)}
                  className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                  placeholder="Endereço"
                />
              )}
              <textarea
                value={editedOrder.observacoes || ''}
                onChange={(e) => handleFieldChange('observacoes', e.target.value)}
                className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                placeholder="Observações"
                rows={2}
              />
            </div>
          ) : (
            <>
              <p className="text-xs sm:text-sm font-medium text-gray-700 mt-1 truncate">
                {order.nome} • {order.contato}
              </p>
              {order.observacoes && (
                <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                  Obs: {order.observacoes}
                </p>
              )}
            </>
          )}
          <p className="text-xs sm:text-sm font-bold text-green-600 mt-1">
            Total: €{total.toFixed(2)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-end items-center mt-2 sm:mt-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label={expanded ? "Recolher" : "Expandir"}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {isEditing ? (
            <>
              <button
                onClick={() => onSaveEdit(editedOrder)}
                className="p-1 sm:p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                title="Salvar"
                aria-label="Salvar"
              >
                <Save size={18} />
              </button>
              <button
                onClick={() => onEdit(null)}
                className="p-1 sm:p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                title="Cancelar"
                aria-label="Cancelar"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(order)}
                className="p-1 sm:p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                title="Editar"
                aria-label="Editar"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={handleWhatsApp}
                className="p-1 sm:p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                title="Enviar WhatsApp"
                aria-label="Enviar WhatsApp"
              >
                <MessageCircle size={18} />
              </button>
              {order.status !== 'done' && (
                <button
                  onClick={handleSendToKitchen}
                  disabled={isSendingToKitchen}
                  className={`p-1 sm:p-2 rounded-full transition-colors flex items-center ${
                    isSendingToKitchen ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  title="Enviar para Cozinha"
                  aria-label="Enviar para Cozinha"
                >
                  <CookingPot size={18} className="hidden sm:inline mr-1" />
                  <span className="text-xs hidden sm:inline">Cozinha</span>
                  <CookingPot size={18} className="sm:hidden" />
                </button>
              )}
              <button
                onClick={handlePrint}
                disabled={isPrinting}
                className={`p-1 sm:p-2 rounded-full transition-colors ${
                    isPrinting ? 'bg-gray-200 text-gray-500' : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
                title="Imprimir"
                aria-label="Imprimir"
              >
                <Printer size={18} />
              </button>
              {order.status !== 'done' && (
                <button
                  onClick={handleMarkAsDone}
                  disabled={isMarkingDone}
                  className={`p-1 sm:p-2 rounded-full transition-colors ${
                    isMarkingDone ? 'bg-gray-200 text-gray-500' : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                  title="Concluir pedido"
                  aria-label="Concluir pedido"
                >
                  <Check size={18} />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {expanded && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
          <div className="mb-3 sm:mb-4">
            <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-1 sm:mb-2">Informações do Cliente</h4>
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      value={editedOrder.nome}
                      onChange={(e) => handleFieldChange('nome', e.target.value)}
                      className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Contato</label>
                    <input
                      type="text"
                      value={editedOrder.contato}
                      onChange={(e) => handleFieldChange('contato', e.target.value)}
                      className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select
                      value={editedOrder.entrega ? 'delivery' : 'pickup'}
                      onChange={(e) => handleFieldChange('entrega', e.target.value === 'delivery')}
                      className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                    >
                      <option value="delivery">Entrega</option>
                      <option value="pickup">Retirada</option>
                    </select>
                  </div>
                  {editedOrder.entrega && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Endereço</label>
                      <input
                        type="text"
                        value={editedOrder.endereco}
                        onChange={(e) => handleFieldChange('endereco', e.target.value)}
                        className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Método de Pagamento</label>
                  <select
                    value={editedOrder.metodoPagamento}
                    onChange={(e) => handleFieldChange('metodoPagamento', e.target.value)}
                    className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                  >
                    <option value="dinheiro">Dinheiro</option>
                    <option value="cartao">Cartão</option>
                    <option value="mbway">MBWay</option>
                    <option value="multibanco">Multibanco</option>
                  </select>
                  {editedOrder.metodoPagamento === 'mbway' && (
                    <div className="mt-1 sm:mt-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Telefone MBWay</label>
                      <input
                        type="text"
                        value={editedOrder.mbwayPhone || ''}
                        onChange={(e) => handleFieldChange('mbwayPhone', e.target.value)}
                        className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Observações</label>
                  <textarea
                    value={editedOrder.observacoes || ''}
                    onChange={(e) => handleFieldChange('observacoes', e.target.value)}
                    className="w-full p-1 sm:p-2 text-sm border border-gray-300 rounded"
                    rows={3}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm"><span className="font-medium">Nome:</span> {order.nome}</p>
                  <p className="text-xs sm:text-sm"><span className="font-medium">Contato:</span> {order.contato}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm"><span className="font-medium">Tipo:</span> {order.entrega ? 'Entrega' : 'Retirada'}</p>
                  {order.entrega && (
                    <p className="text-xs sm:text-sm"><span className="font-medium">Endereço:</span> {order.endereco}</p>
                  )}
                </div>
              </div>
            )}
            <p className="text-xs sm:text-sm mt-1 sm:mt-2">
              <span className="font-medium">Pagamento:</span> {order.metodoPagamento === 'mbway' ? `MBWay (${order.mbwayPhone})` : 
                order.metodoPagamento === 'cartao' ? 'Cartão' : 
                order.metodoPagamento === 'multibanco' ? 'Multibanco' : 'Dinheiro'}
            </p>
            {order.observacoes && !isEditing && (
              <div className="mt-1 sm:mt-2 bg-yellow-50 p-2 rounded-lg">
                <p className="text-xs sm:text-sm">
                  <span className="font-medium">Observações:</span> {order.observacoes}
                </p>
              </div>
            )}
          </div>

          <h4 className="font-medium text-sm sm:text-base text-gray-800 mb-1 sm:mb-2">Itens do Pedido</h4>
          <div className="space-y-2 sm:space-y-3">
            {isEditing ? (
              editedOrder.cart.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between border-b border-gray-200 pb-2 sm:pb-3 gap-1 sm:gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 mb-0 sm:mb-1">
                      <button 
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remover item"
                      >
                        <X size={14} />
                      </button>
                      <p className="font-medium text-sm sm:text-base truncate">{item.nome}</p>
                    </div>
                    {item.selectedOptions && (
                      <div className="text-xs text-gray-500 ml-5 sm:ml-6">
                        {item.selectedOptions.carnes?.length > 0 && (
                          <p><span className="font-medium">Carnes:</span> {item.selectedOptions.carnes.join(", ")}</p>
                        )}
                        {item.selectedOptions.acompanhamentos?.length > 0 && (
                          <p><span className="font-medium">Acomp:</span> {item.selectedOptions.acompanhamentos.join(", ")}</p>
                        )}
                        {item.selectedOptions.salada && (
                          <p><span className="font-medium">Salada:</span> {item.selectedOptions.salada}</p>
                        )}
                        {item.selectedOptions.bebida && (
                          <p><span className="font-medium">Bebida:</span> {item.selectedOptions.bebida}</p>
                        )}
                        {item.selectedOptions.toppings?.length > 0 && (
                          <p><span className="font-medium">Toppings:</span> {item.selectedOptions.toppings.join(", ")}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-0">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button 
                        onClick={() => handleItemQuantityChange(index, item.quantidade - 1)}
                        className="px-1 sm:px-2 py-0.5 sm:py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Reduzir quantidade"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-1 sm:px-2 text-sm">{item.quantidade}</span>
                      <button 
                        onClick={() => handleItemQuantityChange(index, item.quantidade + 1)}
                        className="px-1 sm:px-2 py-0.5 sm:py-1 text-gray-600 hover:bg-gray-100"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-medium text-sm sm:text-base min-w-[70px] sm:min-w-[80px] text-right">
                      €{(item.precoFinal || item.preco * item.quantidade).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              order.cart.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between border-b border-gray-200 pb-1 sm:pb-2 gap-1 sm:gap-2">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium">{item.quantidade}x {item.nome}</p>
                    {item.selectedOptions && (
                      <div className="text-xs text-gray-500">
                        {item.selectedOptions.carnes?.length > 0 && (
                          <p><span className="font-medium">Carnes:</span> {item.selectedOptions.carnes.join(", ")}</p>
                        )}
                        {item.selectedOptions.acompanhamentos?.length > 0 && (
                          <p><span className="font-medium">Acomp:</span> {item.selectedOptions.acompanhamentos.join(", ")}</p>
                        )}
                        {item.selectedOptions.salada && (
                          <p><span className="font-medium">Salada:</span> {item.selectedOptions.salada}</p>
                        )}
                        {item.selectedOptions.bebida && (
                          <p><span className="font-medium">Bebida:</span> {item.selectedOptions.bebida}</p>
                        )}
                        {item.selectedOptions.toppings?.length > 0 && (
                          <p><span className="font-medium">Toppings:</span> {item.selectedOptions.toppings.join(", ")}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium sm:text-right">
                    €{(item.precoFinal || item.preco * item.quantidade).toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Subtotal:</span>
              <span>€{order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0).toFixed(2)}</span>
            </div>
            {order.entrega && (
              <div className="flex justify-between text-sm">
                <span className="font-medium">Taxa de Entrega:</span>
                <span>€4.00</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base sm:text-lg mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ========== COMPONENTE DAY TAB ========== //
const DayTab = ({ date, orders, onPrintOrder, isActive, onClick }) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const orderDate = new Date(date);
  const formattedDate = orderDate.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit'
  });
  
  const isToday = orderDate.toDateString() === today.toDateString();
  const isYesterday = orderDate.toDateString() === yesterday.toDateString();
  
  const dayLabel = isToday ? 'Hoje' : isYesterday ? 'Ontem' : formattedDate;
  
  const totalRevenue = orders.reduce((sum, order) => {
    const orderTotal = order.cart.reduce((orderSum, item) => 
      orderSum + (item.precoFinal || item.preco) * item.quantidade, 0) + (order.entrega ? 4 : 0);
    return sum + orderTotal;
  }, 0);
  
  const pendingOrders = orders.filter(order => order.status !== 'done').length;
  
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start p-2 sm:p-3 rounded-lg transition-colors ${
        isActive ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
      aria-label={`Pedidos de ${dayLabel}`}
    >
      <div className="flex items-center">
        {isToday ? <Sun size={14} className="mr-1 sm:mr-2" /> : 
         isYesterday ? <Moon size={14} className="mr-1 sm:mr-2" /> : 
         <Calendar size={14} className="mr-1 sm:mr-2" />}
        <span className="font-medium text-sm sm:text-base">{dayLabel}</span>
      </div>
      <div className="flex justify-between w-full mt-0.5 sm:mt-1">
        <span className="text-xs sm:text-sm">{orders.length} pedido{orders.length !== 1 ? 's' : ''}</span>
        {pendingOrders > 0 && (
          <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">
            {pendingOrders}
          </span>
        )}
      </div>
      <div className="w-full mt-1 sm:mt-2 text-right">
        <span className="text-xs sm:text-sm font-bold">€{totalRevenue.toFixed(2)}</span>
      </div>
    </button>
  );
};

// ========== COMPONENTE ADMIN DASHBOARD ========== //
const AdminDashboard = ({ orders = [], onPrintOrder, onMarkAsDone, onUpdateOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeDay, setActiveDay] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    deliveryCount: 0,
    pickupCount: 0
  });
  const [editingOrder, setEditingOrder] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);

  // Agrupar pedidos por dia
  const ordersByDay = orders.reduce((acc, order) => {
    const orderDate = new Date(order.timestamp);
    const dateKey = new Date(
      orderDate.getFullYear(), 
      orderDate.getMonth(), 
      orderDate.getDate()
    ).toISOString();
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(order);
    return acc;
  }, {});

  // Ordenar dias do mais recente para o mais antigo
  const sortedDays = Object.keys(ordersByDay).sort((a, b) => new Date(b) - new Date(a));

  // Definir o dia ativo como o mais recente se ainda não estiver definido
  useEffect(() => {
    if (sortedDays.length > 0 && !activeDay) {
      setActiveDay(sortedDays[0]);
    }
  }, [sortedDays, activeDay]);

  // Atualizar estatísticas
  useEffect(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => {
      const orderTotal = order.cart.reduce((orderSum, item) => 
        orderSum + (item.precoFinal || item.preco) * item.quantidade, 0) + (order.entrega ? 4 : 0);
      return sum + orderTotal;
    }, 0);
    
    const deliveryCount = orders.filter(order => order.entrega).length;
    const pickupCount = orders.filter(order => !order.entrega).length;
    
    setStats({
      totalOrders,
      totalRevenue,
      deliveryCount,
      pickupCount
    });
  }, [orders]);

  // Filtrar pedidos do dia ativo
  const filteredOrders = ordersByDay[activeDay]?.filter(order => {
    const matchesSearch = order.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.orderNumber.toString().includes(searchTerm) ||
                         order.contato.includes(searchTerm);
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'delivery' && order.entrega) || 
                         (filter === 'pickup' && !order.entrega) ||
                         (filter === 'pending' && order.status !== 'done') ||
                         (filter === 'done' && order.status === 'done');
    
    return matchesSearch && matchesFilter;
  }) || [];

  // Calcular faturamento total do dia ativo
  const dailyRevenue = ordersByDay[activeDay]?.reduce((sum, order) => {
    const orderTotal = order.cart.reduce((orderSum, item) => 
      orderSum + (item.precoFinal || item.preco) * item.quantidade, 0) + (order.entrega ? 4 : 0);
    return sum + orderTotal;
  }, 0) || 0;

  const handlePrint = (order, options = {}) => {
    const printContent = generatePrintContent(order, options.isKitchenPrint);
    
    // Cria um iframe invisível
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    
    iframe.srcdoc = printContent;
    document.body.appendChild(iframe);
    
    // Espera o iframe carregar
    iframe.onload = () => {
      setTimeout(() => {
        // Foca no iframe e imprime
        iframe.focus();
        iframe.contentWindow.print();
        
        // Remove o iframe após um tempo
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    };
  };

  // Função para gerar o conteúdo de impressão otimizado para impressora térmica de 58mm
  const generatePrintContent = (order, isKitchenPrint = false) => {
    const orderDate = new Date(order.timestamp);
    const formattedDate = orderDate.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const itemsContent = order.cart.map(item => `
      <div style="margin-bottom: 8px; font-size: 14px;">
        <div style="font-weight: bold;">${item.quantidade}x ${item.nome}</div>
        ${item.selectedOptions ? `
          <div style="font-size: 12px; margin-left: 4px;">
            ${item.selectedOptions.carnes?.length > 0 ? `<div><strong>Carne:</strong> ${item.selectedOptions.carnes.join(", ")}</div>` : ''}
            ${item.selectedOptions.acompanhamentos?.length > 0 ? `<div><strong>Acomp:</strong> ${item.selectedOptions.acompanhamentos.join(", ")}</div>` : ''}
            ${item.selectedOptions.salada ? `<div><strong>Salada:</strong> ${item.selectedOptions.salada}</div>` : ''}
            ${item.selectedOptions.bebida ? `<div><strong>Bebida:</strong> ${item.selectedOptions.bebida}</div>` : ''}
            ${item.selectedOptions.toppings?.length > 0 ? `<div><strong>Toppings:</strong> ${item.selectedOptions.toppings.join(", ")}</div>` : ''}
          </div>
        ` : ''}
      </div>
    `).join('');
    
    const total = order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0) + (order.entrega ? 4 : 0);
    
    if (isKitchenPrint) {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Pedido #${order.orderNumber}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 5px;
              width: 58mm;
              font-size: 12px;
            }
            .header { 
              text-align: center; 
              margin-bottom: 5px;
              border-bottom: 1px dashed #000;
              padding-bottom: 5px;
            }
            .restaurant-name {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 3px;
            }
            .order-number { 
              font-size: 14px; 
              font-weight: bold; 
              margin-bottom: 3px; 
            }
            .order-info { 
              margin-bottom: 5px;
              font-size: 12px;
            }
            .items { 
              margin-bottom: 10px;
            }
            .item-name {
              font-weight: bold;
            }
            .item-options {
              margin-left: 5px;
              font-size: 11px;
            }
            .observations {
              margin-top: 5px;
              padding: 3px;
              background: #f0f0f0;
              border-radius: 2px;
              font-size: 11px;
            }
            .footer { 
              margin-top: 10px; 
              font-size: 10px; 
              text-align: center;
              border-top: 1px dashed #000;
              padding-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="restaurant-name">COZINHA DA VIVI</div>
            <div class="order-number">COZINHA - PEDIDO #${order.orderNumber}</div>
            <div class="order-info">${formattedDate}</div>
            <div class="order-info">${order.entrega ? 'ENTREGA' : 'RETIRADA'}</div>
          </div>
          
          <div class="items">
            ${itemsContent}
          </div>
          
          ${order.observacoes ? `
          <div class="observations">
            <strong>OBS:</strong> ${order.observacoes}
          </div>
          ` : ''}
          
          <div class="footer">
            Impresso em ${new Date().toLocaleString('pt-PT')}
          </div>
        </body>
        </html>
      `;
    } else {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Pedido #${order.orderNumber}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 5px;
              width: 58mm;
              font-size: 12px;
            }
            .header { 
              text-align: center; 
              margin-bottom: 5px;
              border-bottom: 1px dashed #000;
              padding-bottom: 5px;
            }
            .restaurant-name {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 3px;
            }
            .order-number { 
              font-size: 14px; 
              font-weight: bold; 
              margin-bottom: 3px; 
            }
            .order-info { 
              margin-bottom: 5px;
              font-size: 12px;
            }
            .customer-info { 
              margin-bottom: 8px;
              border-bottom: 1px dashed #000;
              padding-bottom: 5px;
            }
            .items { 
              margin-bottom: 10px;
            }
            .item-name {
              font-weight: bold;
            }
            .item-options {
              margin-left: 5px;
              font-size: 11px;
            }
            .totals { 
              border-top: 1px dashed #000; 
              padding-top: 5px; 
              margin-top: 5px; 
            }
            .total-row { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 3px;
              font-size: 12px;
            }
            .grand-total { 
              font-weight: bold; 
              font-size: 14px; 
            }
            .observations {
              margin-top: 5px;
              padding: 3px;
              background: #f0f0f0;
              border-radius: 2px;
              font-size: 11px;
            }
            .footer { 
              margin-top: 10px; 
              font-size: 10px; 
              text-align: center;
              border-top: 1px dashed #000;
              padding-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="restaurant-name">NOME DO RESTAURANTE</div>
            <div class="order-number">PEDIDO #${order.orderNumber}</div>
            <div class="order-info">${formattedDate}</div>
            <div class="order-info">${order.entrega ? 'ENTREGA' : 'RETIRADA'}</div>
          </div>
          
          <div class="customer-info">
            <div><strong>Cliente:</strong> ${order.nome}</div>
            <div><strong>Contato:</strong> ${order.contato}</div>
            ${order.entrega ? `<div><strong>Endereço:</strong> ${order.endereco}</div>` : ''}
            <div><strong>Pagamento:</strong> ${order.metodoPagamento === 'mbway' ? `MBWay (${order.mbwayPhone})` : 
              order.metodoPagamento === 'cartao' ? 'Cartão' : 
              order.metodoPagamento === 'multibanco' ? 'Multibanco' : 'Dinheiro'}</div>
          </div>
          
          <div class="items">
            <div style="font-weight: bold; margin-bottom: 5px;">ITENS:</div>
            ${itemsContent}
          </div>
          
          ${order.observacoes ? `
          <div class="observations">
            <strong>OBS:</strong> ${order.observacoes}
          </div>
          ` : ''}
          
          <div class="totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>€${order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0).toFixed(2)}</span>
            </div>
            ${order.entrega ? `
            <div class="total-row">
              <span>Taxa Entrega:</span>
              <span>€4.00</span>
            </div>
            ` : ''}
            <div class="total-row grand-total">
              <span>TOTAL:</span>
              <span>€${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="footer">
            Obrigado pela preferência!
          </div>
        </body>
        </html>
      `;
    }
  };

  // Função para enviar pedido para a cozinha (impressão direta)
  const handleSendToKitchen = (order) => {
    handlePrint(order, { isKitchenPrint: true });
  };

  // Função para iniciar edição de pedido
  const handleEditOrder = (order) => {
    if (order === null) {
      setEditingOrder(null);
      setEditedOrder(null);
    } else {
      setEditingOrder(order.orderNumber);
      setEditedOrder(JSON.parse(JSON.stringify(order))); // Deep clone
    }
  };

  // Função para salvar edição de pedido
  const handleSaveEdit = (updatedOrder) => {
    if (typeof onUpdateOrder === 'function') {
      onUpdateOrder(updatedOrder);
    } else {
      console.warn('Função onUpdateOrder não fornecida - as alterações não serão salvas');
    }
    setEditingOrder(null);
    setEditedOrder(null);
  };

  // Função para enviar mensagem pelo WhatsApp
  const handleWhatsApp = (order) => {
              const message = `Olá ${order.nome}, Tudo bem? 😊 

              📦 O seu pedido #${order.orderNumber} já está pronto e será enviado em breve!  
              
              🛒 Você pediu:
              ${order.cart.map(item => `- ${item.quantidade}x ${item.nome}`).join('\n')}
              
              💰 Total: €${order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0).toFixed(2)}
              
              🚚 Status: ${order.status === 'done' ? 'Em processo de Envio' : 'Em preparação'}
              
              🍽️ Obrigado por escolher a Cozinha da Vivi!`;
    
   
    const phone = order.contato.replace(/[^\d]/g, ''); // Remove não-numéricos
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Gerenciador de Pedidos</h1>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="bg-white rounded-lg shadow p-2 sm:p-3 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Total Pedidos</p>
              <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
            </div>
            <div className="bg-blue-100 p-1 sm:p-2 rounded-full">
              <ShoppingCart className="text-blue-600" size={14} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-2 sm:p-3 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Faturamento Total</p>
              <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-800">€{stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-green-100 p-1 sm:p-2 rounded-full">
              <CreditCard className="text-green-600" size={14} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-2 sm:p-3 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Entregas</p>
              <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-800">{stats.deliveryCount}</p>
            </div>
            <div className="bg-purple-100 p-1 sm:p-2 rounded-full">
              <Truck className="text-purple-600" size={14} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-2 sm:p-3 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Retiradas</p>
              <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-800">{stats.pickupCount}</p>
            </div>
            <div className="bg-orange-100 p-1 sm:p-2 rounded-full">
              <Home className="text-orange-600" size={14} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg sm:rounded-xl shadow p-3 sm:p-4 md:p-6 mb-6 sm:mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          <div>
            <label className="block text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base font-medium">Buscar Pedidos</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, número ou contato..."
              className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base font-medium">Filtrar por</label>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg ${
                  filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('delivery')}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg ${
                  filter === 'delivery' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                Entrega
              </button>
              <button
                onClick={() => setFilter('pickup')}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg ${
                  filter === 'pickup' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                Retirada
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg ${
                  filter === 'pending' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                Pendentes
              </button>
              <button
                onClick={() => setFilter('done')}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg ${
                  filter === 'done' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                Concluídos
              </button>
            </div>
          </div>
        </div>
        
        {/* Abas de dias */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Pedidos por Dia</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 md:gap-3">
            {sortedDays.map((day) => (
              <DayTab
                key={day}
                date={day}
                orders={ordersByDay[day]}
                isActive={day === activeDay}
                onClick={() => setActiveDay(day)}
              />
            ))}
          </div>
        </div>
        
        {/* Resumo do dia */}
        <div className="bg-gray-50 p-2 sm:p-3 md:p-4 rounded-lg border border-gray-300 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
              {activeDay ? new Date(activeDay).toLocaleDateString('pt-PT', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              }) : 'Selecione um dia'}
            </h2>
            <div className="text-sm sm:text-base md:text-lg font-bold text-green-600">
              Total do dia: €{dailyRevenue.toFixed(2)}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 mt-1 sm:mt-2">
            <div className="text-xs sm:text-sm">
              <span className="font-medium">Pedidos:</span> {ordersByDay[activeDay]?.length || 0}
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-medium">Entregas:</span> {ordersByDay[activeDay]?.filter(o => o.entrega).length || 0}
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-medium">Retiradas:</span> {ordersByDay[activeDay]?.filter(o => !o.entrega).length || 0}
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-medium">Pendentes:</span> {ordersByDay[activeDay]?.filter(o => o.status !== 'done').length || 0}
            </div>
          </div>
        </div>
        
        {/* Lista de pedidos */}
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'Pedido' : 'Pedidos'} Encontrados
          </h2>
        </div>
        
        {filteredOrders.length === 0 ? (
          <div className="text-center py-6 sm:py-8 md:py-12">
            <List size={28} className="mx-auto text-gray-400 mb-2 sm:mb-3" />
            <p className="text-gray-800 text-sm sm:text-base">Nenhum pedido encontrado</p>
            <p className="text-gray-800 text-xs sm:text-sm mt-1">Tente ajustar seus filtros de busca</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {filteredOrders
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((order) => (
                <OrderItem 
                  key={order.orderNumber} 
                  order={order} 
                  onPrint={handlePrint}
                  onMarkAsDone={onMarkAsDone}
                  onSendToKitchen={handleSendToKitchen}
                  onEdit={handleEditOrder}
                  onSaveEdit={handleSaveEdit}
                  onWhatsApp={handleWhatsApp}
                  isEditing={editingOrder === order.orderNumber}
                  editedOrder={editedOrder}
                  setEditedOrder={setEditedOrder}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;