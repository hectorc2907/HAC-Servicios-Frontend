function SaleCard({ sale, onUpdate }) {
  return (
    <>
      <li>{sale.quantiy}</li>
      <li>{sale.price}</li>
      <li>{sale.total}</li>
      <li>{sale.customer}</li>
      <li>
        <button onClick={() => onUpdate(sale)}>Actualizar</button>
      </li>
      <li>
        <button>Borrar</button>
      </li>
    </>
  );
}

export default SaleCard;
