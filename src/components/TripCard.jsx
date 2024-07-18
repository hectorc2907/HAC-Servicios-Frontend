function TripCard({trip}) {
  return (
    <div className="bg-slate-200 my-2 rounded-lg">
      <div className="bg-slate-300 rounded-t-lg">
        <div className="grid grid-col-2 p-2">
          <h3>Ingresos:{trip.income}</h3>
          <h3>Egresos:{trip.expenses}</h3>
          <h3>Balance:{trip.balance}</h3>
        </div>
      </div>
      <div className="flex justify-around px-4 py-6">
        <p>Creado:{trip.createdAt}</p>
        <p>Actualizacion:{trip.updatedAt}</p>
      </div>
    </div>
  );
}

export default TripCard;
