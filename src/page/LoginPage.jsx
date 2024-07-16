import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { errors: loginErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-100 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold my-2 text-center">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">El Email es obligatorio</p>
          )}
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">El Passowrd es obligatorio</p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md my-2"
            >
              Iniciar Sesion
            </button>
          </div>
        </form>
        {loginErrors.map((errors, i) => (
          <div
            className="bg-red-500 p-2 text-white text-center my-2 rounded-md"
            key={i}
          >
            {errors}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoginPage;
