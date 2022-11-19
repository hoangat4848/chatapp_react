import { useEffect, useState } from "react";
import { getAuthUser } from "../utils/api";
import { User } from "../utils/types";

export const useAuth = () => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        console.log(data);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);

  return { user, loading };
};
