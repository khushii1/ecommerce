import { apiRequest } from "./client";

export const getAdminCategories = () =>
  apiRequest("/categories", {
    method: "GET",
  });

export const createAdminCategory = ({ name, image, description }) =>
  apiRequest("/categories", {
    method: "POST",
    body: JSON.stringify({ name, image, description }),
  });

export const updateAdminCategory = ({ id, name, image, description }) =>
  apiRequest(`/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name, image, description }),
  });

export const deleteAdminCategory = (id) =>
  apiRequest(`/categories/${id}`, {
    method: "DELETE",
  });
