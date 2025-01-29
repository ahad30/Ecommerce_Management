import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "../../Redux/Feature/auth/authSlice";
import { useGetUsersQuery } from "../../redux/Feature/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/Hook/Hook";
import LoadingPage from "../../components/LoadingPage";

const ProtectedRoutes = ({
  children,
  role,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const user = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, isFetching, refetch } = useGetUsersQuery();
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

  // const loggedInUser = data?.data?.find((u) => u.email === user.email);

  // if (!loggedInUser || loggedInUser.role !== "admin") {
  //   dispatch(logout());
  //   return <Navigate to={"/login"}></Navigate>;
  // }
};

export default ProtectedRoutes;
