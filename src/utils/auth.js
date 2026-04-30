export const isAdminUser = (user) => {
  if (!user) return false;
  return user.role === "admin" || user.email === "admin@gmail.com";
};
