import { useState } from "react";
import styles from "./Categories.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createAdminCategory,
    deleteAdminCategory,
    getAdminCategories,
    updateAdminCategory,
} from "../../../api/admin_category.api";
import Snackbar from "../../../components/ui/Snackbar";

const Categories = () => {
    const queryClient = useQueryClient();
    const [formError, setFormError] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "error" });
    const [editId, setEditId] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const [form, setForm] = useState({
        name: "",
        image: null,
        description: "",
    });

    const showSnackbar = (message, type = "error") => {
        setSnackbar({ open: true, message, type });
        setTimeout(() => setSnackbar({ open: false, message: "", type: "error" }), 3000);
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["admin-categories"],
        queryFn: getAdminCategories,
    });

    const createMutation = useMutation({
        mutationFn: createAdminCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            showSnackbar("Category created successfully.", "success");
            setForm({ name: "", image: null, description: "" });
            setFileInputKey((prev) => prev + 1);
        },
        onError: (err) => {
            showSnackbar(err.message || "Unable to create category.");
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateAdminCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            showSnackbar("Category updated successfully.", "success");
            setEditId(null);
            setForm({ name: "", image: null, description: "" });
            setFileInputKey((prev) => prev + 1);
        },
        onError: (err) => {
            showSnackbar(err.message || "Unable to update category.");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAdminCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            showSnackbar("Category deleted successfully.", "success");
        },
        onError: (err) => {
            showSnackbar(err.message || "Unable to delete category.");
        },
    });

    const categories = data?.data?.categories || [];

    const handleSubmit = async () => {
        setFormError("");

        if (!form.name.trim()) {
            const message = "Category name is required";
            setFormError(message);
            showSnackbar(message);
            return;
        }

        if (!editId && !form.image) {
            const message = "Category image is required";
            setFormError(message);
            showSnackbar(message);
            return;
        }

        const payload = {
            name: form.name.trim(),
            description: form.description.trim(),
        };

        if (form.image) {
            payload.image = await toBase64(form.image);
        }

        if (editId) {
            updateMutation.mutate({ id: editId, ...payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    const handleEdit = (cat) => {
        setForm({
            name: cat.name,
            image: null,
            description: cat.description || "",
        });
        setEditId(cat._id);
    };

    return (
        <div className={styles.container}>
            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar({ open: false, message: "", type: "error" })}
            />
            <h2>Categories</h2>
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
                    accept="image/*"
                    onChange={(e) =>
                        setForm({ ...form, image: e.target.files?.[0] || null })
                    }
                />

                <input
                    type="text"
                    placeholder="Enter description (optional)"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
                <button
                    onClick={handleSubmit}
                    disabled={createMutation.isPending || updateMutation.isPending}
                >
                    {editId ? "Update" : "Add"}
                </button>
            </div>
            {formError && <p className={styles.error}>{formError}</p>}
            {isError ? <p className={styles.error}>{error.message}</p> : null}

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="5">Loading categories...</td>
                        </tr>
                    ) : categories.length === 0 ? (
                        <tr>
                            <td colSpan="5">No categories found</td>
                        </tr>
                    ) : (
                        categories.map((cat, index) => (
                            <tr key={cat._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {cat.image ? (
                                        <img
                                            src={cat.image}
                                            className={styles.thumb}
                                            alt={cat.name}
                                        />
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td>{cat.name}</td>
                                <td>{cat.description || "-"}</td>

                                <td>
                                    <button
                                        className={styles.edit}
                                        onClick={() => handleEdit(cat)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className={styles.delete}
                                        onClick={() => handleDelete(cat._id)}
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