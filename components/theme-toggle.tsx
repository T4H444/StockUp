"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Éviter les problèmes d'hydratation en attendant que le composant soit monté
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-10 w-10 rounded-full border border-gray-200 bg-white p-2 transition-all duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      aria-label={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
    >
      <div className="relative h-full w-full">
        {/* Icône du soleil */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
          }`}
        >
          <Sun className="h-5 w-5 text-yellow-400" />
        </span>

        {/* Icône de la lune */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            theme === "dark" ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
          }`}
        >
          <Moon className="h-5 w-5 text-indigo-500" />
        </span>
      </div>
    </button>
  )
}
