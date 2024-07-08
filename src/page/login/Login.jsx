import "./login.css";
import { useForm } from "react-hook-form";
import { login } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/admin");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <section className="flex flex-col justify-center items-center px-10 h-screen">
      <div className="grid gap-10 w-full max-w-md">
        <div>
          <h1 className="text-center font-bold text-4xl">Login</h1>
          <p className="text-gray-400 text-center">
            Sign In with User & Password
          </p>
        </div>
        <div className="flex flex-col justify-between flex-grow h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-5 mb-auto"
          >
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="border p-2 rounded-xl"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="border p-2 rounded-xl"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <p className="text-gray-400 text-center">
              Create new account?{" "}
              <Link to="/signup" className="text-blue-600 font-bold">
                Sign Up
              </Link>
            </p>
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-400 rounded-xl py-2 mt-5"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
