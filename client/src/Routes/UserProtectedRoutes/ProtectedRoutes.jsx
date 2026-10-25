import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "../../redux/Feature/auth/authSlice";
import { useGetMeQuery } from "../../redux/Feature/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/Hook/Hook";
import LoadingPage from "../../components/LoadingPage";

const ProtectedRoutes = ({ children, role }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);
  // The token is the cache key so a result from a previous login is never reused.
  const { currentData, isLoading, isFetching, isError } = useGetMeQuery(token, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  const isAuthenticated = Boolean(token && user);
  const isPending = isLoading || isFetching;
  const isDenied =
    isAuthenticated &&
    !isPending &&
    (isError || currentData?.data?.role !== role);

  useEffect(() => {
    if (isDenied) {
      dispatch(logout());
    }
  }, [isDenied, dispatch]);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }} // Pass the current path to redirect back after login
        replace
      />
    );
  }

  if (isPending) {
    return <LoadingPage />;
  }

  if (isDenied) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
