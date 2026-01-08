"use client";

import { useState } from "react";
import { Plus, Tag, Edit, Trash2, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: number;
  name: string;
  productCount: number;
  isActive: boolean;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Footwear", productCount: 45, isActive: true },
    { id: 2, name: "Apparel", productCount: 32, isActive: true },
    { id: 3, name: "Velocity Class", productCount: 28, isActive: true },
    { id: 4, name: "Terrain Class", productCount: 19, isActive: true },
    { id: 5, name: "Hybrid Class", productCount: 15, isActive: true },
    { id: 6, name: "Elite Class", productCount: 12, isActive: true },
    { id: 7, name: "Size", productCount: 8, isActive: false },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", isActive: true });

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, isActive: category.isActive });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", isActive: true });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: "", isActive: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, name: formData.name, isActive: formData.isActive }
          : cat
      ));
    } else {
      // Add new category
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id), 0) + 1,
        name: formData.name,
        productCount: 0,
        isActive: formData.isActive
      };
      setCategories([...categories, newCategory]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingCategory) {
      setCategories(categories.filter(c => c.id !== deletingCategory.id));
      setShowDeleteModal(false);
      setDeletingCategory(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingCategory(null);
  };

  const toggleStatus = (id: number) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ));
  };

  return (
    <>
      <div className="space-y-12 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/40 mb-3 block">Product Classification</span>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
              Category <br /> Management
            </h1>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="group flex items-center justify-center gap-3 bg-gh-charcoal px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer rounded-2xl shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        </div>

        {/* Search & Stats */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/20 group-focus-within:text-gh-charcoal transition-colors" />
            <input
              type="text"
              placeholder="SEARCH CATEGORIES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gh-silver/20 py-5 pl-14 pr-6 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal/20 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="px-6 py-4 bg-white border border-gh-silver/20 rounded-2xl">
              <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40 block mb-1">Total</span>
              <span className="text-2xl font-black text-gh-charcoal">{categories.length}</span>
            </div>
            <div className="px-6 py-4 bg-white border border-gh-silver/20 rounded-2xl">
              <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40 block mb-1">Active</span>
              <span className="text-2xl font-black text-green-500">{categories.filter(c => c.isActive).length}</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-8 rounded-3xl border border-gh-silver/20 shadow-sm hover:shadow-xl hover:border-gh-charcoal/10 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-gh-charcoal/5 flex items-center justify-center group-hover:bg-gh-charcoal group-hover:scale-110 transition-all">
                    <Tag className="h-7 w-7 text-gh-charcoal group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-gh-charcoal hover:text-white transition-all text-gh-charcoal/40 border border-transparent hover:border-gh-charcoal"
                      title="Edit category"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-red-500 hover:text-white transition-all text-gh-charcoal/40 border border-transparent hover:border-red-500"
                      title="Delete category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tighter text-gh-charcoal mb-1">
                  {category.name}
                </h3>

                <p className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40 mb-6">
                  ID: CAT-{String(category.id).padStart(3, '0')}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gh-silver/10">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40 block mb-1">
                      Products
                    </span>
                    <span className="text-lg font-black text-gh-charcoal">
                      {category.productCount}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleStatus(category.id)}
                    className={`px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                      category.isActive
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white"
                        : "bg-gh-silver/20 text-gh-charcoal/40 hover:bg-gh-charcoal hover:text-white"
                    }`}
                    title={category.isActive ? "Click to deactivate" : "Click to activate"}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <Tag className="h-12 w-12 text-gh-charcoal/10 mx-auto mb-4" />
            <p className="text-sm font-black uppercase tracking-widest text-gh-charcoal/30">
              No categories found
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-[40px] border border-gh-silver/20 shadow-2xl max-w-md w-full p-10 relative">
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-8 right-8 h-10 w-10 rounded-xl flex items-center justify-center hover:bg-gh-silver/20 transition-all text-gh-charcoal/40 hover:text-gh-charcoal"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-gh-charcoal mb-2">
                    {editingCategory ? "Update" : "Create"} <br /> Category
                  </h2>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">
                    {editingCategory ? "Modify existing category" : "Add new product classification"}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/40 ml-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Premium Footwear"
                      required
                      className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-sm font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gh-silver/5 rounded-2xl">
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal mb-1">
                        Active Status
                      </span>
                      <span className="block text-[8px] font-black uppercase tracking-widest text-gh-charcoal/40">
                        {formData.isActive ? "Visible to users" : "Hidden from users"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                      className={`h-8 w-14 rounded-full p-1 transition-all flex items-center ${
                        formData.isActive ? "bg-green-500 justify-end" : "bg-gh-silver/30 justify-start"
                      }`}
                    >
                      <div className="h-6 w-6 bg-white rounded-full shadow-sm" />
                    </button>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/40 hover:text-gh-charcoal transition-all border border-gh-silver/20 hover:border-gh-charcoal/20 rounded-2xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 bg-gh-charcoal text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all rounded-2xl shadow-lg cursor-pointer"
                    >
                      {editingCategory ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && deletingCategory && (
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
                  className="absolute top-8 right-8 h-10 w-10 rounded-xl flex items-center justify-center hover:bg-red-500/10 transition-all text-gh-charcoal/40 hover:text-red-500"
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
                    Delete <br /> Category?
                  </h2>
                  <p className="text-[11px] font-black uppercase tracking-wide text-gh-charcoal/60 mb-2">
                    {deletingCategory.name}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-red-500">
                    ⚠ This action cannot be undone
                  </p>
                </div>

                {/* Category Info */}
                <div className="bg-red-500/5 rounded-2xl p-6 mb-8 border border-red-500/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">
                      Products Affected
                    </span>
                    <span className="text-lg font-black text-red-500">
                      {deletingCategory.productCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">
                      Category ID
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/60">
                      CAT-{String(deletingCategory.id).padStart(3, '0')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={cancelDelete}
                    className="flex-1 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/60 hover:text-gh-charcoal transition-all border-2 border-gh-silver/20 hover:border-gh-charcoal/20 rounded-2xl"
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
