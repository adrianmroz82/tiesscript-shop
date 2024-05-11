import { ReactNode } from "react";
import { AuthProvider } from "./context/auth-provider";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  // TODO - Add any additional providers here
  return <AuthProvider>{children}</AuthProvider>;
}
