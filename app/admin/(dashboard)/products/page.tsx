"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { adminApi } from "../../../../lib/adminApi";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);
  const [colorsList, setColorsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit & Preview States
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [fullscreenPreview, setFullscreenPreview] = useState<string | null>(
    null,
  );

  // Master Data State
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [details, setDetails] = useState("");
  const [specificationsList, setSpecificationsList] = useState<
    { key: string; value: string }[]
  >([]);

  const addSpecification = () => {
    setSpecificationsList([...specificationsList, { key: "", value: "" }]);
  };

  const removeSpecification = (index: number) => {
    const newList = [...specificationsList];
    newList.splice(index, 1);
    setSpecificationsList(newList);
  };

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    val: string,
  ) => {
    const newList = [...specificationsList];
    newList[index][field] = val;
    setSpecificationsList(newList);
  };
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const [catData, colData] = await Promise.all([
        adminApi.get("/categories"),
        adminApi.get("/colors"),
      ]);
      setCategoriesList(catData);
      setColorsList(colData);
    } catch (error) {
      console.error("Failed to fetch master data", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await adminApi.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await adminApi.delete(`/products/${id}`);
        fetchProducts(); // Refresh list
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.post("/categories", { name: newCategory });
      setNewCategory("");
      fetchMasterData();
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  const handleEditCategory = async (cat: any) => {
    const newName = prompt("Enter new category name:", cat.name);
    if (newName && newName.trim() !== cat.name) {
      try {
        await adminApi.patch(`/categories/${cat._id}`, {
          name: newName.trim(),
        });
        fetchMasterData();
      } catch (error) {
        console.error("Failed to edit category", error);
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await adminApi.delete(`/categories/${id}`);
      fetchMasterData();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const handleAddColor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.post("/colors", { name: newColor });
      setNewColor("");
      fetchMasterData();
    } catch (error) {
      console.error("Failed to add color", error);
    }
  };

  const handleEditColor = async (col: any) => {
    const newName = prompt("Enter new color name:", col.name);
    if (newName && newName.trim() !== col.name) {
      try {
        await adminApi.patch(`/colors/${col._id}`, { name: newName.trim() });
        fetchMasterData();
      } catch (error) {
        console.error("Failed to edit color", error);
      }
    }
  };

  const handleDeleteColor = async (id: string) => {
    try {
      await adminApi.delete(`/colors/${id}`);
      fetchMasterData();
    } catch (error) {
      console.error("Failed to delete color", error);
    }
  };

  const resetForm = () => {
    setEditProductId(null);
    setTitle("");
    setCategory("");
    setColor("");
    setPrice("");
    setStock("");
    setDetails("");
    setSpecificationsList([]);
    setExistingImageUrl("");
    setImagePreview("");
    setImageFile(null);
    setIsModalOpen(false);
  };

  const handleEditClick = (product: any) => {
    setEditProductId(product._id || product.id);
    setTitle(product.title || product.name);
    setCategory(product.category);
    setColor(product.color);
    setPrice(product.price);
    setStock(product.stock !== undefined ? product.stock.toString() : "");
    setDetails(product.details || "");

    const existingSpecs = product.technicalSpecifications || {};
    const specsArray = Object.entries(existingSpecs).map(([key, value]) => ({
      key,
      value: value as string,
    }));
    setSpecificationsList(specsArray);

    setExistingImageUrl(product.imageUrl || "");
    setImagePreview(product.imageUrl || "");
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(existingImageUrl);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        // Upload to Cloudinary via backend
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/upload/image`,
          {
            method: "POST",
            body: formData,
          },
        );
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadData.message || "Image upload failed");
        imageUrl = uploadData.url;
      }

      const specsObject = specificationsList.reduce(
        (acc, curr) => {
          if (curr.key.trim() && curr.value.trim()) {
            acc[curr.key.trim()] = curr.value.trim();
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      const finalImageUrl = imageUrl || existingImageUrl;

      const payload = {
        title,
        category,
        color,
        price,
        stock: stock ? parseInt(stock, 10) : 0,
        details,
        technicalSpecifications: specsObject,
        imageUrl: finalImageUrl,
      };

      if (editProductId) {
        await adminApi.patch(`/products/${editProductId}`, payload);
      } else {
        await adminApi.post("/products", payload);
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product", error);
      alert("Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Manage Collection
        </h1>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsMasterModalOpen(true)}
            className="bg-white border-2 border-gray-900 hover:bg-gray-50 text-gray-900 font-bold px-6 py-2.5 rounded-xl transition-colors shadow-lg shadow-gray-900/5"
          >
            Manage Categories/Colors
          </button>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="bg-gray-900 hover:bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-lg shadow-gray-900/20"
          >
            + Add New Product
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-gray-900">
                {editProductId ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSaveProduct}
              className="p-6 space-y-4 overflow-y-auto flex-1 min-h-0"
            >
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Title
                </label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    {categoriesList.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Color
                  </label>
                  <select
                    required
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="">Select Color</option>
                    {colorsList.map((col) => (
                      <option key={col._id} value={col.name}>
                        {col.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    required
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Product Image
                </label>
                {imagePreview && (
                  <div className="mb-3 w-32 h-32 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  required={!editProductId}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Details (Optional)
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-bold text-gray-700">
                    Technical Specifications (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors bg-orange-50 px-3 py-1 rounded-lg"
                  >
                    + Add Spec
                  </button>
                </div>

                <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                  {specificationsList.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-2">
                      No specifications added yet.
                    </p>
                  ) : (
                    specificationsList.map((spec, index) => (
                      <div key={index} className="flex space-x-2 items-start">
                        <input
                          type="text"
                          value={spec.key}
                          onChange={(e) =>
                            updateSpecification(index, "key", e.target.value)
                          }
                          placeholder="Label (e.g. Storage)"
                          className="w-1/3 px-3 py-2 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) =>
                            updateSpecification(index, "value", e.target.value)
                          }
                          placeholder="Value (e.g. 64GB)"
                          className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeSpecification(index)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl font-bold bg-gray-900 text-white hover:bg-orange-500 transition-colors shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product._id || product.id}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setFullscreenPreview(product.imageUrl)}
                  />
                )}
                <Link
                  href={`/admin/products/${product._id || product.id}`}
                  className="font-bold text-gray-900 text-lg leading-tight hover:text-orange-500 hover:underline transition-colors"
                >
                  {product.title || product.name}
                </Link>
              </div>
              <span className="font-black text-orange-500">
                {product.price}
              </span>
            </div>
            <div className="flex flex-col space-y-1 text-sm text-gray-500">
              <p>
                <span className="font-semibold text-gray-700">Category:</span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Color:</span>{" "}
                {product.color}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Stock:</span>{" "}
                {product.stock ?? 0}
              </p>
            </div>
            <div className="pt-3 border-t border-gray-50 flex justify-end space-x-4 items-center">
              <Link
                href={`/admin/products/${product._id || product.id}`}
                className="text-gray-500 hover:text-gray-700 font-bold text-sm flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </Link>
              <button
                onClick={() => handleEditClick(product)}
                className="text-blue-500 hover:text-blue-700 font-bold text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id || product.id)}
                className="text-red-500 hover:text-red-700 font-bold text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                Image
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                Product Title
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                Category
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                Color
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                Stock
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm">
                Price
              </th>
              <th className="px-6 py-4 font-bold text-gray-700 text-sm text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr
                key={product._id || product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-3">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setFullscreenPreview(product.imageUrl)}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                      No Img
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <Link
                    href={`/admin/products/${product._id || product.id}`}
                    className="hover:text-orange-500 hover:underline transition-colors"
                  >
                    {product.title || product.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-500">{product.category}</td>
                <td className="px-6 py-4 text-gray-500">{product.color}</td>
                <td className="px-6 py-4 text-gray-500">{product.stock ?? 0}</td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  {product.price}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    href={`/admin/products/${product._id || product.id}`}
                    className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id || product.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isMasterModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-gray-900">
                Manage Master Data
              </h2>
              <button
                onClick={() => setIsMasterModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-8 overflow-y-auto flex-1 min-h-0">
              {/* Category Management */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">
                  Categories
                </h3>
                <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
                  <input
                    required
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name..."
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm"
                  >
                    Add
                  </button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {categoriesList.map((cat) => (
                    <div
                      key={cat._id}
                      className="bg-gray-100 pl-3 pr-1 py-1 rounded-full flex items-center gap-1 text-sm text-gray-900 font-medium"
                    >
                      <span>{cat.name}</span>
                      <button
                        type="button"
                        onClick={() => handleEditCategory(cat)}
                        className="bg-white text-gray-400 hover:text-blue-500 p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                        title="Edit"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="bg-white text-gray-400 hover:text-red-500 p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {categoriesList.length === 0 && (
                    <span className="text-gray-400 text-sm">
                      No categories added yet.
                    </span>
                  )}
                </div>
              </div>

              {/* Color Management */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">Colors</h3>
                <form onSubmit={handleAddColor} className="flex gap-2 mb-4">
                  <input
                    required
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="New color name..."
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm"
                  >
                    Add
                  </button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {colorsList.map((col) => (
                    <div
                      key={col._id}
                      className="bg-gray-100 pl-3 pr-1 py-1 rounded-full flex items-center gap-1 text-sm text-gray-900 font-medium"
                    >
                      <span>{col.name}</span>
                      <button
                        type="button"
                        onClick={() => handleEditColor(col)}
                        className="bg-white text-gray-400 hover:text-blue-500 p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                        title="Edit"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteColor(col._id)}
                        className="bg-white text-gray-400 hover:text-red-500 p-1 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {colorsList.length === 0 && (
                    <span className="text-gray-400 text-sm">
                      No colors added yet.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Preview Modal */}
      {fullscreenPreview && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setFullscreenPreview(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setFullscreenPreview(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 font-bold text-xl"
            >
              ✕ Close
            </button>
            <img
              src={fullscreenPreview}
              alt="Fullscreen Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
