"use client";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { ZodErrors } from "@/components/custom/ZodErrors";
import { registerAction } from "@/data/actions/auth/RegisterAction";
import { useFormState } from "react-dom";
import { ApiErrors } from "@/components/custom/ApiErrors";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const INITIAL_STATE = {
  apiErrors: null,
  zodErrors: null,
  data: null,
  message: null,
};

function RegisterForm() {
  const [formState, formAction] = useFormState(registerAction, INITIAL_STATE);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Primer Nombre
        </label>
        <Input
          id="firstName"
          name="firstName"
          placeholder="Primer Nombre"
          type="text"
          className="w-full"
        />
        <ZodErrors error={formState?.zodErrors?.firstName} />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Primer Apellido
        </label>
        <Input
          id="lastName"
          name="lastName"
          placeholder="Primer Apellido"
          type="text"
          className="w-full"
        />
        <ZodErrors error={formState?.zodErrors?.lastName} />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Correo Electrónico
        </label>
        <Input
          id="email"
          name="email"
          placeholder="correo@correo.com"
          type="email"
          className="w-full"
        />
        <ZodErrors error={formState?.zodErrors?.email} />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Contraseña
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            className="w-full"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
            <span className="sr-only">
              {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </span>
          </Button>
          <ZodErrors error={formState?.zodErrors?.password} />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirma tu Contraseña
        </label>
        <div className="relative">
          <Input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            className="w-full"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
            <span className="sr-only">
              {showConfirmPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"}
            </span>
          </Button>
          <ZodErrors error={formState?.zodErrors?.passwordConfirmation} />
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <SubmitButton
          className="w-full"
          text="Registrarse"
          loadingText="Cargando"
          color="blue"
          size="large"
        />
        <ApiErrors error={formState.apiErrors} />
      </div>
    </form>
  );
}

export default RegisterForm;
