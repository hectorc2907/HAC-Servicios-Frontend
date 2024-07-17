import { useEffect, useState } from "react";
import { useService } from "../../context/ServiceContext";
import ClientCard from "../../components/ClientCard";
import { FiPlusCircle } from "react-icons/fi";
import ClientModal from "../../components/ClientModal";
import { MoonLoader } from "react-spinners";

function ClientPage() {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const { clients, getClients, loading } = useService();

  useEffect(() => {
    getClients();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const handleUpdate = (client) => {
    setSelectedClient(client);
    openModal();
  };

  const handleModalClose = async () => {
    closeModal();
    await getClients();
  };

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
      {loading ? (
        <div className="flex h-[calc(100vh-300px)] items-center justify-center">
          <MoonLoader color="#0d16fc" />
        </div>
      ) : clients.length === 0 ? (
        <h1>No hay clientes</h1>
      ) : (
        <>
          {clients.map((client) => (
            <ClientCard
              client={client}
              key={client._id}
              onUpdate={handleUpdate}
            />
          ))}
        </>
      )}
      <ClientModal
        isOpen={isModelOpen}
        onClose={handleModalClose}
        client={selectedClient}
      />
    </div>
  );
}

export default ClientPage;
