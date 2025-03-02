"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import Image from "next/image";
import Link from "next/link";

function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Columna de imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Imagen registro"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50" />
        <div className="absolute bottom-0 left-0 p-12 text-white z-10">
          <h2 className="text-5xl font-bold mb-4">Organiza tu vida</h2>
          <p className="text-2xl">
            Regístrate y empieza a gestionar tus tareas de manera eficiente.
          </p>
        </div>
      </div>

      {/* Columna de formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registrar</h1>
          <p className="text-gray-600 mb-8">
            Ingresa tus datos para comenzar a gestionar tus tareas
          </p>
          <RegisterForm />
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/iniciar-sesion"
            className="font-medium text-indigo-600 hover:text-indigo-800"
          >
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
