import { useState, useEffect } from 'react';
import {
  Trash, Plus, Minus, ChevronDown, ChevronUp,
  ShoppingCart, X, Check, MapPin, Phone, User,
  CreditCard, Clock, Info, Smartphone
} from 'lucide-react';

// Dados da ementa atualizados
const ementa = [
  {
    id: 1,
    nome: "🥩 Churrascos Premium",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop",
    itens: [
      {
        id: 101,
        nome: "Combo Churrasco",
        preco: 12.0,
        imagem: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop",
        descricao: "Refeição completa com 2 carnes e acompanhamentos",
        tipo: "churrasco",
        opcoes: {
          carnes: [
            { id: "c1", nome: "Maminha (Premium)", precoExtra: 1.0 },
            { id: "c2", nome: "Coração de Frango", precoExtra: 0 },
            { id: "c3", nome: "Costelinha Suína", precoExtra: 0 },
            { id: "c4", nome: "Linguiça", precoExtra: 0 },
            { id: "c5", nome: "Filé de Frango", precoExtra: 0 }
          ],
          acompanhamentos: [
            { id: "a1", nome: "Arroz Branco" },
            { id: "a2", nome: "Feijão Tropeiro" },
            { id: "a3", nome: "Farofa Crocante" },
            { id: "a4", nome: "Vinagrete Fresco" }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    nome: "🥪 Sanduíches",
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
    nome: "🍱 Combos Especiais",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop",
    itens: [
      { 
        id: 301, 
        nome: "Combo Frango Supreme", 
        preco: 10.0, 
        imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop",
        descricao: "Sanduíche completo de frango + batata frita + 1 bebida à escolha",
        tipo: "combo",
        opcoes: {
          bebidas: [
            { id: "b1", nome: "Água 500ml", preco: 0 },
            { id: "b2", nome: "Coca-Cola", preco: 0 },
            { id: "b3", nome: "Fanta", preco: 0 },
            { id: "b4", nome: "Ice Tea Pêssego", preco: 0 }
          ]
        }
      },
      { 
        id: 302, 
        nome: "Combo X-Tudo", 
        preco: 12.0, 
        imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop",
        descricao: "Sanduíche completo + batata frita + 1 bebida à escolha",
        tipo: "combo",
        opcoes: {
          bebidas: [
            { id: "b1", nome: "Água 500ml", preco: 0 },
            { id: "b2", nome: "Coca-Cola", preco: 0 },
            { id: "b3", nome: "Fanta", preco: 0 },
            { id: "b4", nome: "Ice Tea Pêssego", preco: 0 }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    nome: "🍽️ Porções",
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
    nome: "🥤 Bebidas",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=500&auto=format&fit=crop",
    subcategorias: [
      {
        nome: "💧 Águas",
        itens: [
          { 
            id: 5011, 
            nome: "Água com gás Castelo (pequena)", 
            preco: 1.5, 
            imagem: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=500&auto=format&fit=crop",
            descricao: "Garrafa pequena de água mineral com gás" 
          },
          { 
            id: 5012, 
            nome: "Água com gás Pedras (pequena)", 
            preco: 1.5, 
            imagem: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=500&auto=format&fit=crop",
            descricao: "Garrafa pequena de água mineral com gás" 
          },
          { 
            id: 5013, 
            nome: "Água sem gás 500ml", 
            preco: 1.0, 
            imagem: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=500&auto=format&fit=crop",
            descricao: "Garrafa de água mineral sem gás" 
          }
        ]
      },
      {
        nome: "🥤 Refrigerantes (lata)",
        itens: [
          { 
            id: 5021, 
            nome: "7UP", 
            preco: 2.0, 
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante 7UP" 
          },
          { 
            id: 5022, 
            nome: "Coca-Cola", 
            preco: 2.0, 
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante Coca-Cola" 
          },
          { 
            id: 5023, 
            nome: "Coca-Cola Zero", 
            preco: 2.0, 
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante Coca-Cola Zero" 
          },
          { 
            id: 5024, 
            nome: "Fanta Laranja", 
            preco: 2.0, 
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante Fanta Laranja" 
          },
          { 
            id: 5025, 
            nome: "Guaraná", 
            preco: 2.0, 
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Lata de refrigerante Guaraná" 
          },
          { 
            id: 5026, 
            nome: "Ice Tea de Manga", 
            preco: 2.0, 
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop",
            descricao: "Lata de Ice Tea sabor manga" 
          }
        ]
      }
    ]
  }
];

const MenuItem = ({ item, onAdd }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    carnes: [],
    acompanhamentos: [],
    bebida: ""
  });

  const handleOptionChange = (type, value) => {
    if (type === "carnes" || type === "acompanhamentos") {
      const newSelection = selectedOptions[type].includes(value)
        ? selectedOptions[type].filter(c => c !== value)
        : [...selectedOptions[type], value];
      
      setSelectedOptions({
        ...selectedOptions,
        [type]: newSelection.length <= (type === "carnes" ? 2 : 4) ? newSelection : selectedOptions[type]
      });
    } else {
      setSelectedOptions({
        ...selectedOptions,
        [type]: value
      });
    }
  };

  const handleAddWithOptions = () => {
    const itemWithOptions = {
      ...item,
      selectedOptions,
      precoFinal: item.preco + 
        selectedOptions.carnes.reduce((sum, c) => {
          const carne = item.opcoes.carnes.find(opt => opt.nome === c);
          return sum + (carne?.precoExtra || 0);
        }, 0) + 
        (selectedOptions.bebida ? 
          (item.opcoes?.bebidas?.find(b => b.nome === selectedOptions.bebida)?.preco || 0) : 0)
    };
    onAdd(itemWithOptions);
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
            <p className="text-gray-600 text-sm mb-3">{item.descricao}</p>
            <p className="text-green-600 font-bold text-lg">€{item.preco.toFixed(2)}</p>
          </div>
        </div>

        {item.opcoes && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {item.opcoes.carnes && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Carnes (escolha até 2):</h4>
                <div className="grid grid-cols-2 gap-2">
                  {item.opcoes.carnes.map((carne) => (
                    <label 
                      key={carne.id}
                      className={`flex items-center p-2 rounded border text-sm ${selectedOptions.carnes.includes(carne.nome) ? 
                        'border-green-500 bg-green-50' : 'border-gray-200'}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.carnes.includes(carne.nome)}
                        onChange={() => handleOptionChange("carnes", carne.nome)}
                        className="mr-2"
                        disabled={selectedOptions.carnes.length >= 2 && !selectedOptions.carnes.includes(carne.nome)}
                      />
                      {carne.nome}
                      {carne.precoExtra > 0 && ` (+€${carne.precoExtra.toFixed(2)})`}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {item.opcoes.acompanhamentos && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Acompanhamentos:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {item.opcoes.acompanhamentos.map((acomp) => (
                    <label 
                      key={acomp.id}
                      className={`flex items-center p-2 rounded border text-sm ${selectedOptions.acompanhamentos.includes(acomp.nome) ? 
                        'border-green-500 bg-green-50' : 'border-gray-200'}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.acompanhamentos.includes(acomp.nome)}
                        onChange={() => handleOptionChange("acompanhamentos", acomp.nome)}
                        className="mr-2"
                      />
                      {acomp.nome}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {item.opcoes.bebidas && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Bebida:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {item.opcoes.bebidas.map((bebida) => (
                    <label 
                      key={bebida.id}
                      className={`flex items-center p-2 rounded border text-sm ${selectedOptions.bebida === bebida.nome ? 
                        'border-green-500 bg-green-50' : 'border-gray-200'}`}
                    >
                      <input
                        type="radio"
                        name="bebida"
                        checked={selectedOptions.bebida === bebida.nome}
                        onChange={() => handleOptionChange("bebida", bebida.nome)}
                        className="mr-2"
                      />
                      {bebida.nome}
                      {bebida.preco > 0 && ` (+€${bebida.preco.toFixed(2)})`}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={item.opcoes ? handleAddWithOptions : () => onAdd(item)}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors shadow-md"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

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
                  {item.selectedOptions.acompanhamentos?.length > 0 && (
                    <p><span className="font-medium">Acomp:</span> {item.selectedOptions.acompanhamentos.join(", ")}</p>
                  )}
                  {item.selectedOptions.bebida && <p><span className="font-medium">Bebida:</span> {item.selectedOptions.bebida}</p>}
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
  setMetodoPagamento
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = "Por favor, insira seu nome";
    if (!contato.trim()) newErrors.contato = "Por favor, insira um contato";
    if (entrega && !endereco.trim()) newErrors.endereco = "Por favor, insira o endereço";
    if (!metodoPagamento) newErrors.metodoPagamento = "Por favor, selecione o método de pagamento";
    
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Finalizar Pedido</h2>
      
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
          <div className="flex justify-between">
            <span>Taxa de Entrega:</span>
            <span>{entrega ? "€4.00" : "Grátis"}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Informações de Entrega</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tipo de Entrega</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setEntrega(false)}
                className={`flex-1 py-3 px-4 rounded-md border-2 ${!entrega ? 
                  'border-green-500 bg-green-50 text-green-700' : 
                  'border-gray-300 text-gray-700'}`}
              >
                <div className="font-medium">Retirada no Local</div>
                <div className="text-sm mt-1">Sem custo adicional</div>
              </button>
              <button
                type="button"
                onClick={() => setEntrega(true)}
                className={`flex-1 py-3 px-4 rounded-md border-2 ${entrega ? 
                  'border-green-500 bg-green-50 text-green-700' : 
                  'border-gray-300 text-gray-700'}`}
              >
                <div className="font-medium">Entrega</div>
                <div className="text-sm mt-1">Taxa: €4.00</div>
              </button>
            </div>
          </div>

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
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg text-gray-700 mb-3">Pagamento</h3>
          
          <div>
            <label className="block text-gray-700 mb-2">Método de Pagamento</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMetodoPagamento('dinheiro')}
                className={`p-3 rounded-md border-2 flex flex-col items-center ${metodoPagamento === 'dinheiro' ? 
                  'border-green-500 bg-green-50 text-green-700' : 
                  'border-gray-300 text-gray-700'}`}
              >
                <CreditCard size={20} className="mb-1" />
                <span className="text-sm font-medium">Dinheiro</span>
                <span className="text-xs mt-1">Troco para?</span>
              </button>
              <button
                type="button"
                onClick={() => setMetodoPagamento('mbway')}
                className={`p-3 rounded-md border-2 flex flex-col items-center ${metodoPagamento === 'mbway' ? 
                  'border-green-500 bg-green-50 text-green-700' : 
                  'border-gray-300 text-gray-700'}`}
              >
                <Smartphone size={20} className="mb-1" />
                <span className="text-sm font-medium">MBWay</span>
                <span className="text-xs mt-1">Pagamento via app</span>
              </button>
              <button
                type="button"
                onClick={() => setMetodoPagamento('cartao')}
                className={`p-3 rounded-md border-2 flex flex-col items-center ${metodoPagamento === 'cartao' ? 
                  'border-green-500 bg-green-50 text-green-700' : 
                  'border-gray-300 text-gray-700'}`}
              >
                <CreditCard size={20} className="mb-1" />
                <span className="text-sm font-medium">Cartão</span>
                <span className="text-xs mt-1">Débito/Crédito</span>
              </button>
              <button
                type="button"
                onClick={() => setMetodoPagamento('multibanco')}
                className={`p-3 rounded-md border-2 flex flex-col items-center ${metodoPagamento === 'multibanco' ? 
                  'border-green-500 bg-green-50 text-green-700' : 
                  'border-gray-300 text-gray-700'}`}
              >
                <CreditCard size={20} className="mb-1" />
                <span className="text-sm font-medium">Multibanco</span>
                <span className="text-xs mt-1">Referência MB</span>
              </button>
            </div>
            {errors.metodoPagamento && <p className="text-red-500 text-sm mt-2">{errors.metodoPagamento}</p>}
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
            Voltar ao Carrinho
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

const Confirmation = ({ orderNumber, onNewOrder }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200 max-w-md mx-auto">
      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
        <Check size={36} className="text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Pedido Confirmado!</h2>
      <p className="text-gray-600 mb-1">Número do pedido:</p>
      <p className="text-3xl font-bold text-green-600 mb-6">#{orderNumber}</p>
      
      <div className="bg-blue-50 p-5 rounded-lg text-left mb-6 border border-blue-100">
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
        <p>
          <span className="font-medium">Atenção:</span> Caso não receba a confirmação no WhatsApp em 2 minutos, 
          por favor entre em contato conosco pelo número (93) 373-7672.
        </p>
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
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    setOrderNumber(Math.floor(10000 + Math.random() * 90000));
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
    // Format items for WhatsApp message
    const itemsText = cart.map(item => {
      let itemText = `${item.quantidade}x ${item.nome} - €${(item.precoFinal || item.preco).toFixed(2)}`;
      if (item.selectedOptions) {
        if (item.selectedOptions.carnes?.length > 0) {
          itemText += `%0A  • Carnes: ${item.selectedOptions.carnes.join(", ")}`;
        }
        if (item.selectedOptions.acompanhamentos?.length > 0) {
          itemText += `%0A  • Acomp: ${item.selectedOptions.acompanhamentos.join(", ")}`;
        }
        if (item.selectedOptions.bebida) {
          itemText += `%0A  • Bebida: ${item.selectedOptions.bebida}`;
        }
      }
      return itemText;
    }).join('%0A');

    const message = `*PEDIDO #${orderNumber}*%0A%0A` +
      `*ITENS:*%0A${itemsText}%0A%0A` +
      `*DETALHES DO PEDIDO*%0A` +
      `• Subtotal: €${subtotal.toFixed(2)}%0A` +
      `• Taxa de entrega: ${entrega ? "€4.00" : "Grátis"}%0A` +
      `• *Total: €${total.toFixed(2)}*%0A%0A` +
      `*INFORMAÇÕES DO CLIENTE*%0A` +
      `• Nome: ${nome}%0A` +
      `• Contato: ${contato}%0A` +
      `• Tipo: ${entrega ? `Entrega (${endereco})` : "Retirada no local"}%0A` +
      `• Pagamento: ${metodoPagamento === 'mbway' ? 'MBWay' : 
                     metodoPagamento === 'cartao' ? 'Cartão' : 
                     metodoPagamento === 'multibanco' ? 'Multibanco' : 'Dinheiro'}`;

    window.open(`https://wa.me/351933737672?text=${message}`);
    setStep(3);
  };

  const startNewOrder = () => {
    setCart([]);
    setNome("");
    setEndereco("");
    setContato("");
    setEntrega(false);
    setMetodoPagamento("");
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">🍖 Churrascaria Gaúcha</h1>
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
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
      </header>

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
                        {/* Subcategories for drinks */}
                        {category.subcategorias ? (
                          category.subcategorias.map((subcat) => (
                            <div key={subcat.nome} className="mb-6">
                              <h4 className="font-medium text-gray-700 mb-3 text-sm uppercase tracking-wider">
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
                    <p className="text-gray-500">Seu carrinho está vazio</p>
                    <p className="text-gray-400 text-sm mt-2">Adicione itens para continuar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-[400px] overflow-y-auto pr-2">
                      {cart.map((item, index) => (
                        <CartItem
                          key={`${item.id}-${JSON.stringify(item.selectedOptions)}-${index}`}
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
                      <div className="flex justify-between mb-1">
                        <span>Taxa de Entrega:</span>
                        <span>{entrega ? "€4.00" : "Grátis"}</span>
                      </div>
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
      {isCartOpen && step === 1 && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsCartOpen(false)}
          />
          
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl z-30 p-4 overflow-y-auto">
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
                <p className="text-gray-500">Seu carrinho está vazio</p>
                <p className="text-gray-400 text-sm mt-2">Adicione itens para continuar</p>
              </div>
            ) : (
              <div className="pb-32">
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  {cart.map((item, index) => (
                    <CartItem
                      key={`${item.id}-${JSON.stringify(item.selectedOptions)}-${index}`}
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
                  <div className="flex justify-between mb-1">
                    <span>Taxa de Entrega:</span>
                    <span>{entrega ? "€4.00" : "Grátis"}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t border-gray-200">
                    <span>Total:</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Mobile Checkout Button */}
      {step === 1 && cart.length > 0 && (
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
    </div>
  );
}