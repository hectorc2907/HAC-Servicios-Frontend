import { useForm } from "react-hook-form";
import { useService } from "../context/ServiceContext";
import { useEffect } from "react";

function ClientModal({ isOpen, onClose, client }) {
  const { register, handleSubmit, setValue } = useForm();
  const { getClients, createClient, updateClient } = useService();

  useEffect(() => {
    if (client) {
      setValue("firstName", client.firstName);
      setValue("lastName", client.lastName);
      setValue("phoneNumber", client.phoneNumber);
      setValue("address", client.address);
    } else {
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("phoneNumber", "");
      setValue("address", "");
    }
  }, [client]);

  const onSubmit = handleSubmit(async (data) => {
    data.phoneNumber = Number(data.phoneNumber);
    if (client) {
      updateClient(client._id, data);
    } else {
      createClient(data);
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("phoneNumber", "");
      setValue("address", "");
    }
    await getClients();
    onClose();
  });
  if (!isOpen) return null;
  return (
    <div className="px-2 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-slate-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl mb-2">
          {client ? "Actualizar Cliente" : "Cliente Nuevo"}
        </h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("firstName")}
            placeholder="Nombre"
          />
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("lastName")}
            placeholder="Apellido"
          />
          <label htmlFor="phoneNumber">Telefono</label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("phoneNumber")}
            placeholder="Telefono"
          />
          <label htmlFor="address">Direccion</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("address")}
            placeholder="Direccion"
          />
          <div className="flex gap-x-2 justify-end">
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white p-2 rounded"
            >
              Guardar
            </button>
            <button
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

export default ClientModal;
