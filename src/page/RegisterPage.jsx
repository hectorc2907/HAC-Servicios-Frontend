function RegisterPage() {
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-100 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold my-2">Registro</h1>
        <form>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            placeholder="Username"
          />
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg my-2"
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg my-2"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md my-2"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
