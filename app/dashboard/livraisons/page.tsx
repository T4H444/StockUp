"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CircleCheck, FileText, Search, TruckIcon, Check } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export default function LivraisonsPage() {
  const { toast } = useToast()
  const [showNewDeliveryDialog, setShowNewDeliveryDialog] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // Exemple de données produits disponibles pour livraison
  const availableProducts = [
    { id: 1, name: "Écran 24 pouces", sku: "ECR-24-HD", quantity: 75, price: 129.99 },
    { id: 2, name: "Clavier mécanique", sku: "CLV-MEC-01", quantity: 12, price: 69.99 },
    { id: 3, name: "Souris sans fil", sku: "SOU-WL-02", quantity: 97, price: 24.99 },
    { id: 4, name: "Câble HDMI 2m", sku: "CBL-HDMI-2M", quantity: 5, price: 9.99 },
    { id: 5, name: "Moniteur 27 pouces 4K", sku: "MON-27-4K", quantity: 3, price: 299.99 },
    { id: 6, name: "Casque audio sans fil", sku: "CAS-BT-03", quantity: 45, price: 79.99 },
    { id: 7, name: "Support pour écran", sku: "SUP-MON-01", quantity: 22, price: 39.99 },
  ]

  // Exemple de demandes de livraison
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      client: "Bureau Design",
      status: "En attente",
      date: "2023-04-30",
      products: [
        { id: 1, name: "Écran 24 pouces", quantity: 5, price: 129.99 },
        { id: 7, name: "Support pour écran", quantity: 5, price: 39.99 },
      ],
      totalAmount: 849.9,
      address: "15 rue de la Paix, 75001 Paris",
      instructions: "Livraison à effectuer avant 12h",
    },
    {
      id: 2,
      client: "Tech Solutions",
      status: "Confirmée",
      date: "2023-04-28",
      products: [
        { id: 2, name: "Clavier mécanique", quantity: 10, price: 69.99 },
        { id: 3, name: "Souris sans fil", quantity: 10, price: 24.99 },
      ],
      totalAmount: 949.8,
      address: "8 avenue des Champs-Élysées, 75008 Paris",
      instructions: "Contacter le responsable informatique à l'arrivée",
    },
    {
      id: 3,
      client: "École Numérique",
      status: "Expédiée",
      date: "2023-04-25",
      products: [{ id: 5, name: "Moniteur 27 pouces 4K", quantity: 2, price: 299.99 }],
      totalAmount: 599.98,
      address: "45 rue de l'Université, 69007 Lyon",
      instructions: "Livraison durant les heures de cours (8h-17h)",
    },
    {
      id: 4,
      client: "Startup Hub",
      status: "Livrée",
      date: "2023-04-20",
      products: [{ id: 6, name: "Casque audio sans fil", quantity: 15, price: 79.99 }],
      totalAmount: 1199.85,
      address: "23 rue des Startups, 33000 Bordeaux",
      instructions: "",
    },
  ])

  const handleAddProduct = (productId) => {
    const product = availableProducts.find((p) => p.id === productId)
    if (!product) return

    const existingProduct = selectedProducts.find((p) => p.id === productId)
    if (existingProduct) {
      setSelectedProducts(selectedProducts.map((p) => (p.id === productId ? { ...p, quantity: p.quantity + 1 } : p)))
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveProduct(productId)
      return
    }

    const product = availableProducts.find((p) => p.id === productId)
    if (newQuantity > product.quantity) {
      toast({
        variant: "destructive",
        title: "Quantité insuffisante",
        description: `Il n'y a que ${product.quantity} ${product.name} en stock.`,
      })
      return
    }

    setSelectedProducts(selectedProducts.map((p) => (p.id === productId ? { ...p, quantity: newQuantity } : p)))
  }

  const handleSubmitDeliveryRequest = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const clientName = formData.get("clientName")
    const address = formData.get("address")
    const instructions = formData.get("instructions")

    if (selectedProducts.length === 0) {
      toast({
        variant: "destructive",
        title: "Aucun produit sélectionné",
        description: "Veuillez sélectionner au moins un produit pour la livraison.",
      })
      return
    }

    const totalAmount = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)

    const newDelivery = {
      id: deliveries.length + 1,
      client: clientName,
      status: "En attente",
      date: new Date().toISOString().split("T")[0],
      products: selectedProducts,
      totalAmount,
      address,
      instructions,
    }

    setDeliveries([newDelivery, ...deliveries])
    setSelectedProducts([])
    setShowNewDeliveryDialog(false)

    toast({
      title: "Demande de livraison créée",
      description: `Demande pour ${clientName} enregistrée avec succès.`,
    })
  }

  const filteredAvailableProducts = availableProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Demandes de Livraison</h1>
          <Dialog open={showNewDeliveryDialog} onOpenChange={setShowNewDeliveryDialog}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <TruckIcon className="h-4 w-4" />
                Nouvelle demande
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Créer une demande de livraison</DialogTitle>
                <DialogDescription>
                  Complétez le formulaire ci-dessous pour créer une nouvelle demande de livraison.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitDeliveryRequest}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Nom du client</Label>
                      <Input id="clientName" name="clientName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Date de livraison souhaitée</Label>
                      <div className="flex">
                        <Input
                          type="date"
                          id="deliveryDate"
                          name="deliveryDate"
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse de livraison</Label>
                    <Textarea id="address" name="address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Instructions spéciales (optionnel)</Label>
                    <Textarea
                      id="instructions"
                      name="instructions"
                      placeholder="Instructions particulières pour la livraison..."
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Produits à livrer</Label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Rechercher un produit..."
                          className="pl-8 w-full sm:w-[200px]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Produit</TableHead>
                            <TableHead>Référence</TableHead>
                            <TableHead>En stock</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAvailableProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" variant="outline" onClick={() => handleAddProduct(product.id)}>
                                  Ajouter
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {selectedProducts.length > 0 && (
                      <div className="border rounded-md p-4 bg-muted/30">
                        <h4 className="font-medium mb-2">Produits sélectionnés</h4>
                        <div className="space-y-2">
                          {selectedProducts.map((product) => (
                            <div key={product.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div>{product.name}</div>
                                <span className="text-muted-foreground text-xs">{product.sku}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  min="1"
                                  max={product.quantity}
                                  value={product.quantity}
                                  onChange={(e) => handleQuantityChange(product.id, Number.parseInt(e.target.value))}
                                  className="w-16 h-8"
                                />
                                <Button size="sm" variant="ghost" onClick={() => handleRemoveProduct(product.id)}>
                                  ✕
                                </Button>
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between font-medium mt-4 pt-2 border-t">
                            <span>Total</span>
                            <span>
                              {selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2)} €
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setShowNewDeliveryDialog(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">Créer la demande</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmées</TabsTrigger>
            <TabsTrigger value="shipped">Expédiées</TabsTrigger>
            <TabsTrigger value="delivered">Livrées</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {deliveries.map((delivery) => (
              <Card key={delivery.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{delivery.client}</CardTitle>
                    <Badge
                      variant={
                        delivery.status === "En attente"
                          ? "outline"
                          : delivery.status === "Confirmée"
                            ? "default"
                            : delivery.status === "Expédiée"
                              ? "secondary"
                              : "success"
                      }
                    >
                      {delivery.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3" />
                    {new Date(delivery.date).toLocaleDateString()}
                    <span className="font-semibold ml-2">{delivery.totalAmount.toFixed(2)} €</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="font-medium">Produits:</div>
                    <ul className="ml-5 list-disc space-y-1">
                      {delivery.products.map((product) => (
                        <li key={product.id}>
                          {product.name} x {product.quantity}
                        </li>
                      ))}
                    </ul>
                    <div className="font-medium mt-4">Adresse de livraison:</div>
                    <p className="text-muted-foreground">{delivery.address}</p>
                    {delivery.instructions && (
                      <>
                        <div className="font-medium mt-2">Instructions:</div>
                        <p className="text-muted-foreground">{delivery.instructions}</p>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <FileText className="h-4 w-4" />
                    Détails
                  </Button>
                  {delivery.status === "En attente" && (
                    <Button size="sm" className="gap-1">
                      <CircleCheck className="h-4 w-4" />
                      Confirmer
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {deliveries
              .filter((d) => d.status === "En attente")
              .map((delivery) => (
                <Card key={delivery.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{delivery.client}</CardTitle>
                      <Badge variant="outline">En attente</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(delivery.date).toLocaleDateString()}
                      <span className="font-semibold ml-2">{delivery.totalAmount.toFixed(2)} €</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="font-medium">Produits:</div>
                      <ul className="ml-5 list-disc space-y-1">
                        {delivery.products.map((product) => (
                          <li key={product.id}>
                            {product.name} x {product.quantity}
                          </li>
                        ))}
                      </ul>
                      <div className="font-medium mt-4">Adresse de livraison:</div>
                      <p className="text-muted-foreground">{delivery.address}</p>
                      {delivery.instructions && (
                        <>
                          <div className="font-medium mt-2">Instructions:</div>
                          <p className="text-muted-foreground">{delivery.instructions}</p>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <FileText className="h-4 w-4" />
                      Détails
                    </Button>
                    <Button size="sm" className="gap-1">
                      <CircleCheck className="h-4 w-4" />
                      Confirmer
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>

          {/* Contenu similaire pour les autres onglets */}
          <TabsContent value="confirmed" className="space-y-4">
            {deliveries
              .filter((d) => d.status === "Confirmée")
              .map((delivery) => (
                <Card key={delivery.id}>
                  {/* Contenu similaire à l'onglet "pending" */}
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{delivery.client}</CardTitle>
                      <Badge>Confirmée</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(delivery.date).toLocaleDateString()}
                      <span className="font-semibold ml-2">{delivery.totalAmount.toFixed(2)} €</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Contenu des produits et adresse */}
                    <div className="text-sm space-y-2">
                      <div className="font-medium">Produits:</div>
                      <ul className="ml-5 list-disc space-y-1">
                        {delivery.products.map((product) => (
                          <li key={product.id}>
                            {product.name} x {product.quantity}
                          </li>
                        ))}
                      </ul>
                      <div className="font-medium mt-4">Adresse de livraison:</div>
                      <p className="text-muted-foreground">{delivery.address}</p>
                      {delivery.instructions && (
                        <>
                          <div className="font-medium mt-2">Instructions:</div>
                          <p className="text-muted-foreground">{delivery.instructions}</p>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <FileText className="h-4 w-4" />
                      Détails
                    </Button>
                    <Button size="sm" className="gap-1">
                      <TruckIcon className="h-4 w-4" />
                      Marquer expédiée
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="shipped" className="space-y-4">
            {deliveries
              .filter((d) => d.status === "Expédiée")
              .map((delivery) => (
                <Card key={delivery.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{delivery.client}</CardTitle>
                      <Badge variant="secondary">Expédiée</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(delivery.date).toLocaleDateString()}
                      <span className="font-semibold ml-2">{delivery.totalAmount.toFixed(2)} €</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Contenu similaire */}
                    <div className="text-sm space-y-2">
                      <div className="font-medium">Produits:</div>
                      <ul className="ml-5 list-disc space-y-1">
                        {delivery.products.map((product) => (
                          <li key={product.id}>
                            {product.name} x {product.quantity}
                          </li>
                        ))}
                      </ul>
                      <div className="font-medium mt-4">Adresse de livraison:</div>
                      <p className="text-muted-foreground">{delivery.address}</p>
                      {delivery.instructions && (
                        <>
                          <div className="font-medium mt-2">Instructions:</div>
                          <p className="text-muted-foreground">{delivery.instructions}</p>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <FileText className="h-4 w-4" />
                      Détails
                    </Button>
                    <Button size="sm" className="gap-1">
                      <Check className="h-4 w-4" />
                      Marquer livrée
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            {deliveries
              .filter((d) => d.status === "Livrée")
              .map((delivery) => (
                <Card key={delivery.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{delivery.client}</CardTitle>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Livrée
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(delivery.date).toLocaleDateString()}
                      <span className="font-semibold ml-2">{delivery.totalAmount.toFixed(2)} €</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Contenu similaire */}
                    <div className="text-sm space-y-2">
                      <div className="font-medium">Produits:</div>
                      <ul className="ml-5 list-disc space-y-1">
                        {delivery.products.map((product) => (
                          <li key={product.id}>
                            {product.name} x {product.quantity}
                          </li>
                        ))}
                      </ul>
                      <div className="font-medium mt-4">Adresse de livraison:</div>
                      <p className="text-muted-foreground">{delivery.address}</p>
                      {delivery.instructions && (
                        <>
                          <div className="font-medium mt-2">Instructions:</div>
                          <p className="text-muted-foreground">{delivery.instructions}</p>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <FileText className="h-4 w-4" />
                      Détails
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
