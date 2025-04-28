"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowDown, ArrowUp, BarChart3, CalendarIcon, Download, FileText, LineChart, Printer } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function RapportsPage() {
  const [date, setDate] = useState(new Date())

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Rapports et Analyses</h1>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {format(date, "MMMM yyyy", { locale: fr })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <Select defaultValue="monthly">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Type de rapport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Quotidien</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
                <SelectItem value="monthly">Mensuel</SelectItem>
                <SelectItem value="quarterly">Trimestriel</SelectItem>
                <SelectItem value="yearly">Annuel</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-1">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Entrées en stock</CardTitle>
              <CardDescription>Ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">345 articles</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>12% par rapport au mois dernier</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sorties de stock</CardTitle>
              <CardDescription>Ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">298 articles</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>8% par rapport au mois dernier</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Livraisons effectuées</CardTitle>
              <CardDescription>Ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42 livraisons</div>
              <div className="flex items-center text-xs text-red-500 mt-1">
                <ArrowDown className="h-3 w-3 mr-1" />
                <span>3% par rapport au mois dernier</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Valeur totale des sorties</CardTitle>
              <CardDescription>Ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24 750 €</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span>5% par rapport au mois dernier</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="movements">
          <TabsList>
            <TabsTrigger value="movements" className="gap-1">
              <LineChart className="h-4 w-4" />
              Mouvements de stock
            </TabsTrigger>
            <TabsTrigger value="deliveries" className="gap-1">
              <BarChart3 className="h-4 w-4" />
              Demandes de livraison
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-1">
              <FileText className="h-4 w-4" />
              Rapports générés
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mouvements de stock - {format(date, "MMMM yyyy", { locale: fr })}</CardTitle>
                <CardDescription>Évolution des entrées et sorties de stock sur la période.</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-[350px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center space-y-2">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Ici s'afficherait un graphique des mouvements de stock pour la période sélectionnée
                    </p>
                    <div className="flex justify-center gap-8 mt-4">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                        <span className="text-sm">Entrées</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Sorties</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 des articles entrants</CardTitle>
                  <CardDescription>Les articles les plus réapprovisionnés</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Écran 24 pouces</span>
                      </div>
                      <span className="font-medium">120 unités</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Souris sans fil</span>
                      </div>
                      <span className="font-medium">84 unités</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Clavier mécanique</span>
                      </div>
                      <span className="font-medium">65 unités</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Câble HDMI 2m</span>
                      </div>
                      <span className="font-medium">42 unités</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Casque audio sans fil</span>
                      </div>
                      <span className="font-medium">38 unités</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top 5 des articles sortants</CardTitle>
                  <CardDescription>Les articles les plus demandés</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>Écran 24 pouces</span>
                      </div>
                      <span className="font-medium">95 unités</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>Clavier mécanique</span>
                      </div>
                      <span className="font-medium">73 unités</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>Souris sans fil</span>
                      </div>
                      <span className="font-medium">68 unités</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>Casque audio sans fil</span>
                      </div>
                      <span className="font-medium">34 unités</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <span>Support pour écran</span>
                      </div>
                      <span className="font-medium">28 unités</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Demandes de livraison - {format(date, "MMMM yyyy", { locale: fr })}</CardTitle>
                <CardDescription>Évolution des demandes de livraison et leur statut sur la période.</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-[350px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="text-center space-y-2">
                    <LineChart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Ici s'afficherait un graphique des demandes de livraison pour la période sélectionnée
                    </p>
                    <div className="flex justify-center gap-8 mt-4">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">En attente</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Confirmées</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Livrées</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistiques des livraisons</CardTitle>
                <CardDescription>Répartition des livraisons par client et par statut</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Top clients par nombre de livraisons</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <span>Bureau Design</span>
                        <span className="font-medium">12 livraisons</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Tech Solutions</span>
                        <span className="font-medium">8 livraisons</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>École Numérique</span>
                        <span className="font-medium">5 livraisons</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Répartition par statut</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          <span>En attente</span>
                        </div>
                        <span className="font-medium">8 (19%)</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span>Confirmées</span>
                        </div>
                        <span className="font-medium">15 (36%)</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          <span>Expédiées</span>
                        </div>
                        <span className="font-medium">5 (12%)</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Livrées</span>
                        </div>
                        <span className="font-medium">14 (33%)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapports générés</CardTitle>
                <CardDescription>Liste des rapports générés et disponibles pour consultation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Rapport mensuel - Mars 2023</h3>
                        <p className="text-sm text-muted-foreground">Généré le 01/04/2023</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Printer className="h-4 w-4" />
                        Imprimer
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Rapport mensuel - Février 2023</h3>
                        <p className="text-sm text-muted-foreground">Généré le 01/03/2023</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Printer className="h-4 w-4" />
                        Imprimer
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Rapport trimestriel - T1 2023</h3>
                        <p className="text-sm text-muted-foreground">Généré le 05/04/2023</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Printer className="h-4 w-4" />
                        Imprimer
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Rapport de stock critique</h3>
                        <p className="text-sm text-muted-foreground">Généré le 15/04/2023</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Printer className="h-4 w-4" />
                        Imprimer
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Télécharger
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
