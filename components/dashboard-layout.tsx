"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Truck,
  User,
  X,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "./theme-toggle"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  const navigation = [
    { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
    { name: "Gestion des stocks", href: "/dashboard/stocks", icon: Package },
    { name: "Demandes de livraison", href: "/dashboard/livraisons", icon: Truck },
    { name: "Rapports", href: "/dashboard/rapports", icon: BarChart3 },
    { name: "Paramètres", href: "/dashboard/parametres", icon: Settings },
  ]

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    })
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#111827] text-[#1F2937] dark:text-[#D1D5DB] transition-colors duration-300 ease-in-out">
      {/* En-tête fixe */}
      <header className="bg-white dark:bg-[#1F2937] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 transition-colors duration-300 ease-in-out">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <div className="block md:hidden">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-64 p-0 bg-white dark:bg-[#1F2937] transition-colors duration-300 ease-in-out"
                >
                  <div className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-700">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 font-semibold"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Package className="h-6 w-6 text-[#8B5CF6]" />
                      <span>StockUp</span>
                    </Link>
                    <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setMenuOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Fermer</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col gap-1 p-4">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 ${
                            isActive ? "bg-[#8B5CF6]/10 text-[#8B5CF6] dark:bg-[#8B5CF6]/20" : ""
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6 text-[#8B5CF6]" />
              <span className="hidden sm:inline-block">StockUp</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-[#8B5CF6]">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
                >
                  <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                    <AvatarFallback className="bg-[#8B5CF6]/10 text-[#8B5CF6]">JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-medium text-sm">Jean Dupont</span>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/dashboard/parametres">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Contenu principal avec barre latérale */}
      <div className="flex flex-1">
        {/* Barre latérale de navigation - visible uniquement sur desktop */}
        <aside
          className={`hidden md:flex md:flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1F2937] fixed top-16 bottom-0 left-0 z-20 transition-all duration-300 ease-in-out ${
            sidebarExpanded ? "md:w-64" : "md:w-20"
          }`}
        >
          <div className="p-4 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-300 ease-in-out"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <Menu
                className={`h-5 w-5 transition-transform duration-300 ${sidebarExpanded ? "rotate-90" : "rotate-0"}`}
              />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center ${!sidebarExpanded ? "justify-center" : ""} gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isActive ? "bg-[#8B5CF6]/10 text-[#8B5CF6] dark:bg-[#8B5CF6]/20" : ""
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-[#8B5CF6]" : ""}`} />
                  {sidebarExpanded && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Ajustement de l'espace pour le contenu principal */}
        <div className={`w-full transition-all duration-300 ease-in-out ${sidebarExpanded ? "md:ml-64" : "md:ml-20"}`}>
          {/* Contenu principal */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
