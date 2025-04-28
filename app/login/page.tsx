"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, KeyRound, Package } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.target)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Ici, vous ajouteriez l'intégration avec votre API d'authentification

      // Simulons une réponse de connexion réussie après une courte pause
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre tableau de bord StockUp.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Identifiants incorrects. Veuillez réessayer.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] dark:bg-[#111827] p-4 transition-colors duration-300 ease-in-out">
      <div className="absolute top-4 left-4 flex items-center gap-2 text-primary font-semibold">
        <Package className="h-5 w-5" />
        <Link href="/">StockUp</Link>
      </div>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md dark:bg-[#1F2937] dark:border-gray-700 transition-colors duration-300 ease-in-out">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center dark:text-white transition-colors duration-300 ease-in-out">
            Connexion
          </CardTitle>
          <CardDescription className="text-center dark:text-gray-300 transition-colors duration-300 ease-in-out">
            Entrez vos identifiants pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="exemple@societe.com"
                required
                className="dark:bg-[#374151] dark:border-gray-600 dark:text-white transition-colors duration-300 ease-in-out"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                  Mot de passe
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline dark:text-[#8B5CF6] transition-colors duration-300 ease-in-out"
                >
                  Mot de passe oublié?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="dark:bg-[#374151] dark:border-gray-600 dark:text-white transition-colors duration-300 ease-in-out"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent dark:text-gray-300 transition-colors duration-300 ease-in-out"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  <span className="sr-only">
                    {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full transition-colors duration-300 ease-in-out" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-1">
                  <KeyRound className="h-4 w-4 animate-pulse" />
                  Connexion en cours...
                </span>
              ) : (
                "Se connecter"
              )}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground dark:text-gray-400 transition-colors duration-300 ease-in-out">
              Vous n'avez pas de compte?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline dark:text-[#8B5CF6] transition-colors duration-300 ease-in-out"
              >
                Inscrivez-vous
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
