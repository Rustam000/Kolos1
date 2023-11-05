import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useDebuoncedDispatch(
  initialState = "",
  dispatchFn,
  delay = 250,
) {
  const [rawValue, setRawValue] = useState(initialState);
  const debouncedValue = useDebounce(rawValue, delay);
  useEffect(() => {
    dispatchFn(debouncedValue);
  }, [debouncedValue]);

  return [rawValue, setRawValue];
}
