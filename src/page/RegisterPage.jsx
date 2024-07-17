import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/admin");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-100 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold my-2 text-center">Registro</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg my-2"
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">El Username es obligatorio</p>
          )}
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
              Registrarse
            </button>
          </div>
        </form>
        <p className="flex gap-x-2 justify-between">
          ¿Ya tienes una cuenta?
          <Link to="/login" className="text-sky-500">
            Login!
          </Link>
        </p>
        {registerErrors.map((errors, i) => (
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

export default RegisterPage;
