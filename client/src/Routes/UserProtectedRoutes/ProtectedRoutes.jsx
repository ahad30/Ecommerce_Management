import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { useGetLoggedInUserQuery } from "../../Redux/Feature/auth/authApi";
import { Navigate } from "react-router-dom";
import LoadingPage from "../../Layout/Dashboard/LoadingPage";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "../../Redux/Feature/auth/authSlice";

const ProtectedRoutes = ({
  children,
  role,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const user = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, isFetching, refetch } = useGetLoggedInUserQuery(
    undefined
    // {
    //   // skip: user == null ? true : false,
    // }
  );
  useEffect(() => {
    if (user && token) {
      refetch();
      setLoading(false);
    }
  }, [user, token, refetch]);

  if (!token || token == null || user == null) {
    return <Navigate to={"/login"}></Navigate>;
  }
  if (isLoading || isFetching || loading) {
    return <LoadingPage></LoadingPage>;
  }
  // console.log(data?.data?.role)
  if (data?.data?.role !== role) {
    dispatch(logout());
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};

export default ProtectedRoutes;
