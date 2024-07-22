import { useService } from "../../context/ServiceContext";
import { MoonLoader } from "react-spinners";
import { FiPlusCircle } from "react-icons/fi";
import { GoAlert } from "react-icons/go";
import { useEffect, useState } from "react";
import SaleModal from "../../components/SaleModal";
import SaleCard from "../../components/SaleCard";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/dateFormated";
import { Link } from "react-router-dom";

function SalePage() {
  const { id } = useParams();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [trip, setTrip] = useState(null);
  const { sales, getSales, getClients, getTrip, updateTrip, loading } =
    useService();
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    getSales();
    getClients();
    if (id) {
      (async () => {
        const fetchedTrip = await getTrip(id);
        setTrip(fetchedTrip);
      })();
    }
  }, [id]);

  useEffect(() => {
    if (id && sales) {
      const filtered = sales.filter((sale) => sale.trip && sale.trip._id === id);
      setFilteredSales(filtered);
      const totalIncome = calculateTotalSum(filtered, "total");
      const totalKgSold = calculateTotalSum(filtered, "quantity");
      if (
        trip &&
        (totalIncome !== trip.income || totalKgSold !== trip.kgSold)
      ) {
        updateTripIncome(totalIncome, trip.expenses, totalKgSold);
      }
    }
  }, [id, sales, trip]);

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

  const calculateTotalSum = (sales, key) => {
    return sales.reduce((acc, sale) => acc + sale[key], 0);
  };

  const calculateBalance = (income, expenses) => {
    return income - expenses;
  };

  const updateTripIncome = async (totalIncome, expenses, kgSold) => {
    if (trip) {
      const updatedTrip = {
        ...trip,
        income: totalIncome,
        balance: calculateBalance(totalIncome, expenses),
        kgSold: kgSold,
      };
      await updateTrip(trip._id, updatedTrip);
      setTrip(updatedTrip);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl">Detalles</h1>
      {trip && (
        <div className="grid grid-cols-2 mb-4">
          <p>
            <strong>Ingresos:</strong> ${trip.income}
          </p>
          <p>
            <strong>Egresos:</strong> ${trip.expenses}
          </p>
          <p>
            <strong>Balance:</strong> ${trip.balance}
          </p>
          <p>
            <strong>Fecha: </strong> {formatDate(trip.createdAt)}
          </p>
        </div>
      )}
      <div className="flex gap-x-10 justify-center mt-3 mb-2">
        <button
          className="bg-slate-200 rounded-lg p-4 flex flex-col items-center w-24"
          onClick={openModal}
        >
          <FiPlusCircle className="text-3xl" />
          <p>Agregar</p>
        </button>
        <Link
          to={trip ? `/bills/${trip._id}` : "#"}
          className="bg-slate-200 rounded-lg p-4 flex flex-col items-center w-24"
          onClick={openModal}
        >
          <GoAlert className="text-3xl" />
          <p>Gastos</p>
        </Link>
      </div>
      {loading ? (
        <div className="flex h-[calc(100vh-400px)] items-center justify-center">
          <MoonLoader color="#0d16fc" />
        </div>
      ) : filteredSales.length === 0 ? (
        <h1 className="flex h-[calc(100vh-400px)] items-center justify-center text-2xl">
          No hay Ventas
        </h1>
      ) : (
        <ul>
          {filteredSales.map((sale) => (
            <SaleCard key={sale._id} sale={sale} onUpdate={handleUpdate} />
          ))}
        </ul>
      )}
      <SaleModal
        isOpen={isModelOpen}
        onClose={handleModalClose}
        sale={selectedSale}
        tripId={id}
      />
    </div>
  );
}

export default SalePage;
