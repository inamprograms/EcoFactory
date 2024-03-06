import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import CustomRoutes from "./Pages/Routes";
import { useEffect, useState } from "react";
import HideScreens from "./Components/hide screens/HideScreens";

function App() {
  const [width, setWidth] = useState(false); // Initialize width as false

  useEffect(() => {
    // Function to update width state
    const updateWidth = () => {
      const isSmallerScreen = window.innerWidth < 1024;
      setWidth(isSmallerScreen);
    };
    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      {width ? <HideScreens /> : <CustomRoutes />}
    </>
  );
}

export default App;

