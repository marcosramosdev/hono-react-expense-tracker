type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPending?: boolean;
};

function ExpensesPagination({
  page,
  totalPages,
  onPageChange,
  isPending = false,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-base-content/70">
        Page {page} of {totalPages}
      </div>

      <div className="join">
        <button
          className="join-item btn btn-sm"
          disabled={page === 1 || isPending}
          onClick={() => onPageChange(page - 1)}
          type="button"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              className={`join-item btn btn-sm ${
                pageNumber === page ? "btn-active" : ""
              }`}
              disabled={isPending}
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              type="button"
            >
              {pageNumber}
            </button>
          ),
        )}

        <button
          className="join-item btn btn-sm"
          disabled={page === totalPages || isPending}
          onClick={() => onPageChange(page + 1)}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ExpensesPagination;
