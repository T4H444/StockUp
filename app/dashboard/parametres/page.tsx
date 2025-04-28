"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  BellRing,
  Camera,
  Check,
  ChevronsUpDown,
  Globe,
  KeyRound,
  Languages,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  PanelLeft,
  Save,
  Shield,
  Sun,
  User,
  UserCog,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function ParametresPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("account")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    company: "Société ABC",
    phone: "+33 6 12 34 56 78",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    stockAlerts: true,
    deliveryUpdates: true,
    weeklyReports: false,
  })
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSecurityChange = (key) => {
    setSecurity((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    // Simuler une requête API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    })
  }

  const handleChangePassword = () => {
    toast({
      title: "Changement de mot de passe",
      description: "Un email a été envoyé avec les instructions pour changer votre mot de passe.",
    })
  }

  const handleManageSessions = () => {
    toast({
      title: "Gestion des sessions",
      description: "Fonctionnalité en cours de développement.",
    })
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setActiveTab("account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Compte
            </Button>
            <Button variant="outline" size="sm" onClick={() => setActiveTab("preferences")}>
              <PanelLeft className="mr-2 h-4 w-4" />
              Préférences
            </Button>
            <Button variant="outline" size="sm" onClick={() => setActiveTab("notifications")}>
              <BellRing className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" onClick={() => setActiveTab("security")}>
              <Shield className="mr-2 h-4 w-4" />
              Sécurité
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar - visible uniquement sur desktop */}
          <div className="hidden md:block">
            <Card className="sticky top-20">
              <CardContent className="p-4">
                <nav className="flex flex-col space-y-1">
                  <Button
                    variant={activeTab === "account" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Compte
                  </Button>
                  <Button
                    variant={activeTab === "preferences" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("preferences")}
                  >
                    <ChevronsUpDown className="mr-2 h-4 w-4" />
                    Préférences
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <BellRing className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button
                    variant={activeTab === "security" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => setActiveTab("security")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Sécurité
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="md:hidden">
                <TabsTrigger value="account">Compte</TabsTrigger>
                <TabsTrigger value="preferences">Préférences</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Informations personnelles
                    </CardTitle>
                    <CardDescription>Gérez vos informations personnelles et de contact</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Photo de profil" />
                          <AvatarFallback className="text-2xl bg-[#8B5CF6]/10 text-[#8B5CF6]">JD</AvatarFallback>
                        </Avatar>
                        <Button
                          size="icon"
                          variant="outline"
                          className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white dark:bg-gray-800"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Changer la photo</span>
                        </Button>
                      </div>
                      <div className="space-y-2 text-center sm:text-left">
                        <h3 className="font-medium text-lg">{formData.name}</h3>
                        <p className="text-sm text-muted-foreground">{formData.company}</p>
                        <Button variant="outline" size="sm">
                          Changer la photo
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Société</Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Annuler</Button>
                      <Button onClick={handleSaveProfile} disabled={isLoading}>
                        {isLoading ? (
                          <span className="flex items-center gap-1">
                            <Save className="h-4 w-4 animate-spin" />
                            Enregistrement...
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Save className="h-4 w-4" />
                            Enregistrer
                          </span>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <KeyRound className="mr-2 h-5 w-5" />
                      Mot de passe
                    </CardTitle>
                    <CardDescription>Modifiez votre mot de passe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleChangePassword}>Changer le mot de passe</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-600 dark:text-red-500">
                      <LogOut className="mr-2 h-5 w-5" />
                      Déconnexion et suppression
                    </CardTitle>
                    <CardDescription>Gérez votre session et votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline">Se déconnecter</Button>
                    <Button variant="destructive">Supprimer mon compte</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sun className="mr-2 h-5 w-5" />
                      Apparence
                    </CardTitle>
                    <CardDescription>Personnalisez l'apparence de l'application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Thème</Label>
                        <p className="text-sm text-muted-foreground">
                          Choisissez entre le mode clair et le mode sombre
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <Switch
                          checked={theme === "dark"}
                          onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                        />
                        <Moon className="h-4 w-4 text-indigo-500" />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Densité d'affichage</Label>
                        <p className="text-sm text-muted-foreground">
                          Ajustez l'espacement des éléments dans l'interface
                        </p>
                      </div>
                      <Select defaultValue="normal">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Densité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="comfortable">Confortable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="mr-2 h-5 w-5" />
                      Langue et région
                    </CardTitle>
                    <CardDescription>Définissez vos préférences linguistiques et régionales</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Langue</Label>
                        <p className="text-sm text-muted-foreground">Sélectionnez la langue de l'interface</p>
                      </div>
                      <Select defaultValue="fr">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Langue" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">
                            <div className="flex items-center">
                              <Languages className="mr-2 h-4 w-4" />
                              Français
                            </div>
                          </SelectItem>
                          <SelectItem value="en">
                            <div className="flex items-center">
                              <Languages className="mr-2 h-4 w-4" />
                              English
                            </div>
                          </SelectItem>
                          <SelectItem value="es">
                            <div className="flex items-center">
                              <Languages className="mr-2 h-4 w-4" />
                              Español
                            </div>
                          </SelectItem>
                          <SelectItem value="de">
                            <div className="flex items-center">
                              <Languages className="mr-2 h-4 w-4" />
                              Deutsch
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Format de date</Label>
                        <p className="text-sm text-muted-foreground">Choisissez le format d'affichage des dates</p>
                      </div>
                      <Select defaultValue="dd/mm/yyyy">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Format de date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BellRing className="mr-2 h-5 w-5" />
                      Canaux de notification
                    </CardTitle>
                    <CardDescription>Choisissez comment vous souhaitez être notifié</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Notifications par email</p>
                          <p className="text-sm text-muted-foreground">Recevez des notifications par email</p>
                        </div>
                      </div>
                      <Switch checked={notifications.email} onCheckedChange={() => handleNotificationChange("email")} />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Notifications par SMS</p>
                          <p className="text-sm text-muted-foreground">Recevez des notifications par SMS</p>
                        </div>
                      </div>
                      <Switch checked={notifications.sms} onCheckedChange={() => handleNotificationChange("sms")} />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BellRing className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Notifications push</p>
                          <p className="text-sm text-muted-foreground">
                            Recevez des notifications push dans l'application
                          </p>
                        </div>
                      </div>
                      <Switch checked={notifications.push} onCheckedChange={() => handleNotificationChange("push")} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Check className="mr-2 h-5 w-5" />
                      Types de notifications
                    </CardTitle>
                    <CardDescription>Personnalisez les types de notifications que vous recevez</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Alertes de stock</p>
                        <p className="text-sm text-muted-foreground">
                          Notifications lorsque les niveaux de stock sont bas
                        </p>
                      </div>
                      <Switch
                        checked={notifications.stockAlerts}
                        onCheckedChange={() => handleNotificationChange("stockAlerts")}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mises à jour de livraison</p>
                        <p className="text-sm text-muted-foreground">
                          Notifications sur les changements de statut des livraisons
                        </p>
                      </div>
                      <Switch
                        checked={notifications.deliveryUpdates}
                        onCheckedChange={() => handleNotificationChange("deliveryUpdates")}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rapports hebdomadaires</p>
                        <p className="text-sm text-muted-foreground">Résumé hebdomadaire des activités de stock</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReports}
                        onCheckedChange={() => handleNotificationChange("weeklyReports")}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="mr-2 h-5 w-5" />
                      Authentification à deux facteurs
                    </CardTitle>
                    <CardDescription>Renforcez la sécurité de votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Activer l'authentification à deux facteurs</Label>
                        <p className="text-sm text-muted-foreground">
                          Protégez votre compte avec une couche de sécurité supplémentaire
                        </p>
                      </div>
                      <Switch
                        checked={security.twoFactorAuth}
                        onCheckedChange={() => handleSecurityChange("twoFactorAuth")}
                      />
                    </div>

                    {security.twoFactorAuth && (
                      <div className="rounded-lg border p-4 mt-4">
                        <h4 className="font-medium mb-2">Configuration requise</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Pour activer l'authentification à deux facteurs, vous devez configurer une application
                          d'authentification comme Google Authenticator ou Authy.
                        </p>
                        <Button>Configurer maintenant</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5" />
                      Gestion des sessions
                    </CardTitle>
                    <CardDescription>Gérez vos sessions actives et l'historique de connexion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Sessions actives</h3>
                        <p className="text-sm text-muted-foreground">Vous êtes actuellement connecté sur 1 appareil</p>
                      </div>
                      <Button variant="outline" onClick={handleManageSessions}>
                        Gérer les sessions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <KeyRound className="mr-2 h-5 w-5" />
                      Activité du compte
                    </CardTitle>
                    <CardDescription>Consultez l'historique récent de votre compte</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md bg-muted p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Connexion réussie</p>
                            <p className="text-sm text-muted-foreground">Paris, France · Chrome sur Windows</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Aujourd'hui, 10:42</p>
                        </div>
                      </div>
                      <div className="rounded-md bg-muted p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Mot de passe modifié</p>
                            <p className="text-sm text-muted-foreground">Paris, France · Chrome sur Windows</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Il y a 3 jours</p>
                        </div>
                      </div>
                      <div className="rounded-md bg-muted p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Connexion réussie</p>
                            <p className="text-sm text-muted-foreground">Paris, France · Chrome sur Windows</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Il y a 7 jours</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
