"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

function ThemeButton() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => {
        theme === "light" ? setTheme("dark") : setTheme("light");
      }}
      variant="ghost"
      size="icon"
      className="rounded-full"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

export { ThemeButton };
