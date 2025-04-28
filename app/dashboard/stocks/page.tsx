"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  ArrowDown10,
  ArrowUp10,
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  PackagePlus,
  Search,
  Trash2,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export default function StocksPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showAddProductDialog, setShowAddProductDialog] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    supplier: "",
    price: "",
    quantity: "",
    minQuantity: "",
  })

  // Exemple de données produits
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Écran 24 pouces",
      category: "Informatique",
      sku: "ECR-24-HD",
      quantity: 75,
      minQuantity: 20,
      price: 129.99,
      supplier: "Tech Supplies",
      status: "En stock",
    },
    {
      id: 2,
      name: "Clavier mécanique",
      category: "Informatique",
      sku: "CLV-MEC-01",
      quantity: 12,
      minQuantity: 15,
      price: 69.99,
      supplier: "Bureau Pro",
      status: "Stock bas",
    },
    {
      id: 3,
      name: "Souris sans fil",
      category: "Informatique",
      sku: "SOU-WL-02",
      quantity: 97,
      minQuantity: 30,
      price: 24.99,
      supplier: "Tech Supplies",
      status: "En stock",
    },
    {
      id: 4,
      name: "Câble HDMI 2m",
      category: "Accessoires",
      sku: "CBL-HDMI-2M",
      quantity: 5,
      minQuantity: 10,
      price: 9.99,
      supplier: "Électro Shop",
      status: "Stock critique",
    },
    {
      id: 5,
      name: "Moniteur 27 pouces 4K",
      category: "Informatique",
      sku: "MON-27-4K",
      quantity: 3,
      minQuantity: 8,
      price: 299.99,
      supplier: "Tech Supplies",
      status: "Stock critique",
    },
    {
      id: 6,
      name: "Casque audio sans fil",
      category: "Audio",
      sku: "CAS-BT-03",
      quantity: 45,
      minQuantity: 15,
      price: 79.99,
      supplier: "AudioPro",
      status: "En stock",
    },
    {
      id: 7,
      name: "Support pour écran",
      category: "Mobilier",
      sku: "SUP-MON-01",
      quantity: 22,
      minQuantity: 10,
      price: 39.99,
      supplier: "Bureau Design",
      status: "En stock",
    },
  ])

  // Catégories uniques pour le filtre
  const categories = [...new Set(products.map((product) => product.category))]

  const handleAddProduct = (e) => {
    e.preventDefault()

    // Créer un nouvel objet produit
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      sku: `SKU-${Math.floor(Math.random() * 10000)}`,
      quantity: Number.parseInt(newProduct.quantity),
      minQuantity: Number.parseInt(newProduct.minQuantity),
      price: Number.parseFloat(newProduct.price),
      supplier: newProduct.supplier,
      status:
        Number.parseInt(newProduct.quantity) > Number.parseInt(newProduct.minQuantity)
          ? "En stock"
          : Number.parseInt(newProduct.quantity) > 0
            ? "Stock bas"
            : "Rupture de stock",
    }

    // Ajouter le produit à la liste
    setProducts([...products, product])

    // Réinitialiser le formulaire et fermer la boîte de dialogue
    setNewProduct({
      name: "",
      category: "",
      supplier: "",
      price: "",
      quantity: "",
      minQuantity: "",
    })
    setShowAddProductDialog(false)

    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté avec succès.`,
    })
  }

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id))

    toast({
      title: "Produit supprimé",
      description: "Le produit a été supprimé avec succès.",
    })
  }

  // Filtrer les produits en fonction des critères de recherche et de catégorie
  const filteredProducts = products.filter((product) => {
    return (
      (searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || product.category === selectedCategory)
    )
  })

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion des Stocks</h1>
          <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <PackagePlus className="h-4 w-4" />
                Ajouter un article
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel article</DialogTitle>
                <DialogDescription>
                  Remplissez les informations ci-dessous pour ajouter un nouvel article au stock.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom du produit</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Input
                        id="category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Fournisseur</Label>
                      <Input
                        id="supplier"
                        value={newProduct.supplier}
                        onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Prix unitaire (€)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantité initiale</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minQuantity">Quantité minimale</Label>
                      <Input
                        id="minQuantity"
                        type="number"
                        min="0"
                        value={newProduct.minQuantity}
                        onChange={(e) => setNewProduct({ ...newProduct, minQuantity: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setShowAddProductDialog(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">Ajouter l'article</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par nom, référence ou fournisseur..."
                  className="pl-8 w-full md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      {selectedCategory || "Toutes catégories"}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {product.quantity}
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                <ArrowUp10 className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                                <ArrowDown10 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.price.toFixed(2)} €</TableCell>
                        <TableCell>{product.supplier}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.status === "En stock"
                                ? "default"
                                : product.status === "Stock bas"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem>Historique des mouvements</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        Aucun article ne correspond à vos critères de recherche.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
