import { useService } from "../../context/ServiceContext";
import { MoonLoader } from "react-spinners";
import { FiPlusCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import SaleModal from "../../components/SaleModal";
import SaleCard from "../../components/SaleCard";

function SalePage() {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const { loading, sales, getSales } = useService();

  useEffect(() => {
    getSales();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
  };

  const handleUpdate = (sale) => {
    setSelectedSale(sale);
    openModal();
  };

  const handleModalClose = async () => {
    closeModal();
    await getSales();
  };
  return (
    <div>
      <h1 className="text-center text-3xl">Detalles</h1>
      <div className="flex justify-center mt-3 mb-2">
        <form>
          <button
            type="submit"
            className="bg-slate-200 rounded-lg p-4 flex flex-col items-center"
            onClick={openModal}
          >
            <FiPlusCircle className="text-3xl" />
            <p>Agregar</p>
          </button>
        </form>
      </div>
      {loading ? (
        <div className="flex h-[calc(100vh-400px)] items-center justify-center">
          <MoonLoader color="#0d16fc" />
        </div>
      ) : sales.length === 0 ? (
        <h1 className="flex h-[calc(100vh-400px)] items-center justify-center text-2xl">
          No hay Ventas
        </h1>
      ) : (
        <ul>
          {sales.map((sale) => (
            <SaleCard key={sale._id} sale={sale} onUpdate={handleUpdate} />
          ))}
        </ul>
      )}
      <SaleModal
        isOpen={isModelOpen}
        onClose={handleModalClose}
        sale={selectedSale}
      />
    </div>
  );
}

export default SalePage;
