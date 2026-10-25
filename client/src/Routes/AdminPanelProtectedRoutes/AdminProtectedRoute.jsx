import { useEffect } from "react";
import {
  logout,
  useCurrentToken,
  useCurrentUser,
} from "../../redux/Feature/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "../../redux/Feature/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/Hook/Hook";
import LoadingPage from "../../components/LoadingPage";
// import { PermissionContextProvider } from "../../contex/PermissionProvider";

const AdminProtectedRoute = ({ children }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);
  // The token is the cache key so a result from a previous login is never reused.
  const { currentData, isLoading, isFetching, isError } = useGetMeQuery(token, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });
  // const { setLoggedInUserPermissions } = useContext(PermissionContextProvider);

  // useEffect(() => {
  //   if (Array.isArray(data?.data?.role) && data?.data?.role?.length > 0) {
  //     const arr = data?.data?.role;
  //     const array = [];
  //     for (let index = 0; index < arr.length; index++) {
  //       const element = arr[index];
  //       element.permissions.forEach((item) => array.push(item?.name));
  //     }
  //     setLoggedInUserPermissions([...array]);
  //   }
  // }, [data?.data?.role, data?.data]);

  const isAuthenticated = Boolean(token && user);
  const isPending = isLoading || isFetching;
  const isDenied =
    isAuthenticated &&
    !isPending &&
    (isError || currentData?.data?.role !== "admin");

  useEffect(() => {
    if (isDenied) {
      dispatch(logout());
    }
  }, [isDenied, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"}></Navigate>;
  }

  if (isPending) {
    return <LoadingPage></LoadingPage>;
  }

  if (isDenied) {
    return <Navigate to={"/login"}></Navigate>;
  }

  return children;
};
export default AdminProtectedRoute;
