import { useForm } from "react-hook-form";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-100 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold my-2">Registro</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("username", { required: true })}
            placeholder="Username"
          />
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("password", { required: true })}
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
