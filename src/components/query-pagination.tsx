import { useRouter, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn-ui/pagination";

interface Props {
  totalPages: number;
}

export function QueryPagination({ totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const goToPage = (page: number) => () => {
    const orderBy = searchParams.get("orderBy") ?? "created_at_desc";
    router.push(`?page=${page}&orderBy=${orderBy}`);
  };

  function renderPages() {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range = [];
    range.push(1);

    if (currentPage > 4) {
      range.push("ellipsis");
    }

    for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
      range.push(i);
    }

    if (currentPage < totalPages - 3) {
      range.push("ellipsis");
    }

    range.push(totalPages);

    return range;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={goToPage(Math.max(1, currentPage - 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {renderPages().map((page, idx) => (
          <PaginationItem key={idx}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink onClick={goToPage(page as number)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem className="">
          <PaginationNext
            onClick={goToPage(Math.min(totalPages, currentPage + 1))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
