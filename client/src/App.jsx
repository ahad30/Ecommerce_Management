import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./Routes/routes";
import { Toaster } from "sonner";
import LoadingPage from "./components/LoadingPage";
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
     {isLoading ? (
          <div>
            <LoadingPage />
          </div>
        ) : (
    <>
    <RouterProvider router={routes} />
    <Toaster expand={true} richColors/>
    </>
        )}

    </>
  );
}

export default App;
