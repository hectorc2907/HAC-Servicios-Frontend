import "./login.css";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <section className="flex flex-col justify-center items-center px-10 h-screen">
      <div className="grid gap-10 w-full max-w-md">
        <div>
          <h1 className="text-center font-bold text-4xl">Login</h1>
          <p className="text-gray-400 text-center">Sign In with User & Password</p>
        </div>
        <div className="flex flex-col justify-between flex-grow h-full">
          <form className="grid gap-5 mb-auto">
            <input type="text" placeholder="Username" className="border p-2 rounded-xl" />
            <input type="password" placeholder="Password" className="border p-2 rounded-xl" />
            <p className="text-gray-400 text-center">
              Create new account?{" "}
              <Link to="/signup" className="text-blue-600 font-bold">Sign Up</Link>
            </p>
          </form>
          <button type="submit" className="text-white bg-blue-600 hover:bg-blue-400 rounded-xl py-2 mt-5">
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
}
