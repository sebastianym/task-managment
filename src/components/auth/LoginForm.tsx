"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { ZodErrors } from "../custom/ZodErrors";
import { ApiErrors } from "../custom/ApiErrors";
import { loginAction } from "@/data/actions/auth/loginAction";
import { SubmitButton } from "../custom/SubmitButton";

const INITIAL_STATE = {
  apiErrors: null,
  zodErrors: null,
  data: null,
  message: null,
};

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, formAction] = useFormState(loginAction, INITIAL_STATE);

  return (
    <form className="space-y-6" action={formAction}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Correo electrónico
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoCorrect="off"
          placeholder="correo@correo.com"
          className="w-full dark:text-black/80"
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
            className="w-full pr-10 dark:text-black/80"
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
        </div>
        <ZodErrors error={formState?.zodErrors?.password} />
      </div>

      <SubmitButton
        className="w-full"
        text="Iniciar sesión"
        loadingText="Cargando"
        color="blue"
        size="medium"
      />

      <ApiErrors error={formState.apiErrors} />
    </form>
  );
}

export default LoginForm;
