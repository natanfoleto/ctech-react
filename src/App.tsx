import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes/index";

import { GlobalProvider } from "./contexts/global";
import { AuthProvider } from "./contexts/authentication";

import "./global.css";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          theme="light"
          autoClose={2000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
