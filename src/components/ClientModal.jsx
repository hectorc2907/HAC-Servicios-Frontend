import { useForm } from "react-hook-form";
import { useService } from "../context/ServiceContext";
import { useEffect } from "react";

function ClientModal({ isOpen, onClose, client }) {
  const { register, handleSubmit, setValue } = useForm();
  const { getClients, createClient, updateClient } = useService();

  useEffect(() => {
    if (client) {
      setValue("firstName", client.firstName);
      setValue("nickName", client.nickName);
      setValue("phoneNumber", client.phoneNumber);
      setValue("address", client.address);
    } else {
      setValue("firstName", "");
      setValue("nickName", "");
      setValue("phoneNumber", "");
      setValue("address", "");
    }
  }, [client]);

  const onSubmit = handleSubmit(async (data) => {
    data.phoneNumber = Number(`+549${data.phoneNumber}`);
    if (client) {
      await updateClient(client._id, data);
    } else {
      await createClient(data);
      setValue("firstName", "");
      setValue("nickName", "");
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
            id="firstName"
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("firstName")}
            placeholder="Nombre"
          />
          <label htmlFor="nickName">Apodo</label>
          <input
            id="nickName"
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("nickName")}
            placeholder="Apodo"
          />
          <label htmlFor="phoneNumber">Telefono</label>
          <input
            id="phoneNumber"
            type="number"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("phoneNumber")}
            placeholder="Telefono"
          />
          <label htmlFor="address">Direccion</label>
          <input
            id="address"
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

export default ClientModal;
