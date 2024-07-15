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
  const goToPage = (page: number) => () => {
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={goToPage(currentPage - 1)}
            // disabled={currentPage === 1}
            className={currentPage === 1 ? "cursor-not-allowed" : ""}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink href="#" onClick={goToPage(page)} isActive={page === currentPage}>
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
            href="#"
            onClick={goToPage(currentPage + 1)}
            className={currentPage === totalPages ? "cursor-not-allowed" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
