import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useDebuoncedDispatch(dispatchFn, delay = 250) {
  const [rawValue, setRawValue] = useState("");
  const debouncedValue = useDebounce(rawValue, delay);
  useEffect(() => {
    dispatchFn(debouncedValue);
  }, [debouncedValue]);

  return [rawValue, setRawValue];
}
