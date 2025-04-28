"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowUp, Box, Truck, TrendingDown, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [recentMovements, setRecentMovements] = useState([])
  const [lowStockItems, setLowStockItems] = useState([])
  const [stats, setStats] = useState({
    totalItems: 0,
    totalValue: 0,
    pendingDeliveries: 0,
    outOfStock: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setRecentMovements([
        {
          id: 1,
          type: "entrée",
          product: "Écran 24 pouces",
          quantity: 50,
          date: "2023-04-27",
          supplier: "Tech Supplies",
        },
        { id: 2, type: "sortie", product: "Clavier mécanique", quantity: 20, date: "2023-04-26", client: "Bureau Pro" },
        {
          id: 3,
          type: "entrée",
          product: "Souris sans fil",
          quantity: 100,
          date: "2023-04-25",
          supplier: "Tech Supplies",
        },
        { id: 4, type: "sortie", product: "Câble HDMI 2m", quantity: 15, date: "2023-04-24", client: "Électro Shop" },
        {
          id: 5,
          type: "sortie",
          product: "Écran 24 pouces",
          quantity: 10,
          date: "2023-04-23",
          client: "Bureau Design",
        },
      ])

      setLowStockItems([
        { id: 1, name: "Câble HDMI 2m", current: 5, minimum: 10, status: "critique" },
        { id: 2, name: "Clavier mécanique", current: 12, minimum: 15, status: "attention" },
        { id: 3, name: "Moniteur 27 pouces", current: 3, minimum: 8, status: "critique" },
      ])

      setStats({
        totalItems: 1243,
        totalValue: 89750,
        pendingDeliveries: 17,
        outOfStock: 8,
      })

      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Exporter
            </Button>
            <Button size="sm">Actualiser</Button>
          </div>
        </div>

        {/* Cartes statistiques */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Articles en stock</CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Valeur totale</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} €</div>
              <p className="text-xs text-muted-foreground">+5% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Livraisons en attente</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingDeliveries}</div>
              <p className="text-xs text-muted-foreground">3 nouvelles aujourd'hui</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Articles en rupture</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.outOfStock}</div>
              <p className="text-xs text-muted-foreground">-2 depuis la semaine dernière</p>
            </CardContent>
          </Card>
        </div>

        {/* Contenu Principal - Onglets */}
        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Mouvements récents</TabsTrigger>
            <TabsTrigger value="alerts">Alertes de stock ({lowStockItems.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="space-y-4">
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Produit</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Quantité</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Origine/Destination</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {recentMovements.map((movement) => (
                      <tr key={movement.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <Badge variant={movement.type === "entrée" ? "default" : "secondary"}>
                            {movement.type === "entrée" ? (
                              <ArrowUp className="mr-1 h-3 w-3" />
                            ) : (
                              <TrendingDown className="mr-1 h-3 w-3" />
                            )}
                            {movement.type}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle font-medium">{movement.product}</td>
                        <td className="p-4 align-middle">{movement.quantity}</td>
                        <td className="p-4 align-middle">{new Date(movement.date).toLocaleDateString()}</td>
                        <td className="p-4 align-middle">{movement.supplier || movement.client}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="alerts" className="space-y-4">
            {lowStockItems.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
                    <Badge variant={item.status === "critique" ? "destructive" : "outline"}>
                      {item.status === "critique" ? "Stock critique" : "Stock bas"}
                    </Badge>
                  </div>
                  <CardDescription>
                    {item.current} unités en stock (minimum: {item.minimum})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Niveau de stock</span>
                      <span className={item.status === "critique" ? "text-destructive" : "text-yellow-500"}>
                        {Math.round((item.current / item.minimum) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={Math.round((item.current / item.minimum) * 100)}
                      className={item.status === "critique" ? "bg-red-100" : "bg-yellow-100"}
                    />
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        Commander
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
