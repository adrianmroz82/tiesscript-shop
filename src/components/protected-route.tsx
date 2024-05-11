import { ReactNode } from "react";
import { useAuth } from "../../app/context/auth-provider";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

export function ProtectedRoute({ children }: Props): JSX.Element {
  const { user, loading } = useAuth();
  const router = useRouter();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!user) {
    router.push("/sign-in");
  }

  return <>{children}</>;
}
