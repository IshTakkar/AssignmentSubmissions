import { useEffect, useState } from "react";

export const useLocalStorage = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    return localValue !== null ? JSON.parse(localValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
