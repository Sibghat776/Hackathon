import { toast } from "react-toastify";

export const showToast = (message, type, theme) => {
  const options = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: theme || "light",
  };

  if (type === "success") {
    toast.success(message, options);
  } else if (type === "info") {
    toast.info(message, options);
  } else if (type === "warn") {
    toast.warn(message, options);
  } else {
    toast.error(message, options);
  }
};
