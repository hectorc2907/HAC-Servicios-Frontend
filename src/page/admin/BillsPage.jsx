import { useService } from "../../context/ServiceContext";
import { MoonLoader } from "react-spinners";
import { FiPlusCircle } from "react-icons/fi";
import { GoBriefcase } from "react-icons/go";
import { useEffect, useState } from "react";
import BillModal from "../../components/BillModal";
import BillCard from "../../components/BillCard";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/dateFormated";
import { Link } from "react-router-dom";

function BillsPage() {
  const { id } = useParams();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [trip, setTrip] = useState(null);
  const { bills, getBills, getClients, getTrip, updateTrip, loading } =
    useService();
  const [filteredBills, setFilteredBills] = useState([]);

  useEffect(() => {
    getBills();
    getClients();
    if (id) {
      (async () => {
        const fetchedTrip = await getTrip(id);
        setTrip(fetchedTrip);
      })();
    }
  }, [id]);

  useEffect(() => {
    if (id && bills) {
      const filtered = bills.filter((bill) => bill.trip && bill.trip._id === id);
      setFilteredBills(filtered);
      const totalExpenses = calculateTotalSum(filtered);
      if (trip && totalExpenses !== trip.expenses) {
        updateTripExpenses(trip.income, totalExpenses);
      }
    }
  }, [id, bills, trip]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBill(null);
  };

  const handleUpdate = (sale) => {
    setSelectedBill(sale);
    openModal();
  };

  const handleModalClose = async () => {
    closeModal();
    await getBills();
  };

  const calculateTotalSum = (bills) => {
    return bills.reduce((acc, bill) => acc + bill.value, 0);
  };

  const calculateBalance = (income, expenses) => {
    return income - expenses;
  };

  const updateTripExpenses = async (income, totalExpenses) => {
    if (trip) {
      const updatedTrip = {
        ...trip,
        expenses: totalExpenses,
        balance: calculateBalance(income, totalExpenses),
      };
      await updateTrip(trip._id, updatedTrip);
      setTrip(updatedTrip);
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl">Detalles de Gastos</h1>
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
          to={trip ? `/sale/${trip._id}` : "#"}
          className="bg-slate-200 rounded-lg p-4 flex flex-col items-center w-24"
          onClick={openModal}
        >
          <GoBriefcase className="text-3xl" />
          <p>Ventas</p>
        </Link>
      </div>
      {loading ? (
        <div className="flex h-[calc(100vh-400px)] items-center justify-center">
          <MoonLoader color="#0d16fc" />
        </div>
      ) : filteredBills.length === 0 ? (
        <h1 className="flex h-[calc(100vh-400px)] items-center justify-center text-2xl">
          No hay Gastos
        </h1>
      ) : (
        <ul>
          {filteredBills.map((bill) => (
            <BillCard key={bill._id} bill={bill} onUpdate={handleUpdate} />
          ))}
        </ul>
      )}
      <BillModal
        isOpen={isModelOpen}
        onClose={handleModalClose}
        bill={selectedBill}
        tripId={id}
      />
    </div>
  );
}

export default BillsPage;
