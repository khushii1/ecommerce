import { useState } from "react";
import styles from "./Categories.module.css";

import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, updateCategory } from "../../../redux/addCategorySlice";

const Categories = () => {
    const dispatch = useDispatch();
    const categoriesSelector = useSelector((state) => state.category.items || []);
    const [error, setError] = useState("");
    const [fileInputKey, setFileInputKey] = useState(0);
    const [editImagePreview, setEditImagePreview] = useState(null);
    const [editImageName, setEditImageName] = useState("");

    const [editId, setEditId] = useState(null);

    // ✅ Single form state
    const [form, setForm] = useState({
        name: "",
        image: null,
    });

    // ✅ Convert image to base64
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    const handleSubmit = async () => {
        setError("");

        // VALIDATION
        if (!form.name.trim()) {
            setError("Category name is required");
            return;
        }

        // For ADD → image required
        if (!editId && !form.image) {
            setError("Category image is required");
            return;
        }

        const image = form.image
            ? await toBase64(form.image)
            : null;

        if (editId) {
            dispatch(
                updateCategory({
                    id: editId,
                    data: {
                        name: form.name,
                        ...(image
                            ? { image, imageName: form.image.name }
                            : {}),
                    },
                })
            );
            setEditId(null);
            setEditImagePreview(null);
            setEditImageName("");
        } else {
            const newCategory = {
                id: Date.now(),
                name: form.name,
                image,
                imageName: form.image?.name || "",
            };



            dispatch(addCategory(newCategory));

        }

        setForm({ name: "", image: null });
        setFileInputKey((prev) => prev + 1);
        setEditImagePreview(null);
        setEditImageName("");
    };

    // ✅ DELETE
    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
    };

    // ✅ EDIT
    const handleEdit = (cat) => {
        setForm({
            name: cat.name,
            image: null,
        });
        setEditId(cat.id);
        setEditImagePreview(cat.image || null);
        setEditImageName(cat.imageName || "Image uploaded");
    };

    return (
        <div className={styles.container}>
            <h2>Categories</h2>

            {/* FORM */}

            <div className={styles.form}>
                <input
                    type="text"
                    placeholder="Enter category name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    key={fileInputKey}
                    type="file"
                    onChange={(e) =>
                        setForm({ ...form, image: e.target.files[0] })
                    }
                />


                {/* PREVIEW */}


                <button onClick={handleSubmit}>
                    {editId ? "Update" : "Add"}
                </button>
            </div>
            {error && <p className={styles.error}>{error}</p>}

            {/* TABLE */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {categoriesSelector.length === 0 ? (
                        <tr>
                            <td colSpan="4">No categories found</td>
                        </tr>
                    ) : (
                        categoriesSelector.map((cat, index) => (
                            <tr key={cat.id}>
                                <td>{index + 1}</td>

                                {/* ✅ IMAGE COLUMN */}
                                <td>
                                    {cat.image && (
                                        <img
                                            src={cat.image}
                                            className={styles.thumb}
                                            alt=""
                                        />
                                    )}
                                </td>

                                <td>{cat.name}</td>

                                <td>
                                    <button
                                        className={styles.edit}
                                        onClick={() => handleEdit(cat)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className={styles.delete}
                                        onClick={() => handleDelete(cat.id)}
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

export default Categories;