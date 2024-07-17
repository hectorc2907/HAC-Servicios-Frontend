import { useEffect } from "react";
import { useService } from "../../context/ServiceContext";

function ClientPage() {
  const { client, getClients } = useService();

  useEffect(() => {
    getClients();
    console.log(client)
  }, []);

  if (client.length === 0) return <h1>No hay clientes</h1>;
  return (
    <div>
      {client.map((clients) => (
        <li key={clients._id}>{clients.firstName}</li>
      ))}
    </div>
  );
}

export default ClientPage;
