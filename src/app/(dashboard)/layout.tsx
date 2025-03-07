"use client";
import { ThemeProvider } from "@/components/custom/ThemeProvider";
import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarX2,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeButton } from "@/components/custom/ThemeButton";
import { useRouter, usePathname } from "next/navigation";
import { LogoutButton } from "@/components/custom/LogoutButton";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isAllTasks = pathname === "/dashboard/all";
  const isCompletedTasks = pathname === "/dashboard/completed";
  const isPendingTasks = pathname === "/dashboard/pending";
  const isDelayedTasks = pathname === "/dashboard/delayed";
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        {/* Barra de navegación superior */}
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-4 md:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <nav className="grid gap-6 text-lg font-medium">
                  <div className="flex h-16 items-center border-b px-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <h1>Task Manager</h1>
                    </div>
                  </div>
                  <div className="grid gap-3 px-2">
                    <Button
                      variant="ghost"
                      className={`justify-start gap-3 ${
                        isAllTasks ? "bg-muted" : ""
                      }`}
                      onClick={() => router.push("/dashboard/all")}
                    >
                      <Calendar className="h-5 w-5" />
                      Todas las tareas
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start gap-3 ${
                        isCompletedTasks ? "bg-muted" : ""
                      }`}
                      onClick={() => router.push("/dashboard/completed")}
                    >
                      <CalendarCheck className="h-5 w-5" />
                      Tareas completadas
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start gap-3 ${
                        isPendingTasks ? "bg-muted" : ""
                      }`}
                      onClick={() => router.push("/dashboard/pending")}
                    >
                      <CalendarClock className="h-5 w-5" />
                      Tareas Pendientes
                    </Button>
                    <Button
                      variant="ghost"
                      className={`justify-start gap-3 ${
                        isDelayedTasks ? "bg-muted" : ""
                      }`}
                      onClick={() => router.push("/dashboard/delayed")}
                    >
                      <CalendarX2 className="h-4 w-4" />
                      Tareas Retrasadas
                    </Button>
                  </div>
                  <div className="mt-auto border-t px-2 py-4"></div>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 font-semibold md:text-lg">
              <h1>Task Manager</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ThemeButton />

              <LogoutButton />
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="flex">
          {/* Barra lateral */}
          <aside className="hidden md:flex w-64 flex-col border-r bg-muted/20 min-h-[calc(100vh-3.5rem)]">
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold ml-2">Menú</h2>
              </div>
              <nav className="grid gap-1 pt-2">
                <Button
                  variant="ghost"
                  className={`justify-start gap-3 ${
                    isAllTasks ? "bg-muted" : ""
                  }`}
                  onClick={() => router.push("/dashboard/all")}
                >
                  <Calendar className="h-4 w-4" />
                  Todas las tareas
                </Button>
                <Button
                  variant="ghost"
                  className={`justify-start gap-3 ${
                    isCompletedTasks ? "bg-muted" : ""
                  }`}
                  onClick={() => router.push("/dashboard/completed")}
                >
                  <CalendarCheck className="h-4 w-4" />
                  Tareas completadas
                </Button>
                <Button
                  variant="ghost"
                  className={`justify-start gap-3 ${
                    isPendingTasks ? "bg-muted" : ""
                  }`}
                  onClick={() => router.push("/dashboard/pending")}
                >
                  <CalendarClock className="h-4 w-4" />
                  Tareas Pendientes
                </Button>
                <Button
                  variant="ghost"
                  className={`justify-start gap-3 ${
                    isDelayedTasks ? "bg-muted" : ""
                  }`}
                  onClick={() => router.push("/dashboard/delayed")}
                >
                  <CalendarX2 className="h-4 w-4" />
                  Tareas Retrasadas
                </Button>
              </nav>
            </div>
          </aside>
          {/* Contenido */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
