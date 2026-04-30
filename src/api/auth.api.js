import { apiRequest } from "./client";

export const signupUser = ({ name, email, password }) =>
  apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

export const loginUser = ({ email, password }) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const logoutUser = () =>
  apiRequest("/auth/logout", {
    method: "POST",
  });
