import { useService } from "../context/ServiceContext";

function SaleCard({ sale, onUpdate }) {
  const { getSales, deleteSale } = useService();

  console.log(sale._id);

  const handleDelete = async (id) => {
    await deleteSale(id);
    await getSales();
  };
  return (
    <>
      <li>{sale.quantity}</li>
      <li>{sale.price}</li>
      <li>{sale.total}</li>
      <li>{sale.customer}</li>
      <li>
        <button onClick={() => onUpdate(sale)}>Actualizar</button>
      </li>
      <li>
        <button onClick={() => handleDelete(sale._id)}>Borrar</button>
      </li>
    </>
  );
}

export default SaleCard;
