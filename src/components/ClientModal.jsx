function ClientModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="px-2 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-slate-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl mb-2">Cliente Nuevo</h1>
        <form>
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            placeholder="Nombre"
          />
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            placeholder="Apellido"
          />
          <label htmlFor="phoneNumber">Telefono</label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded-lg my-2"
            placeholder="Telefono"
          />
          <label htmlFor="address">Direccion</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
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
