"use client";

import { useState } from "react";
import { 
  Plus, 
  ShoppingBag, 
  Search, 
  Filter, 
  Zap, 
  Package, 
  Tag, 
  AlertTriangle,
  ExternalLink,
  Edit,
  Trash2,
  X
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data/products";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<typeof PRODUCTS[0] | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (product: typeof PRODUCTS[0]) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      setProducts(products.filter(p => p.id !== deletingProduct.id));
      setShowDeleteModal(false);
      setDeletingProduct(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingProduct(null);
  };

  return (
    <>
    <div className="space-y-12 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/40 mb-3 block">Archive Catalog</span>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
            Product <br /> Inventory
          </h1>
        </div>
        <Link 
          href="/admin/products/new"
          className="group flex items-center justify-center gap-3 bg-gh-charcoal px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer rounded-2xl"
        >
          <Plus className="h-4 w-4" />
          Add New Item
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/20 group-focus-within:text-gh-charcoal transition-colors" />
            <input 
               type="text" 
               placeholder="SEARCH ARCHIVE IDENTITY..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-white border border-gh-silver/20 py-5 pl-14 pr-6 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal/20 transition-all shadow-sm"
            />
         </div>
         <button 
            onClick={() => alert('Advanced filters coming soon! For now, use the search box to filter products.')}
            className="flex items-center gap-3 px-8 py-5 bg-white border border-gh-silver/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gh-charcoal/40 hover:text-gh-charcoal hover:border-gh-charcoal/20 transition-all"
          >
            <Filter className="h-4 w-4" />
            Matrix Filters
         </button>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-[40px] border border-gh-silver/20 overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-gh-silver/10">
                     <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30">Item Module</th>
                     <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30">Category</th>
                     <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30">Unit Price</th>
                     <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30">Stock Sync</th>
                     <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30">AI Sync</th>
                     <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gh-silver/5">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="group hover:bg-gh-silver/5 transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 rounded-2xl bg-gh-charcoal overflow-hidden border border-gh-silver/20 shrink-0">
                                 <Image 
                                   src={product.image} 
                                   alt={product.name} 
                                   fill
                                   className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                 />
                              </div>
                             <div>
                                <span className="block text-[11px] font-black uppercase tracking-tighter text-gh-charcoal leading-none mb-1.5">{product.name}</span>
                                <span className="block text-[8px] font-black uppercase tracking-widest text-gh-charcoal/30">ID: {product.id}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-gh-silver/10 rounded-full text-[8px] font-black uppercase tracking-widest text-gh-charcoal/60">
                             <Tag className="h-3 w-3" /> {product.category}
                          </span>
                       </td>
                       <td className="px-8 py-6 text-sm font-black text-gh-charcoal">
                          ${product.price}
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <span className={`text-[10px] font-black ${product.stock < 10 ? "text-red-500" : "text-gh-charcoal"}`}>
                                {product.stock} UNITS
                             </span>
                             {product.stock < 10 && <AlertTriangle className="h-3 w-3 text-red-500 animate-pulse" />}
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <div className="h-1 w-12 bg-gh-charcoal/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gh-charcoal" style={{ width: `${product.aiRating}%` }} />
                             </div>
                             <span className="text-[10px] font-black text-gh-charcoal">{product.aiRating}%</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <Link href={`/shop/${product.id}`} target="_blank" className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gh-charcoal hover:text-white transition-all text-gh-charcoal/30">
                                <ExternalLink className="h-4 w-4" />
                             </Link>
                             <Link href={`/admin/products/${product.id}`} className="h-10 w-10 flex items-center justify-center rounded-xl bg-gh-silver/10 hover:bg-gh-charcoal hover:text-white transition-all text-gh-charcoal">
                                <Edit className="h-4 w-4" />
                             </Link>
                             <button 
                                onClick={() => handleDelete(product)}
                                className="h-10 w-10 flex items-center justify-center rounded-xl bg-gh-silver/10 hover:bg-red-500 hover:text-white transition-all text-gh-charcoal cursor-pointer"
                                title="Delete product"
                              >
                                 <Trash2 className="h-4 w-4" />
                              </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
      
      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
         <div className="p-8 bg-gh-charcoal text-white rounded-[32px] flex items-center justify-between">
            <div>
               <span className="block text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">Unique Prototypes</span>
               <span className="text-4xl font-black tracking-tighter leading-none">{products.length}</span>
            </div>
            <Package className="h-8 w-8 opacity-20" />
         </div>
         <div className="p-8 bg-white border border-gh-silver/20 rounded-[32px] flex items-center justify-between">
            <div>
               <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 mb-2">Total Stock Flow</span>
               <span className="text-4xl font-black tracking-tighter leading-none text-gh-charcoal">
                 {products.reduce((acc, p) => acc + p.stock, 0)}
               </span>
            </div>
            <ShoppingBag className="h-8 w-8 text-gh-charcoal/10" />
         </div>
         <div className="p-8 bg-white border border-gh-silver/20 rounded-[32px] flex items-center justify-between">
            <div>
               <span className="block text-[9px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 mb-2">Avg. AI Sync</span>
               <span className="text-4xl font-black tracking-tighter leading-none text-gh-charcoal">
                 {Math.round(products.reduce((acc, p) => acc + p.aiRating, 0) / products.length)}%
               </span>
            </div>
            <Zap className="h-8 w-8 text-gh-charcoal/10" />
         </div>
      </div>
    </div>

    {/* Delete Confirmation Modal */}
    <AnimatePresence>
      {showDeleteModal && deletingProduct && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cancelDelete}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-white rounded-[40px] border-2 border-red-500/20 shadow-2xl max-w-md w-full p-10 relative">
              {/* Close Button */}
              <button
                onClick={cancelDelete}
                className="absolute top-8 right-8 h-10 w-10 rounded-xl flex items-center justify-center hover:bg-red-500/10 transition-all text-gh-charcoal/40 hover:text-red-500 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Warning Icon */}
              <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 mx-auto">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>

              {/* Header */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gh-charcoal mb-3">
                  Delete <br /> Product?
                </h2>
                <p className="text-[11px] font-black uppercase tracking-wide text-gh-charcoal/60 mb-2">
                  {deletingProduct.name}
                </p>
                <p className="text-[9px] font-black uppercase tracking-widest text-red-500">
                  ⚠ This action cannot be undone
                </p>
              </div>

              {/* Product Info */}
              <div className="bg-red-500/5 rounded-2xl p-6 mb-8 border border-red-500/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">
                    Category
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/70">
                    {deletingProduct.category}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">
                    Stock
                  </span>
                  <span className="text-lg font-black text-red-500">
                    {deletingProduct.stock} Units
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">
                    Product ID
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/70">
                    {deletingProduct.id}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="flex-1 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/60 hover:text-gh-charcoal transition-all border-2 border-gh-silver/20 hover:border-gh-charcoal/20 rounded-2xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all rounded-2xl shadow-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
  );
}
