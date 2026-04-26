'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { products } from '../../../data/products';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Image as ImageIcon,
  DollarSign,
  Percent,
  ChevronRight,
  ArrowLeft,
  Trash2
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

export default function SellerProducts() {
  const [localProducts, setLocalProducts] = useState(products);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fashion',
    price: '',
    commission: 15,
    description: '',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' // Default placeholder
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: localProducts.length + 1,
      ...formData,
      price: parseInt(formData.price) || 0,
      rating: 0,
      reviews: 0,
      slug: formData.name.toLowerCase().replace(/ /g, '-'),
      status: 'Active',
      sales: 0,
      revenue: '₹0',
      influencer: { name: "System", handle: "system", image: "https://picsum.photos/seed/system/100/100" }
    };
    
    setLocalProducts([newProduct, ...localProducts]);
    setSuccessMessage('Product published successfully!');
    setShowAddForm(false);
    setFormData({
      name: '',
      category: 'Fashion',
      price: '',
      commission: 15,
      description: '',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop'
    });
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setLocalProducts(localProducts.filter(p => p.id !== productId));
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const filteredProducts = localProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout type="seller">
      <div className="max-w-6xl mx-auto">
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-10 right-10 z-50 bg-accent text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-accent/20"
          >
            {successMessage}
          </motion.div>
        )}
        {!showAddForm ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="text-3xl font-black text-neutral-black tracking-tight font-display">Product Management</h1>
                <p className="text-neutral-gray font-medium">Manage your catalog and affiliate commissions.</p>
              </div>
              <button 
                onClick={() => setShowAddForm(true)}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
              >
                <Plus size={20} />
                List New Product
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-grow flex items-center gap-4 bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm">
                <Search size={20} className="text-neutral-gray" />
                <input 
                  type="text" 
                  placeholder="Search your products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-full font-bold text-neutral-black"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-3xl font-bold text-neutral-black shadow-sm">
                <Filter size={18} />
                Filters
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-neutral-gray bg-gray-50/50 border-b border-gray-100">
                        <th className="px-8 py-5">Product Details</th>
                        <th className="px-6 py-5">Inventory</th>
                        <th className="px-6 py-5">Commission</th>
                        <th className="px-6 py-5 text-right">Price</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
  <AnimatePresence mode="popLayout">
    {filteredProducts.map((product) => (
      <motion.tr 
        key={product.id} 
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20, backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
        className="group hover:bg-gray-50/50 transition-colors"
      >
        <td className="px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
              <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="block font-bold text-neutral-black mb-0.5">{product.name}</span>
              <span className="text-[10px] font-black tracking-wider text-primary uppercase bg-primary/5 px-2 py-0.5 rounded-lg">{product.category}</span>
            </div>
          </div>
        </td>
        <td className="px-6 py-6 font-bold text-neutral-gray text-sm">
          {product.sales ? 'Limited' : 'New Stock'}
        </td>
        <td className="px-6 py-6">
          <div className="flex items-center gap-1.5 text-accent font-black">
            <Percent size={14} />
            {product.commission || 15}%
          </div>
        </td>
        <td className="px-6 py-6 text-right font-black text-neutral-black">₹{product.price.toLocaleString('en-IN')}</td>
        <td className="px-8 py-6 text-right">
          <div className="flex items-center justify-end gap-2">
            <button className="p-2.5 hover:bg-white rounded-xl text-neutral-gray hover:text-neutral-black transition-all shadow-sm border border-transparent hover:border-gray-100">
              <MoreVertical size={16} />
            </button>
            <button 
              onClick={() => handleDeleteProduct(product.id)}
              className="p-2.5 hover:bg-red-50 rounded-xl text-red-400 hover:text-red-500 transition-all shadow-sm border border-transparent hover:border-red-100"
              title="Delete Product"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </motion.tr>
    ))}
  </AnimatePresence>
</tbody>
                  </table>
                </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto py-10">
            <button 
              onClick={() => setShowAddForm(false)}
              className="flex items-center gap-2 text-neutral-gray font-bold hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              Back to Products
            </button>
            <div className="bg-white p-8 sm:p-12 rounded-[48px] border border-gray-100 shadow-xl relative overflow-hidden">
               <h2 className="text-3xl font-black text-neutral-black mb-8 font-display">List New Product</h2>
               
               <form className="space-y-6" onSubmit={handleAddProduct}>
                 <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-neutral-gray ml-2">Product Name</label>
                   <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Pro Wireless Gaming Mouse" 
                    className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 ring-primary/20 font-bold transition-all" 
                   />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-neutral-gray ml-2">Category</label>
                     <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 ring-primary/20 font-bold transition-all appearance-none"
                     >
                       <option>Fashion</option>
                       <option>Electronics</option>
                       <option>Beauty</option>
                       <option>Home Decor</option>
                       <option>Fitness</option>
                       <option>Grocery (Food)</option>
                       <option>Jewellery</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-neutral-gray ml-2">Sale Price (₹)</label>
                     <input 
                      type="number" 
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="2999" 
                      className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 ring-primary/20 font-bold transition-all" 
                     />
                   </div>
                 </div>

                 <div className="p-8 rounded-[32px] bg-primary/5 border border-primary/10 space-y-4">
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold text-primary flex items-center gap-2">
                        <Percent size={18} />
                        Affiliate Commission
                     </h3>
                     <span className="text-2xl font-black text-primary">{formData.commission}%</span>
                   </div>
                   <input 
                    type="range" 
                    name="commission"
                    min="1" 
                    max="50" 
                    value={formData.commission}
                    onChange={handleInputChange}
                    className="w-full accent-primary h-2 rounded-full cursor-pointer" 
                   />
                   <p className="text-[10px] font-bold text-neutral-gray leading-relaxed">
                     Set an attractive commission to motivate top influencers to promote your product. Our platform fee is a flat 5% on top of this.
                   </p>
                 </div>

                 <div className="space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-neutral-gray ml-2">Product Description</label>
                   <textarea 
                    rows="4" 
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell influencers and customers why this product is special..." 
                    className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 ring-primary/20 font-bold transition-all resize-none"
                   ></textarea>
                 </div>

                 <div className="grid grid-cols-2 gap-4 pt-4">
                    <button type="button" onClick={() => setShowAddForm(false)} className="py-5 rounded-2xl bg-gray-100 text-neutral-black font-bold hover:bg-gray-200 transition-all">
                      Cancel
                    </button>
                    <button type="submit" className="py-5 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                      Publish Product
                    </button>
                 </div>
               </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
