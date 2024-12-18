import { TRoutes, TRoutesData } from "../types/sidebarAndRouesTypes";

export const routesGenerator = (Routes: TRoutesData[]) => {
  const routeGenerator = Routes.reduce((acc: TRoutes[], item) => {
    if (item.path) {
      acc.push({ path: item.path, element: item.element });
    }
    if (item.children) {
      item.children.forEach((i) => {
        acc.push({ path: i.path, element: i.element });
      });
    }
    return acc;
  }, []);
  return routeGenerator;
};
