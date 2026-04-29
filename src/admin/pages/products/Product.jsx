import { useState } from "react";
import styles from "./Product.module.css";

import { toBase64 } from "../../../utils/toBase";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, updateProduct } from "../../../redux/addProductSlice";

const Products = () => {
    const dispatch = useDispatch();
    const productsSelector = useSelector((state) => state.product.products || []);
    const categorySelector = useSelector((state) => state.category.items || []);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(null);
    const [formKey, setFormKey] = useState(0);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        oldPrice: "",
        quantity: "",
        categoryId: "",
        mainImage: null,
    });

    // LOAD DATA


    // SAVE DATA


    // RESET FORM
    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            price: "",
            oldPrice: "",
            quantity: "",
            categoryId: "",
            mainImage: null,
        });
        setEditId(null);
        setFormKey((prev) => prev + 1);
    };

    const getBadge = (price, oldPrice) => {
        if (!oldPrice) return "New";
        const discount = Math.round(((oldPrice - price) / oldPrice) * 100);
        return `-${discount}%`;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isValidNumber = (val) => /^\d+(\.\d+)?$/.test(val);

    const handleSubmit = async () => {
        setError("");

        if (!form.title.trim()) return setError("Product name required");
        if (!form.description.trim()) return setError("Description required");

        if (!isValidNumber(form.price))
            return setError("Price must be number");

        if (form.oldPrice && !isValidNumber(form.oldPrice))
            return setError("Old price must be number");

        if (!form.categoryId) return setError("Select category");

        if (!form.quantity || Number(form.quantity) <= 0)
            return setError("Quantity must be > 0");

        // 🔥 image size limit
        // if (form.mainImage && form.mainImage.size > 200 * 1024)
        //     return setError("Image must be under 200KB");

        let mainImage = null;

        if (form.mainImage) {
            mainImage = await toBase64(form.mainImage);
        }

        // ADD
        if (!editId) {
            if (!mainImage) return setError("Main image required");

            const newProduct = {
                id: Date.now(),
                title: form.title,
                description: form.description,
                price: Number(form.price),
                oldPrice: Number(form.oldPrice) || null,
                quantity: Number(form.quantity),
                categoryId: form.categoryId,
                mainImage,
                badge: getBadge(
                    Number(form.price),
                    Number(form.oldPrice)
                ),
            };
            dispatch(addProduct(newProduct));


        }

        // UPDATE
        else {
            dispatch(
                updateProduct({
                    id: editId,
                    data: {
                        title: form.title,
                        description: form.description,
                        price: Number(form.price),
                        oldPrice: Number(form.oldPrice) || null,
                        quantity: Number(form.quantity),
                        categoryId: form.categoryId,
                        ...(mainImage ? { mainImage } : {}),
                        badge: getBadge(
                            Number(form.price),
                            Number(form.oldPrice)
                        ),
                    },
                })
            );

        }

        resetForm();
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const handleEdit = (p) => {
        setForm({
            title: p.title,
            description: p.description,
            price: p.price,
            oldPrice: p.oldPrice || "",
            quantity: p.quantity,
            categoryId: p.categoryId,
            mainImage: null,
        });
        setEditId(p.id);
    };

    const getCategoryName = (id) => {
        const cat = categorySelector.find((c) => c.id == id);
        return cat ? cat.name : "N/A";
    };

    return (
        <div className={styles.container}>
            <h2>Products</h2>

            {/* FORM */}
            <div key={formKey} className={styles.form}>
                <input
                    name="title"
                    placeholder="Product Name"
                    value={form.title}
                    onChange={handleChange}
                />

                <input
                    name="description"
                    placeholder="Product Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <div className={styles.priceInput}>
                    <span>₹</span>
                    <input
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.priceInput}>
                    <span>₹</span>
                    <input
                        name="oldPrice"
                        placeholder="Old Price"
                        value={form.oldPrice}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.qtyBox}>
                    <label>Quantity</label>
                    <input
                        type="number"
                        min="1"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                    />
                </div>

                <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    {categorySelector.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <div className={styles.fileBox}>
                    <label>Main Image</label>
                    <input
                        type="file"
                        onChange={(e) =>
                            setForm({ ...form, mainImage: e.target.files[0] })
                        }
                    />
                </div>

                <button onClick={handleSubmit}>
                    {editId ? "Update Product" : "Add Product"}
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {/* TABLE */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Badge</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {productsSelector.length === 0 ? (
                        <tr>
                            <td colSpan="8">No products found</td>
                        </tr>
                    ) : (
                        productsSelector.map((p) => (
                            <tr key={p.id}>
                                <td>
                                    <img
                                        src={p.mainImage}
                                        className={styles.thumb}
                                    />
                                </td>

                                <td>{p.title}</td>

                                <td>
                                    {p.description.length > 40
                                        ? p.description.slice(0, 40) + "..."
                                        : p.description}
                                </td>

                                <td>{getCategoryName(p.categoryId)}</td>

                                <td>
                                    ₹{p.price}
                                    {p.oldPrice && (
                                        <span className={styles.old}>
                                            ₹{p.oldPrice}
                                        </span>
                                    )}
                                </td>

                                <td>{p.quantity}</td>

                                <td>
                                    <span className={styles.badge}>
                                        {p.badge}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        className={styles.update}
                                        onClick={() => handleEdit(p)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className={styles.update}
                                        onClick={() => handleDelete(p.id)}
                                    >
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