"use client";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  password: string;
}

export default function CrudLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    const res = await axios.post(
      "api/auth-super-user",
      data
    );

    console.log(res);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ebayimg.com/thumbs/images/g/dAkAAOSwdQhkulgc/s-l640.jpg')",
          filter: "blur(3px)",
        }}
      ></div>
      <div className="relative z-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                El nombre de usuario es requerido
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                La contraseña es requerida
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
