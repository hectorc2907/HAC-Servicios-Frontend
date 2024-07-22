import { MdPhoneForwarded } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { useService } from "../context/ServiceContext";
import Swal from "sweetalert2";


function ClientCard({ client, onUpdate }) {
  const { getClients, deleteClient } = useService();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de que deseas borrar el cliente?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E74C3C",
      cancelButtonColor: "#2ECC71",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteClient(id);
        await getClients();
        Swal.fire("¡Borrado!", "El cliente ha sido borrado.", "success");
      }
    });
  };
  return (
    <div className="bg-slate-100 my-2 rounded-lg">
      <div className="text-white bg-blue-500 rounded-t-lg py-2">
        <div className="grid grid-cols-1 px-5">
          <p>Nombre: {client.firstName}</p>
          <p>Apodo: {client.nickName}</p>
          <p>Direccion: {client.address}</p>
        </div>
      </div>
      <div className="flex justify-evenly py-4">
        <a
          href={`tel:${client.phoneNumber}`}
          target="_blank"
          className="flex flex-col items-center"
        >
          <MdPhoneForwarded className="text-2xl" />
          LLamar
        </a>
        <a
          href={`https://wa.me/${client.phoneNumber}`}
          target="_blank"
          className="flex flex-col items-center"
        >
          <FaWhatsapp className="text-2xl" />
          Whatsapp
        </a>
        <button
          className="flex flex-col items-center"
          onClick={() => onUpdate(client)}
        >
          <GrDocumentUpdate className="text-2xl" />
          <p>Actualizar</p>
        </button>
        <button
          className="flex flex-col items-center"
          onClick={() => handleDelete(client._id)}
        >
          <RiDeleteBin6Line className="text-2xl" />
          <p>Borrar</p>
        </button>
      </div>
    </div>
  );
}

export default ClientCard;
