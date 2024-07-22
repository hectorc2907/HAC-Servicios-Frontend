import { useForm } from "react-hook-form";
import { useService } from "../context/ServiceContext";
import { useEffect } from "react";

function BillModal({ tripId, isOpen, onClose, bill }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { getBills, createBill, updateBill } = useService();

  useEffect(() => {
    if (bill) {
      setValue("types", bill.types);
      setValue("value", bill.value);
      setValue("description", bill.description);
    } else {
      setValue("types", "");
      setValue("value", "");
      setValue("description", "");
    }
  }, [bill, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    data.value = Number(data.value);
    data.tripId = tripId;
    if (bill) {
      await updateBill(bill._id, data);
    } else {
      await createBill(data);
      setValue("types", "");
      setValue("value", "");
      setValue("description", "");
    }
    await getBills();
    onClose();
  });
  if (!isOpen) return null;
  return (
    <div className="px-2 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-slate-100 w-full p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl mb-2">
          {bill ? "Actualizar Gasto" : "Gasto Nuevo"}
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col w-full gap-x-10 my-5">
            <div className="mb-5">
              <label htmlFor="types" className="flex justify-center text-md">
                Tipo de Gasto:
              </label>
              <select
                id="types"
                className="w-full px-4 py-2 rounded-lg my-2"
                {...register("types", {
                  required: "Selecciona el tipo de gasto",
                })}
                value={watch("types") || ""}
              >
                <option value="" disabled>
                  Seleccionar Tipo
                </option>
                <option value="Producto">Producto</option>
                <option value="Combustible">Combustible</option>
                <option value="Documentos">Documentos</option>
                <option value="Peaje">Peaje</option>
                <option value="Comida">Comida</option>
                <option value="Otros">Otros</option>
              </select>
              {errors.types && (
                <p className="text-red-500 text-xs">{errors.types.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="value" className="flex justify-center text-md">
                Valor
              </label>
              <input
                id="value"
                type="number"
                className="w-full px-4 py-2 rounded-lg my-2"
                {...register("value", {
                  required: "El valor es requerido",
                  min: { value: 100, message: "Debe ser mayor que $100" },
                })}
                placeholder="Valor"
              />
              {errors.value && (
                <p className="text-red-500 text-xs">{errors.value.message}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="description" className="flex justify-center text-md">
              Descripcion
            </label>
            <input
              id="description"
              type="text"
              className="w-full px-4 py-2 rounded-lg my-2"
              {...register("description")}
              placeholder="Descripcion"
            />
          </div>
          <div className="flex gap-x-2 justify-end">
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {bill ? "Actualizar Venta" : "Vender"}
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

export default BillModal;
