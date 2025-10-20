import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRequireAuth = () => {
  const { session, user, authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!session || !user) {
      navigate("/auth", { replace: true });
    }
  }, [session, user, authLoading, navigate]);
};

export default useRequireAuth;
