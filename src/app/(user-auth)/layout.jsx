import {
  ToastContainer,
  Bounce,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default async function AuthLayout({
 
  children,
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
          <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {children}
    </div>
  );
}