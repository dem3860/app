"use client";
interface PaginationProps {
  page: number;
  limit: number;
  totalCount?: number;
  onPageChange: (newPage: number) => void;
  disableNext?: boolean;
}

export function Pagination({
  page,
  limit,
  totalCount,
  onPageChange,
  disableNext,
}: PaginationProps) {
  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    onPageChange(page + 1);
  };

  const isLastPage = totalCount ? page * limit >= totalCount : disableNext;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className="border rounded px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        前へ
      </button>
      <div className="font-medium">{page} ページ目</div>
      <button
        onClick={handleNext}
        disabled={isLastPage}
        className="border rounded px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        次へ
      </button>
    </div>
  );
}
