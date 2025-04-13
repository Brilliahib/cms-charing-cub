import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem =
    totalItems === 0 ? 0 : Math.min(currentPage * itemsPerPage, totalItems);

  const generatePages = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 2) {
        pages.push(1, "...");
      }
      pages.push(
        Math.max(1, currentPage - 1),
        currentPage,
        Math.min(totalPages, currentPage + 1)
      );
      if (currentPage < totalPages - 1) {
        pages.push("...", totalPages);
      }
    }
    return pages;
  };

  const paginationRange = generatePages();

  return (
    <div className="flex md:flex-row flex-col justify-between w-full md:gap-0 gap-4">
      <p className="text-center md:text-left w-full text-sm">
        Menampikan {startItem} - {endItem} dari {totalItems} data
      </p>
      <Pagination className="md:justify-end justify-center">
        <PaginationContent className="gap-2">
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            size={"sm"}
            className="size-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {paginationRange.map((page, index) =>
            typeof page === "string" ? (
              <PaginationEllipsis key={`ellipsis-${index}`} />
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => onPageChange(page)}
                size={"sm"}
                className="size-9"
              >
                {page}
              </Button>
            )
          )}
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            size={"sm"}
            className="size-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
