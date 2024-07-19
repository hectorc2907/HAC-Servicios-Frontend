import { useForm } from "react-hook-form";
import { useService } from "../context/ServiceContext";
import { useEffect } from "react";

function SaleModal({ tripId, isOpen, onClose, sale }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { getSales, createSale, updateSale, clients } = useService();

  const quantity = watch("quantity") || 0;
  const price = watch("price") || 0;
  const total = Number(quantity) * Number(price);

  useEffect(() => {
    if (sale) {
      setValue("quantity", sale.quantity);
      setValue("price", sale.price);
      setValue("customer", sale.customer);
      setValue("half", sale.half);
      setValue("state", sale.state);
      setValue("details", sale.details);
    } else {
      setValue("quantity", "");
      setValue("price", "");
      setValue("customer", "");
      setValue("half", "");
      setValue("state", "");
      setValue("details", "");
    }
  }, [sale, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    data.quantity = Number(data.quantity);
    data.price = Number(data.price);
    data.total = data.quantity * data.price;
    data.tripId = tripId;
    if (sale) {
      await updateSale(sale._id, data);
    } else {
      await createSale(data);
      setValue("quantity", "");
      setValue("price", "");
      setValue("customer", "");
      setValue("half", "");
      setValue("state", "");
      setValue("details", "");
    }
    await getSales();
    onClose();
  });
  if (!isOpen) return null;
  return (
    <div className="px-2 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-slate-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl mb-2">
          {sale ? "Actualizar Venta" : "Venta Nuevo"}
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex gap-x-10 my-5">
            <div>
              <label htmlFor="quantity" className="flex justify-center text-md">
                Cantidad
              </label>
              <input
                id="quantity"
                type="number"
                className="w-full px-4 py-2 rounded-lg my-2"
                {...register("quantity", {
                  required: "La cantidad es requerida",
                  min: { value: 1, message: "Debe ser mayor que 0" },
                })}
                placeholder="Cantidad"
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs">
                  {errors.quantity.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="price" className="flex justify-center text-md">
                Precio
              </label>
              <input
                id="price"
                type="number"
                className="w-full px-4 py-2 rounded-lg my-2"
                {...register("price", {
                  required: "El precio es requerido",
                  min: { value: 100, message: "Debe ser mayor que $100" },
                })}
                placeholder="Precio"
              />
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price.message}</p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="customer" className="flex justify-center text-md">
              Cliente
            </label>
            <select
              id="customer"
              className="w-full px-4 py-2 rounded-lg my-2"
              {...register("customer", { required: "Selecciona un cliente" })}
              value={watch("customer") || ""}
            >
              <option value="" disabled>
                Seleccionar Cliente
              </option>
              <option value="Verduleria">No Cliente</option>
              {clients.map((client) => (
                <option key={client._id} value={client.firstName}>
                  {client.firstName}
                </option>
              ))}
            </select>
            {errors.customer && (
              <p className="text-red-500 text-xs">{errors.customer.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="half" className="flex justify-center text-md">
              Forma de Pago
            </label>
            <select
              id="half"
              className="w-full px-4 py-2 rounded-lg my-2"
              {...register("half", {
                required: "Selecciona una forma de pago",
              })}
              value={watch("half") || ""}
            >
              <option value="" disabled>
                Seleccionar Medio
              </option>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferia">Transferencia</option>
              <option value="Mixto">Mixto</option>
            </select>
            {errors.half && (
              <p className="text-red-500 text-xs">{errors.half.message}</p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="state" className="flex justify-center text-md">
              Estado
            </label>
            <select
              id="state"
              className="w-full px-4 py-2 rounded-lg my-2"
              {...register("state", {
                required: "Selecciona un estado del pago",
              })}
              value={watch("state") || ""}
            >
              <option value="" disabled>
                Seleccionar Estado
              </option>
              <option value="Pendiente">Pendiente</option>
              <option value="Parcial">Parcial</option>
              <option value="Pagado">Pagado</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-xs">{errors.state.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="details" className="flex justify-center text-md">
              Detalles
            </label>
            <input
              id="details"
              type="text"
              className="w-full px-4 py-2 rounded-lg my-2"
              {...register("details")}
              placeholder="Detalles"
            />
          </div>
          <p className="w-full px-4 py-2 rounded-lg my-2 text-center text-4xl mb-5">
            Total: ${total}
          </p>
          <div className="flex gap-x-2 justify-end">
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              {sale ? "Actualizar Venta" : "Vender"}
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

export default SaleModal;
