import { useService } from "../context/ServiceContext";
import { FaWhatsapp } from "react-icons/fa";
import { MdPhoneForwarded } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

function SaleCard({ sale, onUpdate }) {
  const { getSales, deleteSale, clients } = useService();

  const client = clients.find((client) => client.firstName === sale.customer);
  const phoneNumber = client ? client.phoneNumber : "";

  const handleDelete = async (id) => {
    await deleteSale(id);
    await getSales();
  };
  return (
    <>
      <div className="bg-slate-100 my-2 rounded-md">
        <div
          className={`text-white ${
            sale.state === "Pagado" ? "bg-green-500" : ""
          } ${sale.state === "Parcial" ? "bg-yellow-400" : ""} ${
            sale.state === "Pendiente" ? "bg-red-500" : ""
          }
        rounded-t-md py-2`}
        >
          <div className="grid grid-cols-2">
            <p className="ps-3">Cantidad: {sale.quantity}</p>
            <p>Precio: ${sale.price}</p>
            <p className="ps-3">Total: ${sale.total}</p>
            <p>
              Estado: {sale.state === "Pagado" ? "" : "Pago"} {sale.state}
            </p>
            <p className="ps-3">Cliente: {sale.customer}</p>
            <p>Metodo: {sale.half}</p>
          </div>
          {sale.details === "" ? (
            ""
          ) : (
            <p className="ps-3">Detalles: {sale.details}</p>
          )}
        </div>
        <div className="flex justify-evenly py-4">
          <a
            href={`tel:${phoneNumber}`}
            target="_blank"
            className="flex flex-col items-center"
          >
            <MdPhoneForwarded className="text-2xl" />
            LLamar
          </a>
          <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            className="flex flex-col items-center"
          >
            <FaWhatsapp className="text-2xl" />
            Whatsapp
          </a>
          <button
            onClick={() => onUpdate(sale)}
            className="flex flex-col items-center"
          >
            <GrDocumentUpdate className="text-2xl" />
            Actualizar
          </button>
          <button
            onClick={() => handleDelete(sale._id)}
            className="flex flex-col items-center"
          >
            <RiDeleteBin6Line className="text-2xl" />
            Borrar
          </button>
        </div>
      </div>
    </>
  );
}

export default SaleCard;
