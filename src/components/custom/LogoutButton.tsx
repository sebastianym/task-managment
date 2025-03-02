// LogoutButton.tsx

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "GET" });
    } catch (error) {
      console.error("Error during logout", error);
    }
    // Navega a la página principal:
    router.push("/iniciar-sesion");
  };

  return (
    <button
      onClick={handleLogout}
      className="font-semibold flex items-center gap-2 text-sm dark:text-white text-black rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700"
    >
      <LogOut className="h-5 w-5" />
      Cerrar sesión
    </button>
  );
}
