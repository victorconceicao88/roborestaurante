import { useState, useEffect } from 'react';
import {
  Trash, Plus, Minus, ChevronDown, ChevronUp,
  ShoppingCart, X, Check, MapPin, Phone, User,
  CreditCard, Clock, Info, Smartphone, Loader2, 
  Instagram, Facebook, Calendar, AlertCircle
} from 'lucide-react';

// ========== DADOS DA EMENTA ========== //
const ementa = [
  {
    id: 1,
    nome: "Churrascos Premium",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop",
    itens: [
      {
        id: 101,
        nome: "Combo Churrasco",
        preco: 12.0,
        imagem: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop",
        descricao: "Refeição completa com carnes e acompanhamentos selecionados",
        tipo: "churrasco",
        opcoes: {
          carnes: [
            { id: "c1", nome: "Só Maminha (Premium)", precoExtra: 1.0, soMaminha: true },
            { id: "c2", nome: "Coração de Frango", precoExtra: 0 },
            { id: "c3", nome: "Costelinha Suína", precoExtra: 0 },
            { id: "c4", nome: "Linguiça", precoExtra: 0 },
            { id: "c5", nome: "Filé de Frango", precoExtra: 0 }
          ],
          acompanhamentos: [
            { id: "a1", nome: "Arroz Branco" },
            { id: "a2", nome: "Feijão Tropeiro" },
            { id: "a3", nome: "Farofa Crocante" }
          ],
          saladas: [
            { id: "s1", nome: "Salada Mista" },
            { id: "s2", nome: "Vinagrete" }
          ],
          bebidas: [
            { id: "b1", nome: "Coca-Cola", precoExtra: 2.0, imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop" },
            { id: "b2", nome: "Fanta", precoExtra: 2.0, imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop" },
            { id: "b3", nome: "Guaraná", precoExtra: 2.0, imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop" },
            { id: "b4", nome: "Ice Tea", precoExtra: 2.0, imagem: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop" }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    nome: "Sanduíches",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
    itens: [
      { 
        id: 201, 
        nome: "X-Bacon", 
        preco: 8.0, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão, hambúrguer, bacon, queijo, fiambre, ovo, alface, tomate, milho e batata palha." 
      },
      { 
        id: 202, 
        nome: "X-Special", 
        preco: 7.0, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão, hambúrguer, queijo, fiambre, ovo, alface, tomate, milho e batata palha." 
      },
      { 
        id: 203, 
        nome: "X-Frango", 
        preco: 8.0, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão, filé de frango, queijo, fiambre, ovo, alface, tomate, milho e batata palha." 
      },
      { 
        id: 204, 
        nome: "X-Frango Tudo", 
        preco: 9.0, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão, filé de frango, bacon, salsicha, queijo, fiambre, ovo, alface, tomate, milho e batata palha." 
      },
      { 
        id: 205, 
        nome: "X-Simples", 
        preco: 6.5, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão, hambúrguer, queijo, fiambre, alface, tomate, milho e batata palha." 
      }
    ]
  },
  {
    id: 3,
    nome: "Combos Especiais",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop",
    itens: [
      { 
        id: 301, 
        nome: "Combo Frango Supreme", 
        preco: 10.0, 
        imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop",
        descricao: "Sanduíche de frango com batata frita e bebida",
        tipo: "combo",
        opcoes: {
          bebidas: [
            { id: "b1", nome: "Coca-Cola Lata", preco: 0, imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop" },
            { id: "b2", nome: "Fanta Lata", preco: 0, imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop" },
            { id: "b3", nome: "Guaraná Lata", preco: 0, imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop" },
            { id: "b4", nome: "Suco de Laranja", preco: 0, imagem: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=500&auto=format&fit=crop" }
          ]
        }
      },
      { 
        id: 302, 
        nome: "Combo X-Tudo", 
        preco: 12.0, 
        imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop",
        descricao: "Sanduíche completo com batata frita e bebida",
        tipo: "combo",
        opcoes: {
          bebidas: [
            { id: "b1", nome: "Coca-Cola Lata", preco: 0, imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop" },
            { id: "b2", nome: "Fanta Lata", preco: 0, imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop" },
            { id: "b3", nome: "Guaraná Lata", preco: 0, imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop" },
            { id: "b4", nome: "Suco de Laranja", preco: 0, imagem: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=500&auto=format&fit=crop" }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    nome: "Porções",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&auto=format&fit=crop",
    itens: [
      { 
        id: 401, 
        nome: "Arroz", 
        preco: 3.0, 
        imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop",
        descricao: "Porção de arroz branco" 
      },
      { 
        id: 402, 
        nome: "Coração de galinha", 
        preco: 6.0, 
        imagem: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format&fit=crop",
        descricao: "Porção de coração de frango grelhado" 
      },
      { 
        id: 403, 
        nome: "Costelinha de porco", 
        preco: 6.0, 
        imagem: "https://images.unsplash.com/photo-1606851094291-6efae152fa87?w=500&auto=format&fit=crop",
        descricao: "Porção de costelinha de porco assada" 
      },
      { 
        id: 404, 
        nome: "Feijão de caldo", 
        preco: 3.0, 
        imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop",
        descricao: "Porção de feijão com caldo" 
      },
      { 
        id: 405, 
        nome: "Feijão tropeiro", 
        preco: 5.0, 
        imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop",
        descricao: "Porção de feijão tropeiro com farofa e linguiça" 
      },
      { 
        id: 406, 
        nome: "Filé de frango", 
        preco: 6.0, 
        imagem: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format&fit=crop",
        descricao: "Porção de filé de frango grelhado" 
      },
      { 
        id: 407, 
        nome: "Linguiça", 
        preco: 6.0, 
        imagem: "https://images.unsplash.com/photo-1606851094291-6efae152fa87?w=500&auto=format&fit=crop",
        descricao: "Porção de linguiça assada" 
      },
      { 
        id: 408, 
        nome: "Maminha", 
        preco: 8.0, 
        imagem: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop",
        descricao: "Porção de maminha assada" 
      },
      { 
        id: 409, 
        nome: "Queijo coalho", 
        preco: 6.0, 
        imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop",
        descricao: "Porção de queijo coalho grelhado" 
      },
      { 
        id: 410, 
        nome: "Torresmo", 
        preco: 6.0, 
        imagem: "https://images.unsplash.com/photo-1606851094291-6efae152fa87?w=500&auto=format&fit=crop",
        descricao: "Porção de torresmo crocante" 
      }
    ]
  },
  {
    id: 5,
    nome: "Bebidas",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
    subcategorias: [
      {
        nome: "Águas",
        itens: [
          { 
            id: 5011, 
            nome: "Água com gás Castelo (pequena)", 
            preco: 1.5,
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Garrafa pequena de água mineral com gás" 
          },
          { 
            id: 5012, 
            nome: "Água com gás Pedras (pequena)", 
            preco: 1.5,
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Garrafa pequena de água mineral com gás" 
          },
          { 
            id: 5013, 
            nome: "Água sem gás 500ml", 
            preco: 1.0,
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Garrafa de água mineral sem gás" 
          }
        ]
      },
      {
        nome: "Refrigerantes",
        itens: [
          { 
            id: 5021, 
            nome: "7UP (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante 7UP" 
          },
          { 
            id: 5022, 
            nome: "Coca-Cola (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante Coca-Cola" 
          },
          { 
            id: 5023, 
            nome: "Coca-Cola Zero (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante Coca-Cola Zero" 
          },
          { 
            id: 5024, 
            nome: "Fanta Laranja (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante Fanta Laranja" 
          },
          { 
            id: 5025, 
            nome: "Guaraná (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante Guaraná" 
          },
          { 
            id: 5026, 
            nome: "Ice Tea de Manga (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop",
            descricao: "Lata de Ice Tea sabor manga" 
          }
        ]
      }
    ]
  },
  {
    id: 6,
    nome: "Sobremesas",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop",
    itens: [
      { 
        id: 601, 
        nome: "Açai na Tigela", 
        preco: 3.5, 
        imagem: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop",
        descricao: "Açai cremoso acompanhado com granola, banana, leite em pó e morango",
        opcoes: {
          toppings: [
            { id: "t1", nome: "Granola" },
            { id: "t2", nome: "Banana" },
            { id: "t3", nome: "Leite Ninho" },
            { id: "t4", nome: "Morango" }
          ]
        }
      },
      { 
        id: 602, 
        nome: "Pudim Caseiro", 
        preco: 3.0, 
        imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop",
        descricao: "Pudim tradicional caseiro com calda de caramelo" 
      }
    ]
  }
];

// ========== COMPONENTE NAVBAR ========== //
const Navbar = ({ cart, setIsCartOpen }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              <span className="text-green-600">Churrascaria</span> Gaúcha
            </h1>
          </div>
          
          {/* Cart Button - mostra em todas as páginas exceto confirmação */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-gray-900"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantidade, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

// ========== COMPONENTE DELIVERY PICKUP SELECTOR ========== //
const DeliveryPickupSelector = ({ 
  entrega, 
  setEntrega, 
  setEndereco 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo seu navegador");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data.address) {
            const { road, house_number, suburb, city, postcode } = data.address;
            const addressParts = [
              road,
              house_number ? `, ${house_number}` : '',
              suburb ? `, ${suburb}` : '',
              city ? `, ${city}` : '',
              postcode ? `, ${postcode}` : ''
            ].filter(Boolean).join('');
            
            setEndereco(addressParts);
          } else {
            setError("Não foi possível obter o endereço. Por favor, preencha manualmente.");
          }
        } catch (err) {
          setError("Erro ao obter endereço. Por favor, preencha manualmente.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Por favor, permita o acesso à localização ou preencha manualmente.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const handleDeliverySelection = (delivery) => {
    setEntrega(delivery);
    if (delivery) {
      getCurrentLocation();
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Tipo de Entrega</label>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => handleDeliverySelection(false)}
          className={`flex-1 py-3 px-4 rounded-md border-2 ${!entrega ? 
            'border-green-500 bg-green-50 text-green-700' : 
            'border-gray-300 text-gray-700'}`}
        >
          <div className="font-medium">Retirada no Local</div>
          <div className="text-sm mt-1">Sem custo adicional</div>
        </button>
        <button
          type="button"
          onClick={() => handleDeliverySelection(true)}
          className={`flex-1 py-3 px-4 rounded-md border-2 ${entrega ? 
            'border-green-500 bg-green-50 text-green-700' : 
            'border-gray-300 text-gray-700'}`}
        >
          <div className="font-medium">Entrega</div>
          <div className="text-sm mt-1">Taxa: €4.00</div>
        </button>
      </div>
      
      {loading && (
        <div className="mt-2 flex items-center text-gray-600">
          <Loader2 className="animate-spin mr-2" size={16} />
          <span>A obter a sua localização...</span>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
};

// ========== COMPONENTE MENU ITEM ========== //
const MenuItem = ({ item, onAdd }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    carnes: [],
    acompanhamentos: "",
    salada: "",
    bebida: "",
    toppings: []
  });
  const [addedToCart, setAddedToCart] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleOptionChange = (type, value) => {
    if (type === "carnes") {
      const carneSelecionada = item.opcoes?.carnes?.find(c => c.nome === value);
      
      // Se já está selecionada, desmarca
      if (selectedOptions.carnes.includes(value)) {
        setSelectedOptions({
          ...selectedOptions,
          carnes: selectedOptions.carnes.filter(c => c !== value)
        });
      } 
      // Se selecionar "Só Maminha", limpar outras seleções
      else if (carneSelecionada?.soMaminha) {
        setSelectedOptions({
          ...selectedOptions,
          carnes: [value]
        });
      } 
      // Se já tem "Só Maminha" selecionada, não permite outras seleções
      else if (selectedOptions.carnes.some(c => {
        const carne = item.opcoes?.carnes?.find(opt => opt.nome === c);
        return carne?.soMaminha;
      })) {
        return;
      }
      // Se já tem 2 carnes selecionadas e não está tentando desmarcar, não permite mais seleções
      else if (selectedOptions.carnes.length >= 2) {
        return;
      }
      // Seleção normal de carnes
      else {
        setSelectedOptions({
          ...selectedOptions,
          [type]: [...selectedOptions[type], value]
        });
      }
    } 
    else if (type === "toppings") {
      const newSelection = selectedOptions[type].includes(value)
        ? selectedOptions[type].filter(t => t !== value)
        : [...selectedOptions[type], value];
      
      setSelectedOptions({
        ...selectedOptions,
        [type]: newSelection
      });
    }
    else {
      setSelectedOptions({
        ...selectedOptions,
        [type]: value
      });
    }
    setValidationError("");
  };

  const validateSelections = () => {
    if (item.tipo === "churrasco") {
      const hasSoMaminha = selectedOptions.carnes.some(c => {
        const carne = item.opcoes?.carnes?.find(opt => opt.nome === c);
        return carne?.soMaminha;
      });
      
      if (!hasSoMaminha && selectedOptions.carnes.length !== 2) {
        setValidationError("Por favor, selecione exatamente 2 carnes ou a opção 'Só Maminha'");
        return false;
      }
      if (!selectedOptions.acompanhamentos) {
        setValidationError("Por favor, selecione 1 acompanhamento");
        return false;
      }
      if (!selectedOptions.salada) {
        setValidationError("Por favor, selecione 1 salada");
        return false;
      }
    } else if (item.tipo === "combo" && item.opcoes?.bebidas && !selectedOptions.bebida) {
      setValidationError("Por favor, selecione uma bebida");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelections()) return;

    const itemWithOptions = {
      ...item,
      selectedOptions: {...selectedOptions},
      precoFinal: item.preco + 
        selectedOptions.carnes.reduce((sum, c) => {
          const carne = item.opcoes?.carnes?.find(opt => opt.nome === c);
          return sum + (carne?.precoExtra || 0);
        }, 0) + 
        (selectedOptions.bebida ? 
          (item.opcoes?.bebidas?.find(b => b.nome === selectedOptions.bebida)?.precoExtra || 0) : 0)
    };
    
    onAdd(itemWithOptions);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    
    // Reset selections after adding to cart
    setSelectedOptions({
      carnes: [],
      acompanhamentos: "",
      salada: "",
      bebida: "",
      toppings: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.imagem} 
          alt={item.nome} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-800 mb-1">{item.nome}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.descricao}</p>
            <p className="text-green-600 font-bold text-lg">€{item.preco.toFixed(2)}</p>
          </div>
        </div>

        {(item.tipo === "churrasco" || (item.opcoes && (item.opcoes.toppings || item.opcoes.bebidas))) && (
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-green-600 text-sm font-medium mt-2 flex items-center"
          >
            {showDetails ? (
              <>
                <ChevronUp size={16} className="mr-1" /> Ocultar opções
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" /> Personalizar pedido
              </>
            )}
          </button>
        )}

{showDetails && (
  <div className="mt-3 pt-3 border-t border-gray-100">
    {item.opcoes && (
      <div className="mt-4 pt-4 border-t border-gray-100">
        {item.opcoes.carnes && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Carnes:</h4>
            <div className="grid grid-cols-2 gap-2">
              {item.opcoes.carnes.map((carne) => {
                const hasSoMaminha = selectedOptions.carnes.some(c => {
                  const cOpt = item.opcoes?.carnes?.find(opt => opt.nome === c);
                  return cOpt?.soMaminha;
                });
                
                const isDisabled = (
                  // Se já tem 2 carnes selecionadas e esta não está selecionada
                  (selectedOptions.carnes.length >= 2 && !selectedOptions.carnes.includes(carne.nome)) ||
                  // OU se já tem "Só Maminha" selecionada e esta não é "Só Maminha"
                  (hasSoMaminha && !carne.soMaminha)
                );

                return (
                  <label 
                    key={carne.id}
                    className={`flex items-center p-2 rounded border text-sm ${
                      selectedOptions.carnes.includes(carne.nome) ? 
                      'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedOptions.carnes.includes(carne.nome)}
                      onChange={() => handleOptionChange("carnes", carne.nome)}
                      className="mr-2"
                      disabled={isDisabled}
                    />
                    {carne.nome}
                    {carne.precoExtra > 0 && ` (+€${carne.precoExtra.toFixed(2)})`}
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {selectedOptions.carnes.some(c => {
                const carne = item.opcoes?.carnes?.find(opt => opt.nome === c);
                return carne?.soMaminha;
              }) ? (
                "Selecionou a opção 'Só Maminha'"
              ) : (
                "Selecione 2 carnes ou a opção 'Só Maminha'"
              )}
            </p>
          </div>
        )}

                {item.opcoes.acompanhamentos && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Acompanhamentos (selecione 1):</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {item.opcoes.acompanhamentos.map((acomp) => (
                        <label 
                          key={acomp.id}
                          className={`flex items-center p-2 rounded border text-sm ${
                            selectedOptions.acompanhamentos === acomp.nome ? 
                            'border-green-500 bg-green-50' : 'border-gray-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="acompanhamentos"
                            checked={selectedOptions.acompanhamentos === acomp.nome}
                            onChange={() => handleOptionChange("acompanhamentos", acomp.nome)}
                            className="mr-2"
                          />
                          {acomp.nome}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {item.opcoes.saladas && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Salada (selecione 1):</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {item.opcoes.saladas.map((salada) => (
                        <label 
                          key={salada.id}
                          className={`flex items-center p-2 rounded border text-sm ${
                            selectedOptions.salada === salada.nome ? 
                            'border-green-500 bg-green-50' : 'border-gray-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="salada"
                            checked={selectedOptions.salada === salada.nome}
                            onChange={() => handleOptionChange("salada", salada.nome)}
                            className="mr-2"
                          />
                          {salada.nome}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {item.opcoes.bebidas && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Bebida {item.tipo === "combo" ? "incluída" : "(opcional)"}:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {item.opcoes.bebidas.map((bebida) => (
                        <div key={bebida.id}>
                          <label 
                            className={`flex items-center p-2 rounded border text-sm ${
                              selectedOptions.bebida === bebida.nome ? 
                              'border-green-500 bg-green-50' : 'border-gray-200'
                            }`}
                          >
                            <input
                              type="radio"
                              name="bebida"
                              checked={selectedOptions.bebida === bebida.nome}
                              onChange={() => handleOptionChange("bebida", bebida.nome)}
                              className="mr-2"
                            />
                            <div className="flex items-center">
                              {bebida.imagem && (
                                <img 
                                  src={bebida.imagem} 
                                  alt={bebida.nome}
                                  className="w-8 h-8 rounded-full object-cover mr-2"
                                />
                              )}
                              <div>
                                {bebida.nome}
                                {bebida.precoExtra > 0 && ` (+€${bebida.precoExtra.toFixed(2)})`}
                              </div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.opcoes.toppings && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Toppings (opcional):</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {item.opcoes.toppings.map((topping) => (
                        <label 
                          key={topping.id}
                          className={`flex items-center p-2 rounded border text-sm ${
                            selectedOptions.toppings.includes(topping.nome) ? 
                            'border-green-500 bg-green-50' : 'border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedOptions.toppings.includes(topping.nome)}
                            onChange={() => handleOptionChange("toppings", topping.nome)}
                            className="mr-2"
                          />
                          {topping.nome}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <button
          onClick={item.opcoes ? handleAddToCart : () => {
            onAdd(item);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
          }}
          className={`mt-4 w-full ${
            addedToCart ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'
          } text-white py-3 px-4 rounded-md font-medium transition-colors shadow-md flex items-center justify-center`}
        >
          {addedToCart ? (
            <>
              <Check className="mr-2" /> Adicionado!
            </>
          ) : (
            <>
              <Plus className="mr-2" /> Adicionar ao Carrinho
            </>
          )}
        </button>
        
        {validationError && (
          <p className="text-red-500 text-sm mt-2 text-center">{validationError}</p>
        )}
      </div>
    </div>
  );
};

// ========== COMPONENTE CART ITEM ========== //
const CartItem = ({ item, index, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-200">
      <div className="flex">
        <div className="w-20 h-20 rounded-md overflow-hidden mr-3">
          <img 
            src={item.imagem} 
            alt={item.nome} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{item.nome}</h3>
              
              {item.selectedOptions && (
                <div className="mt-1 text-xs text-gray-600">
                  {item.selectedOptions.carnes?.length > 0 && (
                    <p><span className="font-medium">Carnes:</span> {item.selectedOptions.carnes.join(", ")}</p>
                  )}
                  {item.selectedOptions.acompanhamentos && (
                    <p><span className="font-medium">Acomp:</span> {item.selectedOptions.acompanhamentos}</p>
                  )}
                  {item.selectedOptions.salada && (
                    <p><span className="font-medium">Salada:</span> {item.selectedOptions.salada}</p>
                  )}
                  {item.selectedOptions.bebida && <p><span className="font-medium">Bebida:</span> {item.selectedOptions.bebida}</p>}
                  {item.selectedOptions.toppings?.length > 0 && (
                    <p><span className="font-medium">Toppings:</span> {item.selectedOptions.toppings.join(", ")}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col items-end">
              <p className="text-green-600 font-bold">
                €{(item.precoFinal || item.preco).toFixed(2)}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => onDecrease(index)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-1 rounded-full"
                >
                  <Minus size={16} />
                </button>
                
                <span className="text-gray-700 w-6 text-center">{item.quantidade}</span>
                
                <button
                  onClick={() => onIncrease(index)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-1 rounded-full"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 mt-2 text-sm flex items-center"
          >
            <Trash size={14} className="mr-1" /> Remover
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== COMPONENTE MBWAY PAYMENT ========== //
const MbwayPayment = ({ phone, setPhone, errors, setErrors }) => {
  return (
    <div className="mt-4">
      <label className="block text-gray-700 mb-1">Número de Telemóvel MBWay</label>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <span className="px-3 py-2 bg-gray-100 text-gray-700">+351</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.mbwayPhone) {
              setErrors({...errors, mbwayPhone: ''});
            }
          }}
          placeholder="9XXXXXXXX"
          className="flex-1 p-2 border-0 focus:ring-0"
        />
      </div>
      {errors.mbwayPhone && <p className="text-red-500 text-sm mt-1">{errors.mbwayPhone}</p>}
      <div className="mt-2 bg-blue-50 p-3 rounded-md text-sm text-blue-700">
        <p>Será enviado um pedido de pagamento para o número indicado.</p>
        <p className="font-medium mt-1">Número do restaurante: 933 737 672</p>
      </div>
    </div>
  );
};

// ========== COMPONENTE CHECKOUT FORM ========== //
const CheckoutForm = ({ 
  cart, 
  total, 
  onBack, 
  onSubmit, 
  nome, 
  setNome, 
  endereco, 
  setEndereco, 
  contato, 
  setContato, 
  entrega, 
  setEntrega,
  metodoPagamento,
  setMetodoPagamento,
  setIsCartOpen
}) => {
  const [errors, setErrors] = useState({});
  const [mbwayPhone, setMbwayPhone] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = "Por favor, insira seu nome";
    if (!contato.trim()) newErrors.contato = "Por favor, insira um contato";
    if (entrega && !endereco.trim()) newErrors.endereco = "Por favor, insira o endereço";
    if (!metodoPagamento) newErrors.metodoPagamento = "Por favor, selecione o método de pagamento";
    
    if (metodoPagamento === 'mbway' && !mbwayPhone.trim()) {
      newErrors.mbwayPhone = "Por favor, insira o número MBWay";
    } else if (metodoPagamento === 'mbway' && !/^9[0-9]{8}$/.test(mbwayPhone)) {
      newErrors.mbwayPhone = "Por favor, insira um número válido (9 dígitos)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Finalizar Pedido</h2>
      </div>
      
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg text-gray-700 mb-3 flex items-center">
          <ShoppingCart className="mr-2" /> Resumo do Pedido
        </h3>
        
        <div className="space-y-3">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span className="text-gray-600">
                {item.quantidade}x {item.nome}
                {item.selectedOptions?.bebida && ` + ${item.selectedOptions.bebida}`}
              </span>
              <span className="font-medium">
                €{(item.precoFinal || item.preco * item.quantidade).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-3 pt-3 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>€{(total - (entrega ? 4 : 0)).toFixed(2)}</span>
          </div>
          {entrega && (
            <div className="flex justify-between">
              <span>Taxa de Entrega:</span>
              <span>€4.00</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Informações de Entrega</h3>
          
          <DeliveryPickupSelector 
            entrega={entrega} 
            setEntrega={setEntrega} 
            setEndereco={setEndereco}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 flex items-center">
                <User size={16} className="mr-2" />
                Nome Completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={`w-full p-3 border rounded-md ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Seu nome completo"
              />
              {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1 flex items-center">
                <Phone size={16} className="mr-2" />
                Contato (WhatsApp)
              </label>
              <input
                type="tel"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                className={`w-full p-3 border rounded-md ${errors.contato ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Seu número de telefone"
              />
              {errors.contato && <p className="text-red-500 text-sm mt-1">{errors.contato}</p>}
            </div>
          </div>

          {entrega && (
            <div className="mt-4">
              <label className="block text-gray-700 mb-1 flex items-center">
                <MapPin size={16} className="mr-2" />
                Endereço de Entrega
              </label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className={`w-full p-3 border rounded-md ${errors.endereco ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Rua, número, bairro, complemento"
              />
              {errors.endereco && <p className="text-red-500 text-sm mt-1">{errors.endereco}</p>}
            </div>
          )}

          <div className="mt-4">
            <label className="block text-gray-700 mb-1 flex items-center">
              <Info size={16} className="mr-2" />
              Observações (opcional)
            </label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Alguma observação sobre o pedido?"
              rows={2}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Método de Pagamento</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  metodoPagamento === 'dinheiro' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setMetodoPagamento('dinheiro')}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    metodoPagamento === 'dinheiro' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Dinheiro</h4>
                    <p className="text-sm text-gray-600">Pagamento na entrega com troco</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  metodoPagamento === 'mbway' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setMetodoPagamento('mbway')}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    metodoPagamento === 'mbway' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">MBWay</h4>
                    <p className="text-sm text-gray-600">Pagamento instantâneo via app</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  metodoPagamento === 'cartao' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setMetodoPagamento('cartao')}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    metodoPagamento === 'cartao' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Cartão</h4>
                    <p className="text-sm text-gray-600">Débito ou crédito na entrega</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  metodoPagamento === 'multibanco' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setMetodoPagamento('multibanco')}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    metodoPagamento === 'multibanco' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Multibanco</h4>
                    <p className="text-sm text-gray-600">Pagamento por referência MB</p>
                  </div>
                </div>
              </div>
            </div>
            {errors.metodoPagamento && <p className="text-red-500 text-sm mt-2">{errors.metodoPagamento}</p>}

            {metodoPagamento === 'mbway' && (
              <MbwayPayment 
                phone={mbwayPhone} 
                setPhone={setMbwayPhone} 
                errors={errors} 
                setErrors={setErrors} 
              />
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <Info size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">Confirmação via WhatsApp</h3>
              <p className="text-blue-700 text-sm">
                Ao finalizar, você será redirecionado para o WhatsApp para confirmar seu pedido. 
                Certifique-se de que seu número está correto para receber as atualizações do seu pedido.
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Voltar ao Cardápio
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-md"
          >
            Confirmar Pedido
          </button>
        </div>
      </form>
    </div>
  );
};

// ========== COMPONENTE CONFIRMATION ========== //
const Confirmation = ({ orderNumber, onNewOrder }) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('pt-PT', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200 max-w-md mx-auto">
      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
        <Check size={36} className="text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Pedido Confirmado!</h2>
      <p className="text-gray-600 mb-1">Número do pedido:</p>
      <p className="text-3xl font-bold text-green-600 mb-6">#{orderNumber}</p>
      
      <div className="bg-blue-50 p-5 rounded-lg text-left mb-6">
        <div className="flex items-start mb-4">
          <Calendar size={20} className="text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Data e Hora</h3>
            <p className="text-blue-700 text-sm">
              {formattedDate} às {formattedTime}
            </p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <Clock size={20} className="text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Tempo de Preparo</h3>
            <p className="text-blue-700 text-sm">
              Seu pedido estará pronto em aproximadamente <span className="font-medium">30-45 minutos</span>.
              Enviaremos atualizações pelo WhatsApp.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <CreditCard size={20} className="text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Forma de Pagamento</h3>
            <p className="text-blue-700 text-sm">
              Pagamento será realizado no momento da entrega/retirada.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 mb-6">
        <div className="flex items-start">
          <AlertCircle size={20} className="text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-1">Atenção:</p>
            <p>
              Caso não receba a confirmação no WhatsApp em 2 minutos, 
              por favor entre em contato connosco pelo número (93) 373-7672.
            </p>
          </div>
        </div>
      </div>
      
      <button
        onClick={onNewOrder}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-md"
      >
        Fazer Novo Pedido
      </button>
    </div>
  );
};

// ========== COMPONENTE FOOTER ========== //
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Contactos</h3>
            <div className="flex items-start">
              <MapPin className="text-green-400 mr-3 mt-1" size={20} />
              <div>
                <p className="font-medium">Endereço</p>
                <p className="text-gray-300">Estr. de Alvor, São Sebastião</p>
                <p className="text-gray-300">8500-769 Portimão</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="text-green-400 mr-3" size={20} />
              <a href="tel:+351933737672" className="hover:text-green-400 transition-colors">
                (93) 373-7672
              </a>
            </div>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-green-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-green-400 transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          
          {/* Hours Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horário</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-300">Segunda-feira:</span>
                <span className="font-medium">Fechado</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-300">Terça a Sábado:</span>
                <span className="font-medium">12:00 - 14:45</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-300">Terça a Sábado:</span>
                <span className="font-medium">19:00 - 21:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Domingo:</span>
                <span className="font-medium">12:00 - 14:45</span>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Localização</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden">
            <iframe 
            title="Mapa de localização"  // Adicione um título único
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.569347476754!2d-8.53968968431738!3d37.13859997984561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA4JzE5LjAiTiA4wrAzMiczMTQuMCJX!5e0!3m2!1spt-PT!2spt!4v1620000000000!5m2!1spt-PT!2spt" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            allowFullScreen="" 
            loading="lazy"
            className="min-h-[200px]"
            ></iframe>

            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Churrascaria Gaúcha. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

// ========== COMPONENTE PRINCIPAL (ORDERBOT) ========== //
export default function OrderBot() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1);
  const [openCategory, setOpenCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [entrega, setEntrega] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [mbwayPhone, setMbwayPhone] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    // Gera número do pedido quando chegar na confirmação
    if (step === 3) {
      setOrderNumber(Math.floor(10000 + Math.random() * 90000));
    }
  }, [step]);

  useEffect(() => {
    if (step !== 1) {
      setIsCartOpen(false);
    }
  }, [step]);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      cartItem => cartItem.id === item.id && 
      JSON.stringify(cartItem.selectedOptions) === JSON.stringify(item.selectedOptions)
    );

    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantidade += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantidade: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantidade += 1;
    setCart(newCart);
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantidade > 1) {
      newCart[index].quantidade -= 1;
      setCart(newCart);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0);
  const deliveryFee = entrega ? 4 : 0;
  const total = subtotal + deliveryFee;

  const sendOrder = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Formatar os itens do pedido
    const itemsText = cart.map(item => {
      let itemText = `${item.quantidade}x *${item.nome}* - €${(item.precoFinal || item.preco).toFixed(2)}`;
      if (item.selectedOptions) {
        if (item.selectedOptions.carnes?.length > 0) {
          itemText += `\n  🥩 *Carnes:* ${item.selectedOptions.carnes.join(", ")}`;
        }
        if (item.selectedOptions.acompanhamentos) {
          itemText += `\n  🍚 *Acomp:* ${item.selectedOptions.acompanhamentos}`;
        }
        if (item.selectedOptions.salada) {
          itemText += `\n  🥗 *Salada:* ${item.selectedOptions.salada}`;
        }
        if (item.selectedOptions.bebida) {
          itemText += `\n  🥤 *Bebida:* ${item.selectedOptions.bebida}`;
        }
        if (item.selectedOptions.toppings?.length > 0) {
          itemText += `\n  🍓 *Toppings:* ${item.selectedOptions.toppings.join(", ")}`;
        }
      }
      return itemText;
    }).join('\n\n');

    // Formatar o método de pagamento
    let paymentMethod = '';
    if (metodoPagamento === 'mbway') {
      paymentMethod = `💳 *MBWay* (Número: ${mbwayPhone})\nNúmero do restaurante: 933 737 672`;
    } else if (metodoPagamento === 'cartao') {
      paymentMethod = '💳 *Cartão* (Débito/Crédito na entrega)';
    } else if (metodoPagamento === 'multibanco') {
      paymentMethod = '💳 *Multibanco* (Pagamento por referência MB)';
    } else {
      paymentMethod = '💵 *Dinheiro* (Com troco)';
    }

    // Mensagem completa
    const message = `*📋 NOVO PEDIDO #${orderNumber} - CHURRASCARIA GAÚCHA*\n\n` +
      `📅 *Data:* ${formattedDate}\n` +
      `⏰ *Hora:* ${formattedTime}\n\n` +
      `*🍽️ ITENS DO PEDIDO*\n${itemsText}\n\n` +
      `*💰 TOTAL DO PEDIDO*\n` +
      `• Subtotal: €${subtotal.toFixed(2)}\n` +
      `• Taxa de entrega: ${entrega ? "€4.00" : "Grátis"}\n` +
      `• *Total a pagar: €${total.toFixed(2)}*\n\n` +
      `*👤 INFORMAÇÕES DO CLIENTE*\n` +
      `• Nome: ${nome}\n` +
      `• Contato: ${contato}\n` +
      `• Tipo: ${entrega ? `🚚 *Entrega* (${endereco})` : "🏃 *Retirada no local*"}\n` +
      `• Pagamento: ${paymentMethod}\n\n` +
      (observacoes ? `*📝 OBSERVAÇÕES*\n${observacoes}\n\n` : '') +
      `_Obrigado pelo seu pedido! Entraremos em contacto em breve para confirmar._`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp com a mensagem formatada
    window.open(`https://wa.me/351933737672?text=${encodedMessage}`);
    setStep(3);
  };

  const startNewOrder = () => {
    setCart([]);
    setNome("");
    setEndereco("");
    setContato("");
    setEntrega(false);
    setMetodoPagamento("");
    setMbwayPhone("");
    setObservacoes("");
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar profissional */}
      <Navbar 
        cart={cart} 
        setIsCartOpen={setIsCartOpen}
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Menu Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Cardápio</h2>
              
              {/* Categories */}
              <div className="space-y-8">
                {ementa.map((category) => (
                  <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                    <button
                      onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                      className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        {category.imagem && (
                          <div className="w-12 h-12 rounded-md overflow-hidden mr-4">
                            <img 
                              src={category.imagem} 
                              alt={category.nome} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <h3 className="text-lg font-semibold text-gray-800">{category.nome}</h3>
                      </div>
                      {openCategory === category.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {openCategory === category.id && (
                      <div className="px-5 pb-5">
                        {/* Subcategories for drinks and others */}
                        {category.subcategorias ? (
                          category.subcategorias.map((subcat) => (
                            <div key={subcat.nome} className="mb-6">
                              <h4 className="font-medium text-gray-700 text-sm uppercase tracking-wider mb-3">
                                {subcat.nome}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {subcat.itens.map((item) => (
                                  <MenuItem 
                                    key={item.id} 
                                    item={item} 
                                    onAdd={addToCart} 
                                  />
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {category.itens.map((item) => (
                              <MenuItem 
                                key={item.id} 
                                item={item} 
                                onAdd={addToCart} 
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Sidebar (Desktop) */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-xl shadow-md p-5 sticky top-24 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <ShoppingCart className="mr-2" /> Seu Pedido
                </h2>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">O seu carrinho está vazio</p>
                    <p className="text-gray-400 text-sm mt-2">Adicione itens para continuar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-[400px] overflow-y-auto pr-2">
                      {cart.map((item, index) => (
                        <CartItem
                          key={`${item.id}-${index}`}
                          item={item}
                          index={index}
                          onRemove={removeFromCart}
                          onIncrease={increaseQuantity}
                          onDecrease={decreaseQuantity}
                        />
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between mb-1">
                        <span>Subtotal:</span>
                        <span>€{subtotal.toFixed(2)}</span>
                      </div>
                      {entrega && (
                        <div className="flex justify-between mb-1">
                          <span>Taxa de Entrega:</span>
                          <span>€4.00</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t border-gray-200">
                        <span>Total:</span>
                        <span>€{total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={cart.length === 0}
                      className={`w-full py-3 px-4 rounded-lg font-medium mt-4 transition-colors ${cart.length === 0 ? 
                        'bg-gray-300 cursor-not-allowed' : 
                        'bg-green-600 hover:bg-green-700 text-white shadow-md'}`}
                    >
                      Finalizar Pedido
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <CheckoutForm
            cart={cart}
            total={total}
            onBack={() => setStep(1)}
            onSubmit={sendOrder}
            nome={nome}
            setNome={setNome}
            endereco={endereco}
            setEndereco={setEndereco}
            contato={contato}
            setContato={setContato}
            entrega={entrega}
            setEntrega={setEntrega}
            metodoPagamento={metodoPagamento}
            setMetodoPagamento={setMetodoPagamento}
            setIsCartOpen={setIsCartOpen}
          />
        )}

        {step === 3 && (
          <Confirmation 
            orderNumber={orderNumber} 
            onNewOrder={startNewOrder} 
          />
        )}
      </main>

      {/* Mobile Cart Drawer */}
      {isCartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsCartOpen(false)}
          />
          
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl z-30 p-4 overflow-y-auto transform transition-transform duration-300 ease-out">
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <ShoppingCart className="mr-2" /> Seu Pedido
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">O seu carrinho está vazio</p>
                <p className="text-gray-400 text-sm mt-2">Adicione itens para continuar</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    if (step === 1) {
                      // Se estiver na página do cardápio, apenas fecha o carrinho
                    } else {
                      // Se estiver na página de checkout, volta para o cardápio
                      setStep(1);
                    }
                  }}
                  className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Voltar ao Cardápio
                </button>
              </div>
            ) : (
              <div className="pb-32">
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  {cart.map((item, index) => (
                    <CartItem
                      key={`${item.id}-${index}`}
                      item={item}
                      index={index}
                      onRemove={removeFromCart}
                      onIncrease={increaseQuantity}
                      onDecrease={decreaseQuantity}
                    />
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-1">
                    <span>Subtotal:</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  {entrega && (
                    <div className="flex justify-between mb-1">
                      <span>Taxa de Entrega:</span>
                      <span>€4.00</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t border-gray-200">
                    <span>Total:</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                {step === 1 ? (
                  <button
                    onClick={() => {
                      setStep(2);
                      setIsCartOpen(false);
                    }}
                    className="fixed bottom-4 left-4 right-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow-md"
                  >
                    Finalizar Pedido
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="fixed bottom-4 left-4 right-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow-md"
                  >
                    Voltar para Finalização
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Mobile Checkout Button */}
      {step === 1 && cart.length > 0 && !isCartOpen && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-10">
          <button
            onClick={() => {
              setStep(2);
              setIsCartOpen(false);
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow-md flex justify-between items-center px-6"
          >
            <span>Finalizar Pedido</span>
            <span>€{total.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Footer */}
      {step !== 3 && <Footer />}
    </div>
  );
}