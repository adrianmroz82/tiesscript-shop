import { useRouter } from "next/navigation";

import { Button } from "@/components/shadcn-ui/button";

export function EmptyCart() {
  const router = useRouter();

  const handleRedirect = () => {
    router.back();
  };

  return (
    <div data-testid="empty-cart">
      <h2>There are no items in your cart</h2>
      <Button onClick={handleRedirect}>Go back to shopping</Button>
    </div>
  );
}
