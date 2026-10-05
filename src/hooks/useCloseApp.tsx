import { useEffect } from "react";

export const useCloseApp = () => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc")
        document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    };
  }, []);
};
