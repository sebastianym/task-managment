"use client";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Columna de imagen */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/img/fondo.png"
          alt="Imagen iniciar sesión"
          layout="fill"
          objectFit="cover"
          className="brightness-[0.4] object-cover w-full h-full"
        />
        <div className="absolute inset-0" />
        <div className="absolute bottom-0 left-0 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Bienvenido de vuelta</h2>
          <p className="text-xl">
            Inicia sesión para gestionar tus tareas y proyectos.
          </p>
        </div>
      </div>

      {/* Columna de formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Iniciar Sesión
          </h1>
          <p className="text-gray-600 mb-8">
            Ingresa tus credenciales para gestionar tus tareas y proyectos
          </p>

          <LoginForm />

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/registro"
              className="font-medium text-indigo-600 hover:text-indigo-800"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
