import { MdDelete } from "react-icons/md";
import { CgMoreR } from "react-icons/cg";
import { useService } from "../context/ServiceContext";

function TripCard({ trip }) {
  const { deleteTrip, getTrips } = useService();

  const handleDelete = async (id) => {
    await deleteTrip(id);
    await getTrips();
  };

  return (
    <div className="bg-slate-200 my-2 rounded-lg">
      <div className="bg-slate-300 rounded-t-lg">
        <div className="flex flex-col px-2 py-4 gap-y-2">
          <div className="grid grid-cols-2">
            <h3>Ingresos:{trip.income}</h3>
            <h3>Egresos:{trip.expenses}</h3>
            <h3>Balance:{trip.balance}</h3>
          </div>
          <div className="flex flex-col">
            <p>Creado:{trip.createdAt}</p>
            <p>Actualizacion:{trip.updatedAt}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-around px-4 py-6">
        <button className="flex flex-col items-center">
          <CgMoreR className="text-2xl" />
          <p>Detalles</p>
        </button>
        <button
          className="flex flex-col items-center"
          onClick={() => handleDelete(trip._id)}
        >
          <MdDelete className="text-2xl" />
          <p>Borrar</p>
        </button>
      </div>
    </div>
  );
}

export default TripCard;
