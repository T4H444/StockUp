"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EyeIcon, EyeOffIcon, Package, UserPlus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.target)
    const name = formData.get("name") as string
    const company = formData.get("company") as string
    const email = formData.get("email") as string
    const userType = formData.get("userType") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Les mots de passe ne correspondent pas",
        description: "Veuillez vous assurer que vos mots de passe correspondent.",
      })
      setIsLoading(false)
      return
    }

    try {
      // Simulons une création de compte réussie
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Compte créé avec succès",
        description: "Bienvenue sur StockUp! Votre compte a été créé.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'inscription",
        description: "Une erreur est survenue. Veuillez réessayer.",
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
            Créer un compte
          </CardTitle>
          <CardDescription className="text-center dark:text-gray-300 transition-colors duration-300 ease-in-out">
            Remplissez le formulaire ci-dessous pour vous inscrire
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                Nom complet
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Jean Dupont"
                required
                className="dark:bg-[#374151] dark:border-gray-600 dark:text-white transition-colors duration-300 ease-in-out"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                Nom de la société
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Société ABC"
                required
                className="dark:bg-[#374151] dark:border-gray-600 dark:text-white transition-colors duration-300 ease-in-out"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jean.dupont@societe.com"
                required
                className="dark:bg-[#374151] dark:border-gray-600 dark:text-white transition-colors duration-300 ease-in-out"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType" className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                Type de compte
              </Label>
              <Select name="userType" defaultValue="supplier">
                <SelectTrigger className="dark:bg-[#374151] dark:border-gray-600 dark:text-white transition-colors duration-300 ease-in-out">
                  <SelectValue placeholder="Sélectionnez un type de compte" />
                </SelectTrigger>
                <SelectContent className="dark:bg-[#1F2937] dark:border-gray-700 transition-colors duration-300 ease-in-out">
                  <SelectItem value="supplier">Fournisseur</SelectItem>
                  <SelectItem value="admin">Administrateur (réservé)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
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
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="dark:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                Confirmer le mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={8}
                  className="dark:bg-[#374151] dark:border-gray-600 dark:text-white transition-colors duration-300 ease-in-out"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent dark:text-gray-300 transition-colors duration-300 ease-in-out"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  <span className="sr-only">
                    {showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full transition-colors duration-300 ease-in-out" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4 animate-pulse" />
                  Création en cours...
                </span>
              ) : (
                "S'inscrire"
              )}
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground dark:text-gray-400 transition-colors duration-300 ease-in-out">
              Vous avez déjà un compte?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline dark:text-[#8B5CF6] transition-colors duration-300 ease-in-out"
              >
                Connectez-vous
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
