import { useForm } from "react-hook-form";
import { useService } from "../context/ServiceContext";
import { useEffect } from "react";

function SaleModal({ tripId, isOpen, onClose, sale }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { getSales, createSale, updateSale, clients } = useService();

  const quantity = watch("quantity") || 0;
  const price = watch("price") || 0;
  const total = Number(quantity) * Number(price);

  useEffect(() => {
    if (sale) {
      setValue("quantity", sale.quantity);
      setValue("price", sale.price);
      setValue("customer", sale.customer);
    } else {
      setValue("quantity", "");
      setValue("price", "");
      setValue("customer", "");
    }
  }, [sale]);

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
          <div className="flex gap-x-10 my-10">
            <div>
              <label htmlFor="quantity" className="flex justify-center text-md">
                Cantidad
              </label>
              <input
                id="quantity"
                type="number"
                className="w-full px-4 py-2 rounded-lg my-2"
                {...register("quantity")}
                placeholder="Cantidad"
              />
            </div>
            <div>
              <label htmlFor="price" className="flex justify-center text-md">
                Precio
              </label>
              <input
                id="price"
                type="number"
                className="w-full px-4 py-2 rounded-lg my-2"
                {...register("price")}
                placeholder="Precio"
              />
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="customer" className="flex justify-center text-md">
              Cliente
            </label>
            <select
              id="customer"
              className="w-full px-4 py-2 rounded-lg my-2"
              {...register("customer")}
              defaultValue=""
            >
              <option value="" disabled>
                Seleccionar cliente
              </option>
              <option value="Verduleria">No Cliente</option>
              {clients.map((client) => (
                <option key={client._id} value={client.firstName}>
                  {client.firstName}
                </option>
              ))}
            </select>
          </div>
          <p className="w-full px-4 py-2 rounded-lg my-2 text-center text-4xl mb-5">
            Total: ${total}
          </p>
          <div className="flex gap-x-2 justify-end">
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              Vender
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
