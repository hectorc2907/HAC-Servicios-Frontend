import { useService } from "../../context/ServiceContext";
import { MoonLoader } from "react-spinners";
import { FiPlusCircle } from "react-icons/fi";

function SalePage() {
  const { loading } = useService();
  return (
    <div>
      <h1 className="text-center text-3xl">Detalles</h1>
      <div className="flex justify-center mt-3 mb-2">
        <form>
          <button
            type="submit"
            className="bg-slate-200 rounded-lg p-4 flex flex-col items-center"
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default SalePage;
