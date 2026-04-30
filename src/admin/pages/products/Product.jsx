import { useState } from "react";
import styles from "./Product.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProduct,
} from "../../../api/admin_product.api";
import { getAdminCategories } from "../../../api/admin_category.api";
import Snackbar from "../../../components/ui/Snackbar";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const Products = () => {
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "error" });
  const [editId, setEditId] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    quantity: "",
    category: "",
    image: null,
  });

  const showSnackbar = (message, type = "error") => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => setSnackbar({ open: false, message: "", type: "error" }), 3000);
  };

  const { data: productsData, isLoading, isError, error } = useQuery({
    queryKey: ["admin-products"],
    queryFn: getAdminProducts,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: getAdminCategories,
  });

  const createMutation = useMutation({
    mutationFn: createAdminProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      showSnackbar("Product created successfully.", "success");
      resetForm();
    },
    onError: (err) => showSnackbar(err.message || "Unable to create product."),
  });

  const updateMutation = useMutation({
    mutationFn: updateAdminProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      showSnackbar("Product updated successfully.", "success");
      setEditId(null);
      resetForm();
    },
    onError: (err) => showSnackbar(err.message || "Unable to update product."),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      showSnackbar("Product deleted successfully.", "success");
    },
    onError: (err) => showSnackbar(err.message || "Unable to delete product."),
  });

  const products = productsData?.data?.products || [];
  const categories = categoriesData?.data?.categories || [];
  const toImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
      return path;
    }
    if (path.startsWith("/uploads/")) return `${API_BASE_URL}${path}`;
    if (path.startsWith("uploads/")) return `${API_BASE_URL}/${path}`;
    return path;
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      oldPrice: "",
      quantity: "",
      category: "",
      image: null,
    });
    setFileInputKey((prev) => prev + 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = () => {
    setFormError("");

    if (!form.name.trim()) return setFormError("Product name is required");
    if (!form.description.trim()) return setFormError("Description is required");
    if (!form.price || Number(form.price) < 0) return setFormError("Price must be valid");
    if (form.oldPrice && Number(form.oldPrice) < 0) return setFormError("Old price must be valid");
    if (!form.quantity || Number(form.quantity) <= 0) return setFormError("Quantity must be valid");
    if (!form.category) return setFormError("Please select category");
    if (!editId && !form.image) return setFormError("Product image is required");

    const computedBadge =
      Number(form.oldPrice) > Number(form.price)
        ? `-${Math.round(((Number(form.oldPrice) - Number(form.price)) / Number(form.oldPrice)) * 100)}%`
        : "New";

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : "",
      quantity: Number(form.quantity),
      badge: computedBadge,
      category: form.category,
      image: form.image,
    };

    if (editId) {
      updateMutation.mutate({ id: editId, ...payload });
      return;
    }

    createMutation.mutate(payload);
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      quantity: product.quantity ?? product.stock ?? "",
      category: product.category?._id || product.category || "",
      image: null,
    });
  };

  return (
    <div className={styles.container}>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ open: false, message: "", type: "error" })}
      />
      <h2>Products</h2>

      <div className={styles.form}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
        <input
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          min="0"
          name="oldPrice"
          placeholder="Old Price"
          value={form.oldPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          min="1"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <input
          type="number"
          min="0"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className={styles.fileBox}>
          <label>Product Image</label>
          <input
            key={fileInputKey}
            type="file"
            accept="image/*"
            onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.files?.[0] || null }))}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {formError ? <p className={styles.error}>{formError}</p> : null}
      {isError ? <p className={styles.error}>{error.message}</p> : null}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Old Price</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Badge</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="10">Loading products...</td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="10">No products found</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.images?.[0] ? (
                    <img
                      src={toImageUrl(p.images[0])}
                      className={styles.thumb}
                      alt={p.name}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>{p.name}</td>
                <td>{p.description || "-"}</td>
                <td>{p.category?.name || "-"}</td>
                <td>{p.oldPrice ? `₹${p.oldPrice}` : "-"}</td>
                <td>₹{p.price}</td>
                <td>{p.quantity ?? p.stock ?? 0}</td>
                <td>{p.badge || "-"}</td>
                <td>
                  <button className={styles.update} onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button className={styles.update} onClick={() => deleteMutation.mutate(p._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;