import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Package, Shield, TrendingUp, Truck } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] dark:bg-[#111827] text-[#1F2937] dark:text-[#D1D5DB] transition-colors duration-300 ease-in-out">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md dark:bg-[#1F2937] dark:text-white transition-colors duration-300 ease-in-out">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <h1 className="text-xl font-bold">StockUp</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="outline"
                className="bg-white text-primary hover:bg-gray-100 dark:bg-[#374151] dark:text-white dark:hover:bg-[#4B5563] transition-colors duration-300 ease-in-out"
              >
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-primary hover:bg-gray-100 dark:bg-[#374151] dark:text-white dark:hover:bg-[#4B5563] transition-colors duration-300 ease-in-out">
                Inscription
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/30 to-primary/5 dark:from-[#1F2937]/50 dark:to-[#111827] transition-colors duration-300 ease-in-out">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white transition-colors duration-300 ease-in-out">
                Votre solution complète pour la gestion de stocks
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300 transition-colors duration-300 ease-in-out">
                StockUp simplifie la gestion de vos inventaires, mouvements de stock et demandes de livraison en un seul
                endroit.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="gap-1 transition-colors duration-300 ease-in-out">
                    Commencer maintenant
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="transition-colors duration-300 ease-in-out">
                    Voir une démo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="dark:bg-[#1F2937] dark:border-gray-700 transition-colors duration-300 ease-in-out">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="dark:text-white transition-colors duration-300 ease-in-out">
                    Gestion des Stocks en Temps Réel
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                    Suivez vos niveaux de stock avec précision et en temps réel.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                    <li>Ajout, modification et suppression d'articles</li>
                    <li>Suivi des entrées et sorties de stock</li>
                    <li>Recherche avancée par fournisseur ou article</li>
                    <li>Historique détaillé des mouvements</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="dark:bg-[#1F2937] dark:border-gray-700 transition-colors duration-300 ease-in-out">
                <CardHeader>
                  <Truck className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="dark:text-white transition-colors duration-300 ease-in-out">
                    Demandes de Livraison Simplifiées
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                    Traitez et suivez les demandes de livraison efficacement.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                    <li>Formulaire de demande intuitif</li>
                    <li>Validation interne en quelques clics</li>
                    <li>Suivi du statut des livraisons</li>
                    <li>Notifications automatiques</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="dark:bg-[#1F2937] dark:border-gray-700 transition-colors duration-300 ease-in-out">
                <CardHeader>
                  <Shield className="h-10 w-10 mb-4 text-primary" />
                  <CardTitle className="dark:text-white transition-colors duration-300 ease-in-out">
                    Sécurité et Confidentialité
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300 transition-colors duration-300 ease-in-out">
                    Protection des données et accès contrôlé.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 dark:text-gray-300 transition-colors duration-300 ease-in-out">
                    <li>Authentification sécurisée (option 2FA)</li>
                    <li>Différents niveaux d'accès</li>
                    <li>Chiffrement des données sensibles</li>
                    <li>Cloisonnement des données entre fournisseurs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-6 dark:bg-[#1F2937] transition-colors duration-300 ease-in-out">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <p className="text-sm font-medium dark:text-white transition-colors duration-300 ease-in-out">
                StockUp &copy; {new Date().getFullYear()}
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-sm hover:underline underline-offset-4 dark:text-gray-300 transition-colors duration-300 ease-in-out"
                href="#"
              >
                Mentions légales
              </Link>
              <Link
                className="text-sm hover:underline underline-offset-4 dark:text-gray-300 transition-colors duration-300 ease-in-out"
                href="#"
              >
                Politique de confidentialité
              </Link>
              <Link
                className="text-sm hover:underline underline-offset-4 dark:text-gray-300 transition-colors duration-300 ease-in-out"
                href="#"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
