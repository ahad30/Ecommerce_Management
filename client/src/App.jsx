import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./Routes/routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster expand={true} richColors/>
    </>
  );
}

export default App;
