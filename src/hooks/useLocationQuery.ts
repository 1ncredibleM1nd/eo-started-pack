import { useLocation } from "react-router-dom";

export function useLocationQuery() {
  return new URLSearchParams(useLocation().search);
}
