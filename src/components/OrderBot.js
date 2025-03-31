import { useState, useEffect } from 'react';
import {
  Trash, Plus, Minus, ChevronDown, ChevronUp,
  ShoppingCart, X, Check, MapPin, Phone, User,
  CreditCard, Clock, Info, Smartphone, Loader2, 
  Instagram, Facebook, Calendar, AlertCircle, Star,
  Printer, ChefHat, List, Home
} from 'lucide-react';

// ========== DADOS DA EMENTA ========== //
const ementa = [
  {
    id: 1,
    nome: "Churrasco",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop",
    itens: [
      {
        id: 101,
        nome: "Churrasco Misto",
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
            { id: "a2", nome: "Feijão (Caldo)" },
            { id: "a3", nome: "Farofa Crocante" },
            { id: "a4", nome: "Batata Frita", tipo: "extra" },
            { id: "a5", nome: "Banana Frita", tipo: "extra" },
            { id: "a6", nome: "Mandioca Frita", tipo: "extra" }
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
      },
      { 
        id: 102,
        nome: "Maminha",
        preco: 13.0,
        imagem: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop",
        descricao: "Maminha suculenta grelhada na brasa",
        tipo: "churrasco",
        opcoes: {
          acompanhamentos: [
            { id: "a1", nome: "Arroz" },
            { id: "a2", nome: "Feijão (Caldo)" },
            { id: "a3", nome: "Farofa Crocante" },
            { id: "a4", nome: "Batata Frita", tipo: "extra" },
            { id: "a5", nome: "Banana Frita", tipo: "extra" },
            { id: "a6", nome: "Mandioca Frita", tipo: "extra" }
          ],
          saladas: [
            { id: "s1", nome: "Salada Mista" },
            { id: "s2", nome: "Vinagrete" }
          ]
        }
      },
      { 
        id: 103,
        nome: "Linguiça Toscana",
        preco: 12.0,
        imagem: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format&fit=crop",
        descricao: "Linguiça toscana artesanal grelhada",
        tipo: "churrasco",
        opcoes: {
          acompanhamentos: [
            { id: "a1", nome: "Arroz" },
            { id: "a2", nome: "Feijão (Caldo)" },
            { id: "a3", nome: "Farofa Crocante" },
            { id: "a4", nome: "Batata Frita", tipo: "extra" },
            { id: "a5", nome: "Banana Frita", tipo: "extra" },
            { id: "a6", nome: "Mandioca Frita", tipo: "extra" }
          ],
          saladas: [
            { id: "s1", nome: "Salada Mista" },
            { id: "s2", nome: "Vinagrete" }
          ]
        }
      },
      { 
        id: 104,
        nome: "Costelinha de Porco",
        preco: 12.0,
        imagem: "https://images.unsplash.com/photo-1606851094291-6efae152fa87?w=500&auto=format&fit=crop",
        descricao: "Costelinha de porco assada lentamente",
        tipo: "churrasco",
        opcoes: {
          acompanhamentos: [
            { id: "a1", nome: "Arroz" },
            { id: "a2", nome: "Feijão (Caldo)" },
            { id: "a3", nome: "Farofa Crocante" },
            { id: "a4", nome: "Batata Frita", tipo: "extra" },
            { id: "a5", nome: "Banana Frita", tipo: "extra" },
            { id: "a6", nome: "Mandioca Frita", tipo: "extra" }
          ],
          saladas: [
            { id: "s1", nome: "Salada Mista" },
            { id: "s2", nome: "Vinagrete" }
          ]
        }
      },
      { 
        id: 105,
        nome: "Peito de Frango Grelhado",
        preco: 12.0,
        imagem: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format&fit=crop",
        descricao: "Peito de frango temperado e grelhado",
        tipo: "churrasco",
        opcoes: {
          acompanhamentos: [
            { id: "a1", nome: "Arroz" },
            { id: "a2", nome: "Feijão (Caldo)" },
            { id: "a3", nome: "Farofa Crocante" },
            { id: "a4", nome: "Batata Frita", tipo: "extra" },
            { id: "a5", nome: "Banana Frita", tipo: "extra" },
            { id: "a6", nome: "Mandioca Frita", tipo: "extra" }
          ],
          saladas: [
            { id: "s1", nome: "Salada Mista" },
            { id: "s2", nome: "Vinagrete" }
          ]
        }
      },
      { 
        id: 106,
        nome: "Coraçãozinho de Galinha",
        preco: 12.0,
        imagem: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format&fit=crop",
        descricao: "Coração de galinha grelhado no espeto",
        tipo: "churrasco",
        opcoes: {
          acompanhamentos: [
            { id: "a1", nome: "Arroz" },
            { id: "a2", nome: "Feijão (Caldo)" },
            { id: "a3", nome: "Farofa Crocante" },
            { id: "a4", nome: "Batata Frita", tipo: "extra" },
            { id: "a5", nome: "Banana Frita", tipo: "extra" },
            { id: "a6", nome: "Mandioca Frita", tipo: "extra" }
          ],
          saladas: [
            { id: "s1", nome: "Salada Mista" },
            { id: "s2", nome: "Vinagrete" }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    nome: "Burguers",
    tipo: "categoria",
    imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
    itens: [
      { 
        id: 201, 
        nome: "X-Salada", 
        preco: 6.5, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão de hambúrguer, bife de hambúrguer, fiambre, queijo, salada, batata palha e milho." 
      },
      { 
        id: 202, 
        nome: "X-Bacon", 
        preco: 8.0, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão, hambúrguer, bacon, queijo, fiambre, ovo, alface, tomate, milho e batata palha." 
      },
      { 
        id: 203, 
        nome: "X-Special", 
        preco: 7.0, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão, hambúrguer, queijo, fiambre, ovo, alface, tomate, milho e batata palha." 
      },
      { 
        id: 204, 
        nome: "X-Tudo", 
        preco: 9.0, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão de hambúrguer, bife de hambúrguer, bacon, ovo, fiambre, queijo, salada, batata palha, milho e salsicha." 
      },
      { 
        id: 205, 
        nome: "X-Frango", 
        preco: 8.0, 
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop",
        descricao: "Pão, filé de frango, queijo, fiambre, ovo, alface, tomate, milho e batata palha." 
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
        descricao: "Porção de arroz blanco" 
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
        descricao: "Porção de torresmo crocante (feito com barriga de porco, receita tradicional brasileira)" 
      },
      { 
        id: 411, 
        nome: "Mandioca Frita", 
        preco: 6.0, 
        imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop",
        descricao: "Porção de mandioca frita crocante" 
      },
      { 
        id: 412, 
        nome: "Batata Frita", 
        preco: 3.0, 
        imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop",
        descricao: "Porção de batata frita crocante" 
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
        nome: "Refrigerantes",
        itens: [
          { 
            id: 5021, 
            nome: "Coca-Cola (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop"
          },
          { 
            id: 5022, 
            nome: "Coca-Cola Zero (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop"
          },
          { 
            id: 5023, 
            nome: "Guaraná (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop"
          },
          { 
            id: 5024, 
            nome: "Guaraná Zero (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format&fit=crop"
          },
          { 
            id: 5025, 
            nome: "Fanta Laranja (lata)", 
            preco: 2.0,
            imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop"
          }
        ]
      },
      {
        nome: "Águas",
        itens: [
          { 
            id: 5011, 
            nome: "Água sem gás 500ml", 
            preco: 1.0,
            imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop"
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
        nome: "Açai Pequeno", 
        preco: 6.0, 
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
        nome: "Açai Grande", 
        preco: 10.0, 
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
        id: 603, 
        nome: "Pudim Caseiro", 
        preco: 3.0, 
        imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop",
        descricao: "Pudim tradicional caseiro com calda de caramelo" 
      },
      { 
        id: 604, 
        nome: "Mousse de Chocolate", 
        preco: 3.0, 
        imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop",
        descricao: "Mousse cremoso de chocolate" 
      },
      { 
        id: 605, 
        nome: "Mousse de Maracujá", 
        preco: 3.0, 
        imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop",
        descricao: "Mousse refrescante de maracujá" 
      },
      { 
        id: 606, 
        nome: "Gelado", 
        preco: 3.0, 
        imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop",
        descricao: "Bola de sorvete (consultar sabores disponíveis)" 
      },
      { 
        id: 607, 
        nome: "Petit Gateau", 
        preco: 4.0, 
        imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop",
        descricao: "Deliciosa sobremesa com recheio de chocolate quente que derrete na boca, acompanhada de sorvete de baunilha" 
      }
    ]
  }
];

// ========== COMPONENTE SPECIAL PROMO BANNER ========== //
const SpecialPromoBanner = () => {
  const [showPromoDetails, setShowPromoDetails] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="mb-6">
      <div 
        className={`bg-[#fffbf7] border border-[#3D1106] rounded-lg p-4 cursor-pointer transition-all duration-300 ${
          isHovering ? 'shadow-lg transform -translate-y-1' : 'shadow-md'
        }`}
        onClick={() => setShowPromoDetails(!showPromoDetails)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`bg-[#3D1106] text-[#FFB501] p-2 rounded-full mr-3 transition-all ${
              isHovering ? 'rotate-12 scale-110' : ''
            }`}>
              <Star size={18} className="transition-transform duration-300" />
            </div>
            <div>
              <h3 className="font-medium text-[#3D1106]">Pratos Especiais da Semana</h3>
              <p className="text-sm text-[#280B04]">Descubra nossas ofertas especiais</p>
            </div>
          </div>
          {showPromoDetails ? (
            <ChevronUp className="text-[#3D1106] animate-bounce" size={20} />
          ) : (
            <ChevronDown className="text-[#3D1106] animate-pulse" size={20} />
          )}
        </div>
      </div>

      {showPromoDetails && (
        <div className="bg-white p-4 rounded-lg border border-[#3D1106] mt-2 shadow-sm animate-fadeIn">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#FFB501]/20 text-[#3D1106] p-2 rounded-full mr-3 flex-shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <h4 className="font-medium text-[#3D1106]">Vaca Atolada - €13,00</h4>
                <p className="text-sm text-[#280B04]">Tradicional prato brasileiro com carne bovina cozida lentamente com mandioca e temperos especiais.</p>
                <div className="mt-2 text-xs text-[#3D1106] font-medium">
                  Disponível às Quintas-feiras
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[#FFB501]/20 text-[#3D1106] p-2 rounded-full mr-3 flex-shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <h4 className="font-medium text-[#3D1106]">Feijoada Completa - €13,00</h4>
                <p className="text-sm text-[#280B04]">O clássico brasileiro com feijão preto, diversas carnes, acompanhamentos e couve refogada.</p>
                <div className="mt-2 text-xs text-[#3D1106] font-medium">
                  Disponível aos Sábados e Domingos
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ========== COMPONENTE NAVBAR ========== //
const Navbar = ({ cart, setIsCartOpen, resetToMenu, setStep, isAdminView, setIsAdminView }) => {
  return (
    <div>
      <header className="bg-[#FFF1E8] sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <button onClick={resetToMenu} className="focus:outline-none">
                <img 
                  src="imagens/vivi.jpg" 
                  alt="Cozinha da Vivi" 
                  className="h-16 w-16 object-cover rounded-full border-[#3D1106]"
                />
              </button>
            </div>
            
            {/* Botões de navegação */}
            <div className="flex items-center space-x-4">
              {!isAdminView ? (
                <>
                  <button 
                    onClick={() => setIsAdminView(true)}
                    className="hidden md:flex items-center text-[#280B04] hover:text-[#3D1106] transition-colors p-2 rounded-lg bg-[#FFB501]/20"
                  >
                    <ChefHat className="mr-2" size={18} />
                    <span>Área do Restaurante</span>
                  </button>
                  
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="p-2 text-[#280B04] hover:text-[#3D1106] transition-colors relative"
                    aria-label="Carrinho de compras"
                  >
                    <ShoppingCart size={24} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#280B04] text-[#FFF1E4] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                        {cart.reduce((sum, item) => sum + item.quantidade, 0)}
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsAdminView(false)}
                  className="flex items-center text-[#280B04] hover:text-[#3D1106] transition-colors p-2 rounded-lg bg-[#FFB501]/20"
                >
                  <Home className="mr-2" size={18} />
                  <span>Voltar ao Menu</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Linha separadora */}
      <hr className="border-t-1 border-[#3d1106] my-1" />
    </div>
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
    <div className="mb-6">
      <label className="block text-[#280B04] mb-3 font-medium">Tipo de Entrega</label>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        <button
          type="button"
          onClick={() => handleDeliverySelection(false)}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${!entrega ? 
            'border-[#3D1106] bg-[#FFB501] text-[#280B04] shadow-md' : 
            'border-[#E5E7EB] text-[#280B04] hover:border-[#3D1106]'}`}
        >
          <div className="font-semibold">Retirada no Local</div>
          <div className="text-sm mt-1">Sem custo adicional</div>
        </button>
        <button
          type="button"
          onClick={() => handleDeliverySelection(true)}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${entrega ? 
            'border-[#3D1106] bg-[#FFB501] text-[#280B04] shadow-md' : 
            'border-[#E5E7EB] text-[#280B04] hover:border-[#3D1106]'}`}
        >
          <div className="font-semibold">Entrega</div>
          <div className="text-sm mt-1">Taxa: €4.00</div>
        </button>
      </div>
      
      {loading && (
        <div className="mt-3 flex items-center text-[#280B04] bg-[#FFF1E8] p-2 rounded-lg">
          <Loader2 className="animate-spin mr-2 text-[#3D1106]" size={16} />
          <span className="text-sm">A obter a sua localização...</span>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-[#A92C0D] text-sm bg-red-50 p-2 rounded-lg">{error}</div>
      )}
    </div>
  );
};

// ========== COMPONENTE MENU ITEM ========== //
const MenuItem = ({ item, onAdd }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    carnes: [],
    acompanhamentos: [],
    salada: "",
    bebida: "",
    toppings: []
  });
  const [addedToCart, setAddedToCart] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleOptionChange = (type, value, isExtra = false) => {
    if (type === "carnes") {
      const carneSelecionada = item.opcoes?.carnes?.find(c => c.nome === value);
      
      if (selectedOptions.carnes.includes(value)) {
        setSelectedOptions({
          ...selectedOptions,
          carnes: selectedOptions.carnes.filter(c => c !== value)
        });
      } 
      else if (carneSelecionada?.soMaminha) {
        setSelectedOptions({
          ...selectedOptions,
          carnes: [value]
        });
      } 
      else if (selectedOptions.carnes.some(c => {
        const carne = item.opcoes?.carnes?.find(opt => opt.nome === c);
        return carne?.soMaminha;
      })) {
        return;
      }
      else if (item.id === 101 && selectedOptions.carnes.length >= 2) {
        return;
      }
      else {
        setSelectedOptions({
          ...selectedOptions,
          [type]: [...selectedOptions[type], value]
        });
      }
    } 
    else if (type === "acompanhamentos") {
      const isExtra = item.opcoes?.acompanhamentos?.find(a => a.nome === value)?.tipo === "extra";
      
      if (isExtra) {
        // Se for um extra, substitui qualquer extra existente
        const newAcompanhamentos = selectedOptions.acompanhamentos.filter(a => {
          const acomp = item.opcoes?.acompanhamentos?.find(opt => opt.nome === a);
          return acomp?.tipo !== "extra";
        });
        
        setSelectedOptions({
          ...selectedOptions,
          acompanhamentos: [...newAcompanhamentos, value]
        });
      } else {
        // Se não for extra, adiciona/remove normalmente
        const newSelection = selectedOptions[type].includes(value)
          ? selectedOptions[type].filter(t => t !== value)
          : [...selectedOptions[type], value];
        
        setSelectedOptions({
          ...selectedOptions,
          [type]: newSelection
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
    // Validação especial apenas para Churrasco Misto
    if (item.id === 101) {
      const hasSoMaminha = selectedOptions.carnes.some(c => {
        const carne = item.opcoes?.carnes?.find(opt => opt.nome === c);
        return carne?.soMaminha;
      });
      
      if (!hasSoMaminha && selectedOptions.carnes.length !== 2) {
        setValidationError("Por favor, selecione exatamente 2 carnes ou a opção 'Só Maminha'");
        return false;
      }
    }
    
    // Validação para salada em itens de churrasco
    if (item.tipo === "churrasco" && !selectedOptions.salada) {
      setValidationError("Por favor, selecione 1 salada");
      return false;
    }
    
    // Validação para bebida em combos
    if (item.tipo === "combo" && item.opcoes?.bebidas && !selectedOptions.bebida) {
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
    
    setSelectedOptions({
      carnes: [],
      acompanhamentos: [],
      salada: "",
      bebida: "",
      toppings: []
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-[#3D1106] hover:shadow-md transition-shadow">
      {/* Imagem */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={item.imagem} 
          alt={item.nome} 
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-[#280B04]">{item.nome}</h3>
            {item.descricao && (
              <button 
                onClick={() => setShowDescription(!showDescription)}
                className="text-[#3D1106] text-sm mt-1 flex items-center hover:text-[#280B04] transition-colors"
              >
                {showDescription ? (
                  <>
                    <ChevronUp size={16} className="mr-1" /> Ocultar ingredientes
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} className="mr-1" /> Ver ingredientes
                  </>
                )}
              </button>
            )}
            {showDescription && (
              <p className="text-[#6B7280] text-sm mt-1">{item.descricao}</p>
            )}
          </div>
          <p className="text-[#3D1106] font-bold text-lg whitespace-nowrap ml-2">€{item.preco.toFixed(2)}</p>
        </div>

        {(item.tipo === "churrasco" || (item.opcoes && (item.opcoes.toppings || item.opcoes.bebidas))) && (
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-[#3D1106] text-sm font-medium mt-2 flex items-center hover:text-[#280B04] transition-colors"
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
          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
            {item.opcoes && (
              <div className="space-y-4">
                {item.opcoes.carnes && (
                  <div>
                    <h4 className="font-medium text-[#280B04] mb-2">Carnes:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.opcoes.carnes.map((carne) => {
                        const hasSoMaminha = selectedOptions.carnes.some(c => {
                          const cOpt = item.opcoes?.carnes?.find(opt => opt.nome === c);
                          return cOpt?.soMaminha;
                        });
                        
                        const isDisabled = (
                          (item.id === 101 && selectedOptions.carnes.length >= 2 && !selectedOptions.carnes.includes(carne.nome)) ||
                          (hasSoMaminha && !carne.soMaminha)
                        );

                        return (
                          <label 
                            key={carne.id}
                            className={`flex items-center p-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                              selectedOptions.carnes.includes(carne.nome) ? 
                              'border-[#617C33] bg-[#617C33]/10 text-[#280B04]' : 
                              'border-[#E5E7EB] text-[#280B04] hover:border-[#617C33]'
                            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedOptions.carnes.includes(carne.nome)}
                              onChange={() => handleOptionChange("carnes", carne.nome)}
                              className="mr-2 accent-[#617C33]"
                              disabled={isDisabled}
                            />
                            {carne.nome}
                            {carne.precoExtra > 0 && ` (+€${carne.precoExtra.toFixed(2)})`}
                          </label>
                        );
                      })}
                    </div>
                    {item.id === 101 && (
                      <p className="text-xs text-[#6B7280] mt-2">
                        {selectedOptions.carnes.some(c => {
                          const carne = item.opcoes?.carnes?.find(opt => opt.nome === c);
                          return carne?.soMaminha;
                        }) ? (
                          "Selecionou a opção 'Só Maminha'"
                        ) : (
                          "Selecione 2 carnes ou a opção 'Só Maminha'"
                        )}
                      </p>
                    )}
                  </div>
                )}

                {item.opcoes.acompanhamentos && (
                  <div>
                    <h4 className="font-medium text-[#280B04] mb-2">
                      {item.tipo === "churrasco" ? "Acompanhamentos (escolha seu extra):" : "Acompanhamentos:"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.opcoes.acompanhamentos.map((acomp) => {
                        const isExtra = acomp.tipo === "extra";
                        const isSelected = selectedOptions.acompanhamentos.includes(acomp.nome);
                        
                        // Para itens de churrasco, apenas permitir selecionar 1 extra
                        const isDisabled = item.tipo === "churrasco" && isExtra && 
                          selectedOptions.acompanhamentos.some(a => {
                            const acomp = item.opcoes?.acompanhamentos?.find(opt => opt.nome === a);
                            return acomp?.tipo === "extra";
                          }) && !isSelected;

                        return (
                          <label 
                            key={acomp.id}
                            className={`flex items-center p-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                              isSelected ? 
                              'border-[#617C33] bg-[#617C33]/10 text-[#280B04]' : 
                              'border-[#E5E7EB] text-[#280B04] hover:border-[#617C33]'
                            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <input
                              type={item.tipo === "churrasco" && isExtra ? "radio" : "checkbox"}
                              name={item.tipo === "churrasco" && isExtra ? "extra" : undefined}
                              checked={isSelected}
                              onChange={() => handleOptionChange("acompanhamentos", acomp.nome)}
                              className="mr-2 accent-[#617C33]"
                              disabled={isDisabled}
                            />
                            {acomp.nome}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {item.opcoes.saladas && (
                  <div>
                    <h4 className="font-medium text-[#280B04] mb-2">Salada (selecione 1):</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.opcoes.saladas.map((salada) => (
                        <label 
                          key={salada.id}
                          className={`flex items-center p-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                            selectedOptions.salada === salada.nome ? 
                            'border-[#617C33] bg-[#617C33]/10 text-[#280B04]' : 
                            'border-[#E5E7EB] text-[#280B04] hover:border-[#617C33]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="salada"
                            checked={selectedOptions.salada === salada.nome}
                            onChange={() => handleOptionChange("salada", salada.nome)}
                            className="mr-2 accent-[#617C33]"
                          />
                          {salada.nome}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {item.opcoes.bebidas && (
                  <div>
                    <h4 className="font-medium text-[#280B04] mb-2">Bebida {item.tipo === "combo" ? "incluída" : "(opcional)"}:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.opcoes.bebidas.map((bebida) => (
                        <div key={bebida.id}>
                          <label 
                            className={`flex items-center p-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                              selectedOptions.bebida === bebida.nome ? 
                              'border-[#617C33] bg-[#617C33]/10 text-[#280B04]' : 
                              'border-[#E5E7EB] text-[#280B04] hover:border-[#617C33]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="bebida"
                              checked={selectedOptions.bebida === bebida.nome}
                              onChange={() => handleOptionChange("bebida", bebida.nome)}
                              className="mr-2 accent-[#617C33]"
                            />
                            <div className="flex items-center">
                              {bebida.imagem && (
                                <img 
                                  src={bebida.imagem} 
                                  alt={bebida.nome}
                                  className="w-8 h-8 rounded-full object-cover mr-2"
                                  loading="lazy"
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
                  <div>
                    <h4 className="font-medium text-[#280B04] mb-2">Toppings (opcional):</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.opcoes.toppings.map((topping) => (
                        <label 
                          key={topping.id}
                          className={`flex items-center p-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                            selectedOptions.toppings.includes(topping.nome) ? 
                            'border-[#617C33] bg-[#617C33]/10 text-[#280B04]' : 
                            'border-[#E5E7EB] text-[#280B04] hover:border-[#617C33]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedOptions.toppings.includes(topping.nome)}
                            onChange={() => handleOptionChange("toppings", topping.nome)}
                            className="mr-2 accent-[#617C33]"
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
          className={`mt-4 w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
            addedToCart ? 
              'bg-[#617C33] text-[#FFF1E4]' : 
              'bg-[#3D1106] hover:bg-[#280B04] text-[#FFB501] shadow-md'
          }`}
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
          <p className="text-[#A92C0D] text-sm mt-3 text-center bg-red-50 p-2 rounded-lg">{validationError}</p>
        )}
      </div>
    </div>
  );
};

// ========== COMPONENTE CART ITEM ========== //
const CartItem = ({ item, index, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 mt-4 border border-[#3D1106] hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="w-20 h-20 rounded-md overflow-hidden mr-4 flex-shrink-0">
          <img 
            src={item.imagem} 
            alt={item.nome} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#280B04]">{item.nome}</h3>
              
              {item.selectedOptions && (
                <div className="mt-1 text-xs text-[#6B7280]">
                  {item.selectedOptions.carnes?.length > 0 && (
                    <p><span className="font-medium">Carnes:</span> {item.selectedOptions.carnes.join(", ")}</p>
                  )}
                  {item.selectedOptions.acompanhamentos?.length > 0 && (
                    <p><span className="font-medium">Acomp:</span> {item.selectedOptions.acompanhamentos.join(", ")}</p>
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
              <p className="text-[#3D1106] font-bold text-base">
                €{(item.precoFinal || item.preco).toFixed(2)}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => onDecrease(index)}
                  className="bg-[#FFB501] hover:bg-[#FFE5BA] text-[#280B04] p-1 rounded-full transition-colors"
                >
                  <Minus size={14} />
                </button>
                
                <span className="text-[#280B04] w-6 text-center text-sm">{item.quantidade}</span>
                
                <button
                  onClick={() => onIncrease(index)}
                  className="bg-[#FFB501] hover:bg-[#FFE5BA] text-[#280B04] p-1 rounded-full transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onRemove(index)}
            className="text-[#A92C0D] hover:text-red-800 mt-2 text-xs flex items-center transition-colors"
          >
            <Trash size={12} className="mr-1" /> Remover
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== COMPONENTE MBWAY PAYMENT ========== //
const MbwayPayment = ({ phone, setPhone, errors, setErrors }) => {
  return (
    <div className="mt-6">
      <label className="block text-[#280B04] mb-2 font-medium">Número de Telemóvel MBWay</label>
      <div className="flex items-center border border-[#E5E7EB] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#3D1106] focus-within:border-transparent">
        <span className="px-4 py-3 bg-[#FFB501] text-[#280B04] font-medium">+351</span>
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
          className="flex-1 p-3 border-0 focus:ring-0"
        />
      </div>
      {errors.mbwayPhone && <p className="text-[#A92C0D] text-sm mt-1">{errors.mbwayPhone}</p>}
      <div className="mt-3 bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
        <p>Será enviado um pedido de pagamento para o número indicado.</p>
        <p className="font-medium mt-1">Número do restaurante: 933 737 672</p>
      </div>
    </div>
  );
};

// ========== COMPONENTE ORDER ITEM (PARA A ÁREA ADMIN) ========== //
const OrderItem = ({ order, onPrint }) => {
  const [expanded, setExpanded] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    onPrint(order);
    setTimeout(() => setIsPrinting(false), 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-[#3D1106] hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-[#280B04]">Pedido #{order.orderNumber}</h3>
          <p className="text-sm text-[#6B7280]">
            {new Date(order.timestamp).toLocaleString('pt-PT')} • {order.entrega ? 'Entrega' : 'Retirada'}
          </p>
          <p className="text-sm font-medium text-[#3D1106] mt-1">
            {order.nome} • {order.contato}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-[#280B04] hover:text-[#3D1106] transition-colors"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className={`p-2 rounded-full transition-colors ${
              isPrinting ? 'bg-gray-200 text-gray-500' : 'bg-[#FFB501] hover:bg-[#FFE5BA] text-[#280B04]'
            }`}
          >
            <Printer size={20} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <div className="mb-4">
            <h4 className="font-medium text-[#280B04] mb-2">Informações do Cliente</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm"><span className="font-medium">Nome:</span> {order.nome}</p>
                <p className="text-sm"><span className="font-medium">Contato:</span> {order.contato}</p>
              </div>
              <div>
                <p className="text-sm"><span className="font-medium">Tipo:</span> {order.entrega ? 'Entrega' : 'Retirada'}</p>
                {order.entrega && (
                  <p className="text-sm"><span className="font-medium">Endereço:</span> {order.endereco}</p>
                )}
              </div>
            </div>
            <p className="text-sm mt-2">
              <span className="font-medium">Pagamento:</span> {order.metodoPagamento === 'mbway' ? `MBWay (${order.mbwayPhone})` : 
                order.metodoPagamento === 'cartao' ? 'Cartão' : 
                order.metodoPagamento === 'multibanco' ? 'Multibanco' : 'Dinheiro'}
            </p>
            {order.observacoes && (
              <p className="text-sm mt-2">
                <span className="font-medium">Observações:</span> {order.observacoes}
              </p>
            )}
          </div>

          <h4 className="font-medium text-[#280B04] mb-2">Itens do Pedido</h4>
          <div className="space-y-3">
            {order.cart.map((item, index) => (
              <div key={index} className="flex justify-between border-b border-[#E5E7EB] pb-2">
                <div>
                  <p className="text-sm font-medium">{item.quantidade}x {item.nome}</p>
                  {item.selectedOptions && (
                    <div className="text-xs text-[#6B7280]">
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
                <p className="text-sm font-medium">
                  €{(item.precoFinal || item.preco * item.quantidade).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal:</span>
              <span>€{order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0).toFixed(2)}</span>
            </div>
            {order.entrega && (
              <div className="flex justify-between">
                <span className="font-medium">Taxa de Entrega:</span>
                <span>€4.00</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-[#E5E7EB]">
              <span>Total:</span>
              <span>€{(order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0) + (order.entrega ? 4 : 0)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
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
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-[#3D1106]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#280B04]">Finalizar Pedido</h2>
      </div>
      
      <div className="mb-8 bg-[#FFFBF7] p-5 rounded-lg border border-[#FFB501]">
        <h3 className="font-semibold text-lg text-[#280B04] mb-4 flex items-center">
          <ShoppingCart className="mr-2" /> Resumo do Pedido
        </h3>
        
        <div className="space-y-3">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b border-[#FFB501] pb-3">
              <span className="text-[#280B04] text-sm">
                {item.quantidade}x {item.nome}
                {item.selectedOptions?.bebida && ` + ${item.selectedOptions.bebida}`}
              </span>
              <span className="font-medium text-[#280B04] text-sm">
                €{(item.precoFinal || item.preco * item.quantidade).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-[#FFB501] mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-[#280B04] text-sm">
            <span>Subtotal:</span>
            <span>€{(total - (entrega ? 4 : 0)).toFixed(2)}</span>
          </div>
          {entrega && (
            <div className="flex justify-between text-[#280B04] text-sm">
              <span>Taxa de Entrega:</span>
              <span>€4.00</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-3 border-t border-[#FFB501] text-[#280B04]">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#FFFBF7] p-5 rounded-lg border border-[#FFB501]">
          <h3 className="font-semibold text-lg text-[#280B04] mb-4">Informações de Entrega</h3>
          
          <DeliveryPickupSelector 
            entrega={entrega} 
            setEntrega={setEntrega} 
            setEndereco={setEndereco}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#280B04] mb-2 font-medium flex items-center">
                <User size={16} className="mr-2" />
                Nome Completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3D1106] focus:border-transparent ${
                  errors.nome ? 'border-[#A92C0D]' : 'border-[#E5E7EB]'
                }`}
                placeholder="Seu nome completo"
              />
              {errors.nome && <p className="text-[#A92C0D] text-sm mt-1">{errors.nome}</p>}
            </div>

            <div>
              <label className="block text-[#280B04] mb-2 font-medium flex items-center">
                <Phone size={16} className="mr-2" />
                Contato (WhatsApp)
              </label>
              <input
                type="tel"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3D1106] focus:border-transparent ${
                  errors.contato ? 'border-[#A92C0D]' : 'border-[#E5E7EB]'
                }`}
                placeholder="Seu número de telefone"
              />
              {errors.contato && <p className="text-[#A92C0D] text-sm mt-1">{errors.contato}</p>}
            </div>
          </div>

          {entrega && (
            <div className="mt-4">
              <label className="block text-[#280B04] mb-2 font-medium flex items-center">
                <MapPin size={16} className="mr-2" />
                Endereço de Entrega
              </label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#3D1106] focus:border-transparent ${
                  errors.endereco ? 'border-[#A92C0D]' : 'border-[#E5E7EB]'
                }`}
                placeholder="Rua, número, bairro, complemento"
              />
              {errors.endereco && <p className="text-[#A92C0D] text-sm mt-1">{errors.endereco}</p>}
            </div>
          )}

          <div className="mt-4">
            <label className="block text-[#280B04] mb-2 font-medium flex items-center">
              <Info size={16} className="mr-2" />
              Observações (opcional)
            </label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] focus:border-transparent"
              placeholder="Alguma observação sobre o pedido?"
              rows={3}
            />
          </div>
        </div>

        <div className="bg-[#FFFBF7] p-5 rounded-lg border border-[#FFB501]">
          <h3 className="font-semibold text-lg text-[#280B04] mb-4">Método de Pagamento</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  metodoPagamento === 'dinheiro' 
                    ? 'border-[#617C33] bg-[#617C33]/10' 
                    : 'border-[#E5E7EB] hover:border-[#617C33]'
                }`}
                onClick={() => setMetodoPagamento('dinheiro')}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    metodoPagamento === 'dinheiro' ? 'bg-[#617C33] text-[#FFF1E4]' : 'bg-[#FFFBF7] text-[#280B04]'
                  }`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#280B04]">Dinheiro</h4>
                    <p className="text-sm text-[#6B7280]">Pagamento na entrega com troco</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  metodoPagamento === 'mbway' 
                    ? 'border-[#617C33] bg-[#617C33]/10' 
                    : 'border-[#E5E7EB] hover:border-[#617C33]'
                }`}
                onClick={() => setMetodoPagamento('mbway')}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    metodoPagamento === 'mbway' ? 'bg-[#617C33] text-[#FFF1E4]' : 'bg-[#FFFBF7] text-[#280B04]'
                  }`}>
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#280B04]">MBWay</h4>
                    <p className="text-sm text-[#6B7280]">Pagamento instantâneo via app</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  metodoPagamento === 'cartao' 
                    ? 'border-[#617C33] bg-[#617C33]/10' 
                    : 'border-[#E5E7EB] hover:border-[#617C33]'
                }`}
                onClick={() => setMetodoPagamento('cartao')}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    metodoPagamento === 'cartao' ? 'bg-[#617C33] text-[#FFF1E4]' : 'bg-[#FFFBF7] text-[#280B04]'
                  }`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#280B04]">Cartão</h4>
                    <p className="text-sm text-[#6B7280]">Débito ou crédito na entrega</p>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  metodoPagamento === 'multibanco' 
                    ? 'border-[#617C33] bg-[#617C33]/10' 
                    : 'border-[#E5E7EB] hover:border-[#617C33]'
                }`}
                onClick={() => setMetodoPagamento('multibanco')}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-3 ${
                    metodoPagamento === 'multibanco' ? 'bg-[#617C33] text-[#FFF1E4]' : 'bg-[#FFFBF7] text-[#280B04]'
                  }`}>
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#280B04]">Multibanco</h4>
                    <p className="text-sm text-[#6B7280]">Pagamento por referência MB</p>
                  </div>
                </div>
              </div>
            </div>
            
            {errors.metodoPagamento && (
              <p className="text-[#A92C0D] text-sm mt-2 bg-red-50 p-2 rounded-lg">{errors.metodoPagamento}</p>
            )}

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

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-[#FFB501] hover:bg-[#FFE5BA] text-[#280B04] py-3 px-4 rounded-lg font-medium transition-colors shadow-sm"
          >
            Voltar à Ementa
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#3D1106] hover:bg-[#280B04] text-[#FFB501] py-3 px-4 rounded-lg font-medium transition-colors shadow-md"
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
    <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto border border-[#3D1106]">
      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
        <Check size={32} className="text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-[#280B04] mb-2">Pedido Confirmado!</h2>
      <p className="text-[#280B04] mb-1">Número do pedido:</p>
      <p className="text-3xl font-bold text-[#3D1106] mb-6">#{orderNumber}</p>
      
      <div className="bg-blue-50 p-5 rounded-lg text-left mb-6">
        <div className="flex items-start mb-4">
          <Calendar size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Data e Hora</h3>
            <p className="text-blue-700 text-sm">
              {formattedDate} às {formattedTime}
            </p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <Clock size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Tempo de Preparo</h3>
            <p className="text-blue-700 text-sm">
              Seu pedido estará pronto em aproximadamente <span className="font-medium">30-45 minutos</span>.
              Enviaremos atualizações pelo WhatsApp.
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <CreditCard size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
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
        className="w-full bg-[#3D1106] hover:bg-[#280B04] text-[#FFB501] py-3 px-4 rounded-lg font-medium transition-colors shadow-md"
      >
        Fazer Novo Pedido
      </button>
    </div>
  );
};

// ========== COMPONENTE ADMIN DASHBOARD ========== //
const AdminDashboard = ({ orders, onPrintOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.orderNumber.toString().includes(searchTerm) ||
                         order.contato.includes(searchTerm);
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'delivery' && order.entrega) || 
                         (filter === 'pickup' && !order.entrega);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#280B04] mb-8">Painel de Pedidos</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-[#3D1106]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[#280B04] mb-2 font-medium">Buscar Pedidos</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, número ou contato..."
              className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#3D1106] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-[#280B04] mb-2 font-medium">Filtrar por Tipo</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-[#3D1106] text-[#FFB501]' : 'bg-[#E5E7EB] text-[#280B04]'}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('delivery')}
                className={`px-4 py-2 rounded-lg ${filter === 'delivery' ? 'bg-[#3D1106] text-[#FFB501]' : 'bg-[#E5E7EB] text-[#280B04]'}`}
              >
                Entrega
              </button>
              <button
                onClick={() => setFilter('pickup')}
                className={`px-4 py-2 rounded-lg ${filter === 'pickup' ? 'bg-[#3D1106] text-[#FFB501]' : 'bg-[#E5E7EB] text-[#280B04]'}`}
              >
                Retirada
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#280B04]">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'Pedido' : 'Pedidos'} Encontrados
          </h2>
        </div>
        
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <List size={48} className="mx-auto text-[#6B7280] mb-4" />
            <p className="text-[#280B04]">Nenhum pedido encontrado</p>
            <p className="text-[#280B04] text-sm mt-2">Tente ajustar seus filtros de busca</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((order) => (
                <OrderItem 
                  key={order.orderNumber} 
                  order={order} 
                  onPrint={onPrintOrder}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => {
  const handleAddressClick = () => {
    const address = "Cozinha da Vivi, Estr. de Alvor, São Sebastião, 8500-769 Portimão";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <footer className="bg-[#FFB501] text-[#3D1106] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hours Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horário</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[#3D1106] pb-2">
                <span>Segunda-feira:</span>
                <span className="font-medium">Fechado</span>
              </div>
              <div className="flex justify-between border-b border-[#3D1106] pb-2">
                <span>Terça a Sábado:</span>
                <span className="font-medium">12:00 - 14:45</span>
              </div>
              <div className="flex justify-between border-b border-[#3D1106] pb-2">
                <span>Terça a Sábado:</span>
                <span className="font-medium">19:00 - 21:30</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span className="font-medium">12:00 - 14:45</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Contactos</h3>
            <div className="flex items-center">
              <Phone className="text-[#3D1106] mr-3" size={20} />
              <a href="tel:+351933737672" className="hover:text-[#280B04] transition-colors">
                (93) 373-7672
              </a>
            </div>
          </div>
          
          {/* Location Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Localização</h3>
            <div 
              className="flex items-start cursor-pointer hover:text-[#280B04] transition-colors"
              onClick={handleAddressClick}
            >
              <MapPin className="text-[#3D1106] mr-3 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="hover:underline">Cozinha da Vivi, Estr. de Alvor, São Sebastião</p>
                <p className="hover:underline">8500-769 Portimão</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 pt-4">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-[#3D1106] hover:text-[#280B04] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-[#3D1106] hover:text-[#280B04] transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-[#3D1106] mt-8 pt-8 text-center text-sm">
          © {new Date().getFullYear()} Churrascaria Gaúcha. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

// ========== COMPONENTE PRINCIPAL (ORDERBOT) ========== //
export default function OrderBot() {
  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Erro ao carregar do localStorage:", error);
      return defaultValue;
    }
  };

  const [cart, setCart] = useState(() => loadFromLocalStorage('cart', []));
  const [step, setStep] = useState(() => loadFromLocalStorage('step', 1));
  const [openCategory, setOpenCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [nome, setNome] = useState(() => loadFromLocalStorage('nome', ""));
  const [endereco, setEndereco] = useState(() => loadFromLocalStorage('endereco', ""));
  const [contato, setContato] = useState(() => loadFromLocalStorage('contato', ""));
  const [entrega, setEntrega] = useState(() => loadFromLocalStorage('entrega', false));
  const [metodoPagamento, setMetodoPagamento] = useState(() => loadFromLocalStorage('metodoPagamento', ""));
  const [mbwayPhone, setMbwayPhone] = useState(() => loadFromLocalStorage('mbwayPhone', ""));
  const [observacoes, setObservacoes] = useState(() => loadFromLocalStorage('observacoes', ""));
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('adminOrders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('step', JSON.stringify(step));
    localStorage.setItem('nome', JSON.stringify(nome));
    localStorage.setItem('endereco', JSON.stringify(endereco));
    localStorage.setItem('contato', JSON.stringify(contato));
    localStorage.setItem('entrega', JSON.stringify(entrega));
    localStorage.setItem('metodoPagamento', JSON.stringify(metodoPagamento));
    localStorage.setItem('mbwayPhone', JSON.stringify(mbwayPhone));
    localStorage.setItem('observacoes', JSON.stringify(observacoes));
    localStorage.setItem('adminOrders', JSON.stringify(orders));
  }, [cart, step, nome, endereco, contato, entrega, metodoPagamento, mbwayPhone, observacoes, orders]);

  const resetToMenu = () => {
    setOpenCategory(null);
    setIsCartOpen(false);
    setStep(1);
  };

  const printOrder = (order) => {
    const printContent = `
      <html>
        <head>
          <title>Pedido #${order.orderNumber}</title>
          <style>
            @page {
              size: auto;
              margin: 0mm;
            }
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 2px solid #3D1106;
              padding-bottom: 10px;
            }
            .header h1 {
              color: #3D1106;
              margin: 0;
              font-size: 24px;
            }
            .header .order-number {
              font-size: 18px;
              font-weight: bold;
              margin-top: 5px;
            }
            .info-section {
              margin-bottom: 20px;
            }
            .info-section h2 {
              color: #3D1106;
              font-size: 18px;
              border-bottom: 1px solid #3D1106;
              padding-bottom: 5px;
              margin-bottom: 10px;
            }
            .info-row {
              display: flex;
              margin-bottom: 5px;
            }
            .info-label {
              font-weight: bold;
              min-width: 120px;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .items-table th {
              background-color: #3D1106;
              color: white;
              text-align: left;
              padding: 8px;
            }
            .items-table td {
              padding: 8px;
              border-bottom: 1px solid #ddd;
            }
            .items-table tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            .total-row {
              font-weight: bold;
              background-color: #FFB501 !important;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #777;
            }
            .options {
              font-size: 12px;
              color: #555;
              margin-top: 3px;
            }
            @media print {
              body {
                padding: 10px;
              }
              button {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Churrascaria Gaúcha</h1>
            <div class="order-number">Pedido #${order.orderNumber}</div>
            <div>${new Date(order.timestamp).toLocaleString('pt-PT')}</div>
          </div>
          
          <div class="info-section">
            <h2>Informações do Cliente</h2>
            <div class="info-row">
              <div class="info-label">Nome:</div>
              <div>${order.nome}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Contato:</div>
              <div>${order.contato}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Tipo:</div>
              <div>${order.entrega ? 'Entrega' : 'Retirada no local'}</div>
            </div>
            ${order.entrega ? `
            <div class="info-row">
              <div class="info-label">Endereço:</div>
              <div>${order.endereco}</div>
            </div>
            ` : ''}
            <div class="info-row">
              <div class="info-label">Pagamento:</div>
              <div>${order.metodoPagamento === 'mbway' ? `MBWay (${order.mbwayPhone})` : 
                  order.metodoPagamento === 'cartao' ? 'Cartão' : 
                  order.metodoPagamento === 'multibanco' ? 'Multibanco' : 'Dinheiro'}</div>
            </div>
            ${order.observacoes ? `
            <div class="info-row">
              <div class="info-label">Observações:</div>
              <div>${order.observacoes}</div>
            </div>
            ` : ''}
          </div>
          
          <div class="info-section">
            <h2>Itens do Pedido</h2>
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
                        <div class="options">
                          ${item.selectedOptions.carnes?.length > 0 ? `<div>Carnes: ${item.selectedOptions.carnes.join(', ')}</div>` : ''}
                          ${item.selectedOptions.acompanhamentos?.length > 0 ? `<div>Acomp: ${item.selectedOptions.acompanhamentos.join(', ')}</div>` : ''}
                          ${item.selectedOptions.salada ? `<div>Salada: ${item.selectedOptions.salada}</div>` : ''}
                          ${item.selectedOptions.bebida ? `<div>Bebida: ${item.selectedOptions.bebida}</div>` : ''}
                          ${item.selectedOptions.toppings?.length > 0 ? `<div>Toppings: ${item.selectedOptions.toppings.join(', ')}</div>` : ''}
                        </div>
                      ` : ''}
                    </td>
                    <td>${item.quantidade}</td>
                    <td>€${(item.precoFinal || item.preco).toFixed(2)}</td>
                    <td>€${((item.precoFinal || item.preco) * item.quantidade).toFixed(2)}</td>
                  </tr>
                `).join('')}
                <tr>
                  <td colspan="3" style="text-align: right;">Subtotal:</td>
                  <td>€${order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0).toFixed(2)}</td>
                </tr>
                ${order.entrega ? `
                <tr>
                  <td colspan="3" style="text-align: right;">Taxa de Entrega:</td>
                  <td>€4.00</td>
                </tr>
                ` : ''}
                <tr class="total-row">
                  <td colspan="3" style="text-align: right;">Total:</td>
                  <td>€${(order.cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0) + (order.entrega ? 4 : 0)).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="footer">
            Pedido gerado em ${new Date(order.timestamp).toLocaleString('pt-PT')}
          </div>
          
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            }
          </script>
        </body>
      </html>
    `;
    
    // Criar um iframe oculto para impressão automática
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
    
    // Remover o iframe após a impressão
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  const sendOrderToWhatsApp = (orderNumber) => {
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

    const itemsText = cart.map(item => {
      let itemText = `${item.quantidade}x *${item.nome}* - €${(item.precoFinal || item.preco).toFixed(2)}`;
      if (item.selectedOptions) {
        if (item.selectedOptions.carnes?.length > 0) {
          itemText += `\n  🥩 *Carnes:* ${item.selectedOptions.carnes.join(", ")}`;
        }
        if (item.selectedOptions.acompanhamentos?.length > 0) {
          itemText += `\n  🍚 *Acomp:* ${item.selectedOptions.acompanhamentos.join(", ")}`;
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

    const subtotal = cart.reduce((sum, item) => sum + (item.precoFinal || item.preco) * item.quantidade, 0);
    const total = subtotal + (entrega ? 4 : 0);

    const message = `*🍖 NOVO PEDIDO #${orderNumber} - CHURRASCARIA GAÚCHA* 🍖\n\n` +
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

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/351933737672?text=${encodedMessage}`, '_blank');
  };

  const handleSubmitOrder = () => {
    const newOrderNumber = Math.floor(10000 + Math.random() * 90000);
    const timestamp = new Date().toISOString();
    
    const newOrder = {
      orderNumber: newOrderNumber,
      cart: [...cart],
      nome,
      contato,
      endereco,
      entrega,
      metodoPagamento,
      mbwayPhone,
      observacoes,
      timestamp
    };
    
    setOrders([...orders, newOrder]);
    setOrderNumber(newOrderNumber);
    setOrderSubmitted(true);
    
    // Imprimir o pedido automaticamente
    printOrder(newOrder);
    
    // Enviar para o WhatsApp
    sendOrderToWhatsApp(newOrderNumber);
    
    // Limpar localStorage do cliente
    localStorage.removeItem('cart');
    localStorage.removeItem('step');
    localStorage.removeItem('nome');
    localStorage.removeItem('endereco');
    localStorage.removeItem('contato');
    localStorage.removeItem('entrega');
    localStorage.removeItem('metodoPagamento');
    localStorage.removeItem('mbwayPhone');
    localStorage.removeItem('observacoes');
    
    setStep(3);
  };
  
  const handlePrintOrder = (order) => {
    printOrder(order);
  };
  
  useEffect(() => {
    if (orderSubmitted && orderNumber) {
      setOrderSubmitted(false);
    }
  }, [orderSubmitted, orderNumber]);
  
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
    setOpenCategory(null);
    setIsCartOpen(false);
    setOrderNumber(null);
    setOrderSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF1E8]">
      <Navbar 
        cart={cart} 
        setIsCartOpen={setIsCartOpen}
        resetToMenu={resetToMenu}
        setStep={setStep}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
      />
      
      <main className="container mx-auto px-4 py-6 pb-24">
        {isAdminView ? (
          <AdminDashboard 
            orders={orders} 
            onPrintOrder={handlePrintOrder}
          />
        ) : step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Menu Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#280B04] mb-6">Ementa</h2>
              
              <SpecialPromoBanner />
              
              <div className="space-y-8">
                {ementa.map((category) => (
                  <div key={category.id} className="bg-[#FFfbf7] rounded-xl shadow-sm overflow-hidden border border-[#3D1106]">
                    <button
                      onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                      className="w-full flex justify-between items-center p-5 hover:bg-[#FFE5BA]"
                    >
                      <div className="flex items-center">
                        {category.imagem && (
                          <div className="w-12 h-12 rounded-md overflow-hidden mr-4">
                            <img 
                              src={category.imagem} 
                              alt={category.nome} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <h3 className="text-lg font-semibold text-[#280B04]">{category.nome}</h3>
                      </div>
                      {openCategory === category.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {openCategory === category.id && (
                      <div className="px-5 pb-5">
                        {category.subcategorias ? (
                          category.subcategorias.map((subcat) => (
                            <div key={subcat.nome} className="mb-6">
                              <h4 className="font-medium text-[#280B04] text-sm uppercase tracking-wider mb-3">
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
              <div className="bg-[#FFFBF7] rounded-xl shadow-md p-5 sticky top-24 border border-[#3D1106]">
                <h2 className="text-xl font-bold text-[#3D1106] mb-4 flex items-center">
                  <ShoppingCart className="mr-2" /> Seu Pedido
                </h2>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart size={48} className="mx-auto text-[#6B7280] mb-4" />
                    <p className="text-[#3D1106]">O seu carrinho está vazio</p>
                    <p className="text-[#3D1106] text-sm mt-2">Adicione itens para continuar</p>
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

                    <div className="border-t border-[#3D1106] pt-4">
                      <div className="flex justify-between mb-1 text-[#FFF1E4] text-sm">
                        <span>Subtotal:</span>
                        <span>€{subtotal.toFixed(2)}</span>
                      </div>
                      {entrega && (
                        <div className="flex justify-between mb-1 text-[#FFF1E4] text-sm">
                          <span>Taxa de Entrega:</span>
                          <span>€4.00</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-[#3D1106] text-[#FFF1E4]">
                        <span>Total:</span>
                        <span>€{total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={cart.length === 0}
                      className={`w-full py-3 px-4 rounded-lg font-medium mt-4 transition-colors ${
                        cart.length === 0 ? 
                        'bg-gray-200 text-gray-500 cursor-not-allowed' : 
                        'bg-[#FFB501] hover:bg-[#FFE5BA] text-[#280B04] shadow-md'
                      }`}
                    >
                      Finalizar Pedido
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : step === 2 ? (
          <CheckoutForm
            cart={cart}
            total={total}
            onBack={resetToMenu}
            onSubmit={handleSubmitOrder}
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
        ) : (
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
          
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FFFBF7] shadow-xl z-30 p-4 overflow-y-auto transform transition-transform duration-300 ease-out">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#3D1106]">
              <h2 className="text-xl font-bold text-[#280B04]">Seu Pedido</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-[#280B04] hover:text-[#3D1106] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="mx-auto text-[#6B7280] mb-4" />
                <p className="text-[#280B04]">O seu carrinho está vazio</p>
                <p className="text-[#280B04] text-sm mt-2">Adicione itens para continuar</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    if (step !== 1) {
                      resetToMenu();
                    }
                  }}
                  className="mt-4 bg-[#FFB501] hover:bg-[#FFE5BA] text-[#280B04] py-2 px-4 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Voltar à Ementa
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

                <div className="border-t border-[#3D1106] pt-4 mt-4">
                  <div className="flex justify-between mb-1 text-[#280B04] text-sm">
                    <span>Subtotal:</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  {entrega && (
                    <div className="flex justify-between mb-1 text-[#280B04] text-sm">
                      <span>Taxa de Entrega:</span>
                      <span>€4.00</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-[#3D1106] text-[#280B04]">
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
                    className="fixed bottom-4 left-4 right-4 bg-[#FFB501] hover:bg-[#FFE5BA] text-[#280B04] py-3 rounded-lg font-medium shadow-md"
                  >
                    Finalizar Pedido
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="fixed bottom-4 left-4 right-4 bg-[#FFB501] hover:bg-[#FFE5BA] text-[#280B04] py-3 rounded-lg font-medium shadow-md"
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
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#3D1106] p-4 shadow-lg z-10">
          <button
            onClick={() => {
              setStep(2);
              setIsCartOpen(false);
            }}
            className="w-full bg-[#FFB501] hover:bg-[#FFE5BA] text-[#280B04] py-3 rounded-lg font-medium shadow-md flex justify-between items-center px-6"
          >
            <span>Finalizar Pedido</span>
            <span>€{total.toFixed(2)}</span>
          </button>
        </div>
      )}

      {!isAdminView && step !== 3 && <Footer />}
    </div>
  );
}