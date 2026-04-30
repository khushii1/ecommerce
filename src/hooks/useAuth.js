import { useMemo } from "react";
import { getData } from "../utils/localStorage";

const useAuth = () => {
  const authUser = getData("authUser");
  const authToken = getData("authToken");

  return useMemo(
    () => ({
      user: authUser,
      token: authToken,
      isAuthenticated: Boolean(authUser && authToken),
    }),
    [authUser, authToken]
  );
};

export default useAuth;
