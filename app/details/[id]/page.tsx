"use client";

import { useParams } from "next/navigation";

export default function DetailsPage() {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <h1>Details Page</h1>
      <p>ID: {params?.id} </p>
    </div>
  );
}
