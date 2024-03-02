"use client";

import { useParams } from "next/navigation";

export default function DetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Details Page</h1>
      <p>ID: {id}</p>
    </div>
  );
}
