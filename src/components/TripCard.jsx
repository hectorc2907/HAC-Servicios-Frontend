import { RiDeleteBin6Line } from "react-icons/ri";
import { GoBriefcase } from "react-icons/go";
import { GoAlert } from "react-icons/go";
import { useService } from "../context/ServiceContext";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateFormated";

function TripCard({ trip }) {
  const { deleteTrip, getTrips } = useService();

  const handleDelete = async (id) => {
    await deleteTrip(id);
    await getTrips();
  };

  return (
    <div className="bg-slate-100 my-2 rounded-md">
      <div className="bg-blue-500 rounded-t-lg py-2">
        <div className="text-white flex flex-col px-2 py-4 gap-y-2">
          <div className="grid grid-cols-2">
            <p className="ps-3">Ingresos: ${trip.income}</p>
            <p>Egresos: ${trip.expenses}</p>
            <p className="ps-3">Balance: ${trip.balance}</p>
            <p>Creado:{formatDate(trip.createdAt)}</p>
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
