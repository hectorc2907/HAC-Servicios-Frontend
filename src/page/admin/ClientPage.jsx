import { useEffect } from "react";
import { useService } from "../../context/ServiceContext";
import ClientCard from "../../components/ClientCard";

function ClientPage() {
  const { client, getClients } = useService();

  useEffect(() => {
    getClients();
    console.log(client);
  }, []);

  if (client.length === 0) return <h1>No hay clientes</h1>;
  return (
    <div>
      {client.map((clients) => (
        <ClientCard clients={clients} key={client._id} />
      ))}
    </div>
  );
}

export default ClientPage;
