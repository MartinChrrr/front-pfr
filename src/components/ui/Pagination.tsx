import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2.5 pt-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center text-text-black transition-colors hover:text-text-placeholder disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronsLeft size={20} />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center text-text-black transition-colors hover:text-text-placeholder disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="flex h-10 w-10 items-center justify-center text-text-placeholder">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`flex h-10 w-10 items-center justify-center rounded text-sm font-medium transition-colors ${
              page === currentPage
                ? "border border-text-placeholder"
                : "text-text-black hover:text-text-placeholder"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center text-text-black transition-colors hover:text-text-placeholder disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronRight size={20} />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center text-text-black transition-colors hover:text-text-placeholder disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronsRight size={20} />
      </button>
    </div>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}
