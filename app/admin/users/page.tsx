"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Search, 
  Filter, 
  Shield, 
  Edit,
  Trash2,
  UserPlus,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getUsers, updateUser, deleteUser } from "@/app/actions/users";

interface UserProfile {
  id: string; // Changed to string for UUID
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "GHF_MEMBER";
  status: "ACTIVE" | "INACTIVE"; // Computed from DB fetching usually, or default
  joined: string;
  fnNetworkTier?: string;
  fnRank?: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserProfile | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: "ADMIN" | "USER" | "GHF_MEMBER";
    status: string;
    fnNetworkTier: string;
    fnRank: number;
  }>({ name: "", email: "", role: "USER", status: "ACTIVE", fnNetworkTier: "PIONEER", fnRank: 0 });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await getUsers();
    if (res.success && res.data) {
      // Define DB User type strictly matching what's returned
      const mappedUsers: UserProfile[] = res.data.map((u: { 
          id: string; 
          name: string | null; 
          email: string; 
          role: "ADMIN" | "USER" | "GHF_MEMBER"; 
          createdAt: Date; 
          fnNetworkTier: string | null; 
          fnRank: number | null 
      }) => ({
        id: u.id,
        name: u.name || "Unknown",
        email: u.email,
        role: u.role,
        status: "ACTIVE", // Default to Active as DB doesn't have status field yet
        joined: new Date(u.createdAt).toISOString().split("T")[0],
        fnNetworkTier: u.fnNetworkTier || undefined, // Handle null to undefined
        fnRank: u.fnRank || undefined // Handle null to undefined
      }));
      setUsers(mappedUsers);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Simple filter logic for demonstration (User vs non-user)
    if (roleFilter === "ALL") return matchesSearch;
    return matchesSearch && u.role === roleFilter;
  });

  const handleOpenModal = (user?: UserProfile) => {
    if (user) {
      setEditingUser(user);
      setFormData({ 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        status: user.status,
        fnNetworkTier: user.fnNetworkTier || "PIONEER",
        fnRank: user.fnRank || 0
      });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", role: "USER", status: "ACTIVE", fnNetworkTier: "PIONEER", fnRank: 0 });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "USER", status: "ACTIVE", fnNetworkTier: "PIONEER", fnRank: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
        // Optimistic update
        const updatedUsers = users.map(u => 
            u.id === editingUser.id ? { 
              ...u, 
              name: formData.name, 
              email: formData.email, 
              role: formData.role as "ADMIN" | "USER" | "GHF_MEMBER",
              status: formData.status as "ACTIVE" | "INACTIVE",
              fnNetworkTier: formData.fnNetworkTier,
              fnRank: formData.fnRank
            } : u
        );
        setUsers(updatedUsers);
        
        await updateUser(editingUser.id, formData);
        fetchUsers(); // Refresh to ensure sync
    } 
    // New user creation not fully implemented via this simple form usually requires password, skipping for now or adding stub
    
    closeModal();
  };

  const handleDelete = (user: UserProfile) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deletingUser) {
      await deleteUser(deletingUser.id);
      setUsers(users.filter(u => u.id !== deletingUser.id));
      setShowDeleteModal(false);
      setDeletingUser(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingUser(null);
  };

  const toggleFilter = () => {
    // Cycle through simple filters
    const filters = ["ALL", "ADMIN", "USER", "GHF_MEMBER"];
    const currentIndex = filters.indexOf(roleFilter);
    const nextIndex = (currentIndex + 1) % filters.length;
    setRoleFilter(filters[nextIndex]);
  };

  return (
    <>
      <div className="space-y-12 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gh-charcoal/70 mb-3 block">Grassland Population</span>
            <h1 className="text-6xl font-black uppercase tracking-tighter text-gh-charcoal leading-[0.9]">
              Identity <br /> Directory
            </h1>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="group flex items-center justify-center gap-3 bg-gh-charcoal px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-black hover:scale-105 cursor-pointer rounded-2xl shadow-lg"
          >
            <UserPlus className="h-4 w-4" />
            Authorize New Identity
          </button>
        </div>

        {/* Grid Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gh-charcoal/20 group-focus-within:text-gh-charcoal transition-colors" />
              <input 
                  type="text" 
                  placeholder="SEARCH IDENTITIES..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gh-silver/20 py-5 pl-14 pr-6 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal/20 transition-all shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleFilter}
                className={`flex items-center gap-3 px-8 py-5 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                  roleFilter !== "ALL" 
                    ? "bg-gh-charcoal text-white border-gh-charcoal shadow-lg hover:scale-105" 
                    : "bg-white text-gh-charcoal/40 border-gh-silver/20 hover:text-gh-charcoal hover:border-gh-charcoal/20"
                }`}
              >
                  <Filter className="h-4 w-4" />
                  Filter: {roleFilter}
              </button>
              
              <div className="hidden md:flex flex-col items-end justify-center px-4">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gh-charcoal/40">Total Population</span>
                  <span className="text-xl font-black text-gh-charcoal">{users.length}</span>
              </div>
            </div>
        </div>

        {/* Table Interface */}
        <div className="bg-white rounded-[40px] border border-gh-silver/20 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gh-silver/10">
                        <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30">Grassland Identity</th>
                        <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30">Directive (Role)</th>
                        <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30">Archive Status</th>
                        <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30">Engagement Date</th>
                        <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-gh-charcoal/30 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gh-silver/5">
                    <AnimatePresence>
                      {filteredUsers.map((user, i) => (
                        <motion.tr 
                          key={user.id} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: i * 0.05 }}
                          className="group hover:bg-gh-silver/5 transition-colors"
                        >
                          <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gh-charcoal/5 flex items-center justify-center text-xs font-black text-gh-charcoal/30 group-hover:bg-gh-charcoal group-hover:text-white transition-colors">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <span className="block text-[11px] font-black uppercase tracking-tighter text-gh-charcoal leading-none mb-1">{user.name}</span>
                                    <span className="block text-[8px] font-black uppercase tracking-widest text-gh-charcoal/50">{user.email}</span>
                                </div>
                              </div>
                          </td>
                          <td className="px-8 py-6">
                              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.role === "ADMIN" ? "bg-gh-charcoal text-white" : "bg-gh-silver/10 text-gh-charcoal/60"}`}>
                                <Shield className="h-3 w-3" /> {user.role}
                              </span>
                          </td>
                          <td className="px-8 py-6">
                              <div className="flex items-center gap-2">
                                <div className={`h-1.5 w-1.5 rounded-full ${user.status === "ACTIVE" ? "bg-green-500 animate-pulse" : "bg-gh-silver/40"}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${user.status === "ACTIVE" ? "text-gh-charcoal/70" : "text-gh-charcoal/40"}`}>{user.status}</span>
                              </div>
                          </td>
                          <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gh-charcoal/50">
                              {user.joined}
                          </td>
                          <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleOpenModal(user)}
                                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-gh-silver/10 hover:bg-gh-charcoal hover:text-white transition-all text-gh-charcoal cursor-pointer"
                                  title="Edit identity"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleDelete(user)}
                                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-gh-silver/10 hover:bg-red-500 hover:text-white transition-all text-gh-charcoal/40 cursor-pointer"
                                  title="Delete identity"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
              </table>
              
              {loading && (
                 <div className="p-12 text-center">
                    <div className="h-8 w-8 border-2 border-gh-charcoal/20 border-t-gh-charcoal rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm font-black uppercase tracking-widest text-gh-charcoal/30">Loading identities...</p>
                 </div>
              )}

              {!loading && filteredUsers.length === 0 && (
                <div className="p-12 text-center">
                  <UserPlus className="h-12 w-12 text-gh-charcoal/10 mx-auto mb-4" />
                  <p className="text-sm font-black uppercase tracking-widest text-gh-charcoal/30">
                    No identities found
                  </p>
                </div>
              )}
            </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-[40px] border border-gh-silver/20 shadow-2xl max-w-md w-full p-10 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-8 right-8 h-10 w-10 rounded-xl flex items-center justify-center hover:bg-gh-silver/20 transition-all text-gh-charcoal/40 hover:text-gh-charcoal cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-8">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-gh-charcoal mb-2">
                    {editingUser ? "Update" : "Authorize"} <br /> {editingUser ? "Identity" : "New Identity"}
                  </h2>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/40">
                    {editingUser ? "Modify access protocols" : "Grant access to the system"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Alex Chen"
                      required
                      className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-sm font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., alex@archive.io"
                      required
                      className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-6 rounded-xl text-sm font-medium focus:outline-none focus:border-gh-charcoal transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">
                        Directive Role
                      </label>
                        <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as "ADMIN" | "USER" | "GHF_MEMBER" })}
                        className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-4 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all cursor-pointer"
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="GHF_MEMBER">GHF Member</option>
                      </select>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-4 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all cursor-pointer"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-gh-silver/10 mt-6">
                    <div className="space-y-3 flex-1">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">
                         Fame Network Tier
                       </label>
                       <select
                         disabled={formData.role !== "GHF_MEMBER"}
                         value={formData.fnNetworkTier || "PIONEER"}
                         onChange={(e) => setFormData({ ...formData, fnNetworkTier: e.target.value })}
                         className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-4 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all disabled:opacity-50"
                       >
                         <option value="PIONEER">Pioneer</option>
                         <option value="ELITE">Elite</option>
                         <option value="ARCHITECT">Architect</option>
                       </select>
                    </div>
                    <div className="space-y-3 w-1/3">
                       <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gh-charcoal/70 ml-1">
                         Rank
                       </label>
                       <input
                         type="number"
                         disabled={formData.role !== "GHF_MEMBER"}
                         value={formData.fnRank || ""}
                         onChange={(e) => setFormData({ ...formData, fnRank: parseInt(e.target.value) })}
                         placeholder="#"
                         className="w-full bg-gh-silver/10 border border-gh-silver/20 py-4 px-4 rounded-xl text-xs font-black uppercase tracking-widest focus:outline-none focus:border-gh-charcoal transition-all disabled:opacity-50"
                       />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gh-charcoal/60 hover:text-gh-charcoal transition-all border border-gh-silver/20 hover:border-gh-charcoal/20 rounded-2xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 bg-gh-charcoal text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all rounded-2xl shadow-lg cursor-pointer"
                    >
                      {editingUser ? "Update Identity" : "Authorize"}
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
        {showDeleteModal && deletingUser && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDelete}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-[40px] border-2 border-red-500/20 shadow-2xl max-w-md w-full p-10 relative">
                <button
                  onClick={cancelDelete}
                  className="absolute top-8 right-8 h-10 w-10 rounded-xl flex items-center justify-center hover:bg-red-500/10 transition-all text-gh-charcoal/40 hover:text-red-500 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 mx-auto">
                  <Trash2 className="h-8 w-8 text-red-500" />
                </div>

                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-gh-charcoal mb-3">
                    Revoke <br /> Access?
                  </h2>
                  <p className="text-[11px] font-black uppercase tracking-wide text-gh-charcoal/60 mb-2">
                    {deletingUser.name}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-red-500">
                    ⚠ This action cannot be undone
                  </p>
                </div>

                <div className="bg-red-500/5 rounded-2xl p-6 mb-8 border border-red-500/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">
                      Role
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/70">
                      {deletingUser.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gh-charcoal/60">
                      User ID
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gh-charcoal/70">
                      USR-00{deletingUser.id}
                    </span>
                  </div>
                </div>

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
                    Revoke
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
