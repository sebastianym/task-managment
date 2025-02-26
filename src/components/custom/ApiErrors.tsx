import { Ban } from "lucide-react";

interface ApiErrorsProps {
  error: string | null;
}

export function ApiErrors({ error }: ApiErrorsProps) {
  if (!error) {
    return null;
  }

  if (error == "Invalid identifier or password") {
    return (
      <div className="mt-5">
        <Ban />
        Credenciales inválidas, por favor, intenta de nuevo.
      </div>
    );
  }

  return (
    <div className="mt-5">
      <Ban /> {error}
    </div>
  );
}
