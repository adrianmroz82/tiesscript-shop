"use client";

import { useRouter } from "next/navigation";

export default function DashboardView() {
  const router = useRouter();

  const goToCategory = (category: string) => () => {
    router.push(`/${category}`);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={goToCategory("ties")}>ties</button>
      <button onClick={goToCategory("blazers")}>blazers</button>
    </div>
  );
}
