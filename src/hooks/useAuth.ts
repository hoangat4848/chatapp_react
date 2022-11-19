import { useContext, useEffect, useState } from "react";
import { getAuthUser } from "../utils/api";
import { AuthContext } from "../utils/context/AuthContext";
import { User } from "../utils/types";

export const useAuth = () => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const { updateAuthUser } = useContext(AuthContext);

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        setUser(data);
        updateAuthUser(data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);

  return { user, loading };
};
