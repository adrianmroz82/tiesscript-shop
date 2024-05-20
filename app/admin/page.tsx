"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "../context/auth-provider";
import { useRouter } from "next/navigation";

export default function Admin() {
  // TODO: replace with SSR middleware
  
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
  };

  return (
    <ProtectedRoute>
      <button onClick={handleLogOut}>Log Out</button>
    </ProtectedRoute>
  );
}
