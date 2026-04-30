import { apiRequest } from "./client";

export const getAdminProducts = () =>
    apiRequest("/products", {
        method: "GET",
    });

const makeSlug = (name) =>
    name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const toProductFormData = ({ name, description, price, quantity, oldPrice, badge, category, image }) => {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("slug", makeSlug(name));
    formData.append("description", description?.trim() || "");
    formData.append("price", String(price));
    formData.append("quantity", String(quantity));
    formData.append("stock", String(quantity));
    formData.append("category", category);
    const oldPriceNumber = Number(oldPrice);
    if (!Number.isNaN(oldPriceNumber) && oldPriceNumber > 0) {
        formData.append("oldPrice", String(oldPriceNumber));
    }
    if (badge) {
        formData.append("badge", badge);
    }
    if (image) formData.append("images", image);
    return formData;
};

export const createAdminProduct = (payload) =>
    apiRequest("/products", {
        method: "POST",
        body: toProductFormData(payload),
    });

export const updateAdminProduct = ({ id, ...payload }) =>
    apiRequest(`/products/${id}`, {
        method: "PATCH",
        body: toProductFormData(payload),
    });

export const deleteAdminProduct = (id) =>
    apiRequest(`/products/${id}`, {
        method: "DELETE",
    });