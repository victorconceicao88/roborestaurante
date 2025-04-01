import { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';

const KitchenPrint = ({ order = {}, onClose = () => {} }) => {
  const printRef = useRef();

  // Objeto seguro com valores padrão
  const safeOrder = {
    orderNumber: order.orderNumber || 'N/A',
    cart: Array.isArray(order.cart) ? order.cart : [],
    timestamp: order.timestamp || new Date().toISOString(),
    observacoes: order.observacoes || ''
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page { 
        size: 80mm 200mm;
        margin: 0;
        padding: 0;
      }
      body {
        font-family: Arial, sans-serif;
        padding: 5mm;
        font-size: 12px;
        width: 70mm;
      }
      .header {
        text-align: center;
        margin-bottom: 5px;
        font-weight: bold;
        font-size: 14px;
      }
      .item {
        margin-bottom: 5px;
      }
      .options {
        margin-left: 5px;
        font-size: 11px;
      }
      hr {
        border-top: 1px dashed #000;
        margin: 5px 0;
      }
      .observations {
        margin-top: 5px;
        font-style: italic;
      }
    `,
    onAfterPrint: onClose,
    removeAfterPrint: false
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      handlePrint().catch(error => {
        console.error('Erro ao imprimir:', error);
        onClose();
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [handlePrint, onClose]);

  return (
    <div style={{ position: 'fixed', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
      <div ref={printRef}>
        <div className="header">
          ⭐ PEDIDO #{safeOrder.orderNumber} ⭐
          <div>
            {new Date(safeOrder.timestamp).toLocaleTimeString('pt-BR', {
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </div>
        </div>

        <hr />

        <div className="items">
          {safeOrder.cart.map((item, index) => {
            const safeItem = {
              nome: item.nome || 'Item sem nome',
              quantidade: item.quantidade || 1,
              selectedOptions: item.selectedOptions || {}
            };

            return (
              <div key={index} className="item">
                <div><strong>{safeItem.quantidade}x {safeItem.nome}</strong></div>
                {Object.keys(safeItem.selectedOptions).length > 0 && (
                  <div className="options">
                    {Object.entries(safeItem.selectedOptions)
                      .filter(([_, value]) => value && (Array.isArray(value) ? value.length > 0 : value))
                      .map(([key, value]) => (
                        <div key={key}>
                          ➡ {key}: {Array.isArray(value) ? value.join(', ') : value}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {safeOrder.observacoes && (
          <>
            <hr />
            <div className="observations">
              <div><strong>OBSERVAÇÕES:</strong> {safeOrder.observacoes}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KitchenPrint;