import { useEffect, useState } from "react";
import { useService } from "../../context/ServiceContext";
import ClientCard from "../../components/ClientCard";
import { FiPlusCircle } from "react-icons/fi";
import ClientModal from "../../components/ClientModal";

function ClientPage() {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const { clients, getClients } = useService();

  useEffect(() => {
    getClients();
  }, [getClients]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (clients.length === 0) return <h1>No hay clientes</h1>;
  return (
    <div>
      <h1 className="text-center text-3xl">Clientes</h1>
      <div className="flex justify-center mt-3 mb-2">
        <button
          className="bg-slate-200 rounded-lg p-4 flex flex-col items-center"
          onClick={openModal}
        >
          <FiPlusCircle className="text-3xl" />
          <p>Agregar</p>
        </button>
      </div>
      {clients.map((client) => (
        <ClientCard client={client} key={client._id} />
      ))}
      <ClientModal isOpen={isModelOpen} onClose={closeModal} />
    </div>
  );
}

export default ClientPage;
