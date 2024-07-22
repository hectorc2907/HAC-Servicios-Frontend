import { useEffect, useState } from "react";
import { useService } from "../../context/ServiceContext";
import SaleCard from "../../components/SaleCard";
import SaleModal from "../../components/SaleModal";
import { MoonLoader } from "react-spinners";
import Swal from "sweetalert2";

function AdminMainPage() {
  const { sales, getSales, deleteSale, loading } = useService();
  const [filteredSales, setFilteredSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [tripId, setTripId] = useState(null); // Asegúrate de obtener el ID del viaje adecuado

  useEffect(() => {
    const fetchSales = async () => {
      await getSales();
    };
    fetchSales();
  }, []);

  useEffect(() => {
    if (sales) {
      const pendingOrPartialSales = sales.filter(
        (sale) => sale.state === "Pendiente" || sale.state === "Parcial"
      );
      setFilteredSales(pendingOrPartialSales);
    }
  }, [sales]);

  const handleUpdate = (sale) => {
    setSelectedSale(sale);
    setTripId(sale.tripId);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de que deseas borrar la venta?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E74C3C",
      cancelButtonColor: "#2ECC71",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSale(id);
        await getSales();
        Swal.fire("¡Borrado!", "La venta ha sido borrada.", "success");
      }
    });
  };

  const handleModalClose = async () => {
    setIsModalOpen(false);
    setSelectedSale(null);
    setTripId(null);
    await getSales();
  };

  return (
    <div>
      <h1 className="text-center text-3xl mb-4">Pendientes</h1>
      {loading ? (
        <div className="flex h-[calc(100vh-400px)] items-center justify-center">
          <MoonLoader color="#0d16fc" />
        </div>
      ) : filteredSales.length === 0 ? (
        <h2 className="flex h-[calc(100vh-400px)] items-center justify-center text-2xl">
          No hay datos
        </h2>
      ) : (
        <ul>
          {filteredSales.map((sale) => (
            <SaleCard
              key={sale._id}
              sale={sale}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
      <SaleModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        sale={selectedSale}
        tripId={tripId}
      />
    </div>
  );
}

export default AdminMainPage;
