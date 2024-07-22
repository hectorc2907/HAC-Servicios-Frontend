import { useService } from "../context/ServiceContext";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

function BillCard({ bill, onUpdate }) {
  const { getBills, deleteBill } = useService();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de que deseas borrar el gasto?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E74C3C",
      cancelButtonColor: "#2ECC71",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBill(id);
        await getBills();
        Swal.fire("¡Borrado!", "El gasto ha sido borrado.", "success");
      }
    });
  };
  return (
    <>
      <div className="bg-slate-100 my-2 rounded-md">
        <div className={`bg-blue-500 text-white rounded-t-lg py-2`}>
          <div className="grid grid-cols-1">
            <p className="ps-3">Tipo de Gasto: {bill.types}</p>
            <p className="ps-3">Valor: ${bill.value}</p>
            {bill.description === "" ? (
              ""
            ) : (
              <p className="ps-3">Detalles: {bill.description}</p>
            )}
          </div>
        </div>
        <div className="flex justify-evenly py-4">
          <button
            className="flex flex-col items-center"
            onClick={() => onUpdate(bill)}
          >
            <GrDocumentUpdate className="text-2xl" />
            <p>Actualizar</p>
          </button>
          <button
            className="flex flex-col items-center"
            onClick={() => handleDelete(bill._id)}
          >
            <RiDeleteBin6Line className="text-2xl" />
            <p>Borrar</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default BillCard;
