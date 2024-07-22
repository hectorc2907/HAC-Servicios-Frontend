import { useForm } from "react-hook-form";
import { useService } from "../context/ServiceContext";
import { useEffect } from "react";

function TripModal({ isOpen, onClose, trip }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { getTrips, createTrip, updateTrip } = useService();

  useEffect(() => {
    if (trip) {
      setValue("kgTotal", trip.kgTotal);
    } else {
      setValue("kgTotal", "");
    }
  }, [trip, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    data.kgTotal = Number(data.kgTotal);
    if (trip) {
      await updateTrip(trip._id, data);
    } else {
      await createTrip(data);
      setValue("kgTotal", "");
    }
    await getTrips();
    onClose();
  });
  if (!isOpen) return null;
  return (
    <div className="px-2 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-slate-100 w-full p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl mb-2">
          {trip ? "Actualizar Datos" : "Viaje Nuevo"}
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col w-full gap-x-10 my-5">
            <div>
              <label htmlFor="kgTotal" className="flex justify-center text-md">
                Kilos Totales
              </label>
              <input
                id="kgTotal"
                type="number"
                className="w-full px-4 py-2 rounded-lg my-2"
                {...register("kgTotal", {
                  required: "Los kilos son requerido",
                  min: { value: 10, message: "Debe ser mayor que 10Kg" },
                })}
                placeholder="Kilos Totales"
              />
              {errors.kgTotal && (
                <p className="text-red-500 text-xs">{errors.kgTotal.message}</p>
              )}
            </div>
          </div>
          <div className="flex gap-x-2 justify-end">
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {trip ? "Actualizar Datos" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TripModal;
