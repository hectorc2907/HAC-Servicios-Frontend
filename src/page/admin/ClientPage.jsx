import { useEffect } from "react";
import { useService } from "../../context/ServiceContext";
import ClientCard from "../../components/ClientCard";
import { FiPlusCircle } from "react-icons/fi";

function ClientPage() {
  const { client, getClients } = useService();

  useEffect(() => {
    getClients();
    console.log(client);
  }, []);

  if (client.length === 0) return <h1>No hay clientes</h1>;
  return (
    <div>
      <h1 className="text-center text-3xl">Clientes</h1>
      <div className="flex justify-center mt-3 mb-2">
        <button className="bg-slate-200 rounded-lg p-4 flex flex-col items-center">
          <FiPlusCircle className="text-3xl" />
          <p>Agregar</p>
        </button>
      </div>
      {client.map((clients) => (
        <ClientCard clients={clients} key={client._id} />
      ))}
    </div>
  );
}

export default ClientPage;
