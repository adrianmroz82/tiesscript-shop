import { useRouter } from "next/navigation";

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
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export function QueryPagination({ currentPage, onPageChange, totalPages }: Props) {
  const router = useRouter();

  const goToPage = (page: number) => () => {
    router.push(`?page=${page}`);
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={goToPage(currentPage - 1)}
            // disabled={currentPage === 1}
            className={currentPage === 1 ? "cursor-not-allowed" : ""}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink onClick={goToPage(page)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={goToPage(currentPage + 1)}
            className={currentPage === totalPages ? "cursor-not-allowed" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
