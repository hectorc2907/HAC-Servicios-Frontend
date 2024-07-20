import { useEffect } from "react";
import { useService } from "../../context/ServiceContext";
import { FiPlusCircle } from "react-icons/fi";
import { MoonLoader } from "react-spinners";
import TripCard from "../../components/TripCard";
import { useForm } from "react-hook-form";

function TripPage() {
  const { trips, getTrips, createTrip, loading } = useService();
  const { handleSubmit } = useForm();

  useEffect(() => {
    getTrips();
  }, []);

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const onSubmit = handleSubmit(async () => {
    await createTrip();
    await getTrips();
  });
  return (
    <div>
      <h1 className="text-center text-3xl">Viajes</h1>
      <div className="flex justify-center mt-3 mb-2">
        <form onSubmit={onSubmit}>
          <button
            type="submit"
            className="bg-slate-200 rounded-lg p-4 flex flex-col items-center"
          >
            <FiPlusCircle className="text-3xl" />
            <p>Agregar</p>
          </button>
        </form>
      </div>
      {loading ? (
        <div className="flex h-[calc(100vh-400px)] items-center justify-center">
          <MoonLoader color="#0d16fc" />
        </div>
      ) : trips.length === 0 ? (
        <h1 className="flex h-[calc(100vh-400px)] items-center justify-center text-2xl">
          No hay Viajes
        </h1>
      ) : (
        <>
          {sortedTrips.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </>
      )}
    </div>
  );
}

export default TripPage;
