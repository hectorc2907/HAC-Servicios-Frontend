import { FaPhoneVolume } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

function ClientCard({ client }) {
  return (
    <div className="bg-slate-200 my-2 rounded-lg">
      <div className="bg-slate-300 rounded-t-lg">
        <div className="flex justify-evenly p-2">
          <h2>{client.firstName}</h2>
          <h2>{client.lastName}</h2>
        </div>
        <p className="text-center">{client.address}</p>
      </div>
      <div className="flex justify-around px-4 py-6">
        <button className="flex flex-col items-center">
          <FaPhoneVolume className="text-2xl" />
          <p>Llamar</p>
        </button>
        <button className="flex flex-col items-center">
          <GrUpdate className="text-2xl" />
          <p>Actualizar</p>
        </button>
        <button className="flex flex-col items-center">
          <MdDelete className="text-2xl" />
          <p>Borrar</p>
        </button>
      </div>
    </div>
  );
}

export default ClientCard;
