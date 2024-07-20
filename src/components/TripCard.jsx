import { RiDeleteBin6Line } from "react-icons/ri";
import { GoBriefcase } from "react-icons/go";
import { GoAlert } from "react-icons/go";
import { useService } from "../context/ServiceContext";
import { Link } from "react-router-dom";

function TripCard({ trip }) {
  const { deleteTrip, getTrips } = useService();

  const handleDelete = async (id) => {
    await deleteTrip(id);
    await getTrips();
  };

  return (
    <div className="bg-slate-100 my-2 rounded-md">
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
      <div className="flex justify-evenly py-4">
        <Link to={`/sale/${trip._id}`} className="flex flex-col items-center">
          <GoBriefcase className="text-2xl" />
          <p>Vender</p>
        </Link>
        <Link to={`/bills/${trip._id}`} className="flex flex-col items-center">
          <GoAlert className="text-2xl" />
          <p>Gastos</p>
        </Link>
        <button
          className="flex flex-col items-center"
          disabled
          onClick={() => handleDelete(trip._id)}
        >
          <RiDeleteBin6Line className="text-2xl" />
          <p>Borrar</p>
        </button>
      </div>
    </div>
  );
}

export default TripCard;
