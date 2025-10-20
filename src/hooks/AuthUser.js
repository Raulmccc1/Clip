import { useAuth } from '@/context/authContext';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const useAuthUser = () => {
  const navigate = useNavigate();
  const {session, user} = useAuth();

  useEffect(() => {
    session || user ? navigate("/dashboard") : null;
  }, [session, user]);
}

export default useAuthUser