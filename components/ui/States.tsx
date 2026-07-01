export function EmptyState({
  title = "Nothing here yet",
  copy = "New stories are being prepared.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <div className="card col-span-full p-14 text-center">
      <div className="serif text-3xl">{title}</div>
      <p className="mt-2 text-sm text-[#76645d]">{copy}</p>
    </div>
  );
}
export function ErrorState({
  message = "We couldn't reach the beauty counter. Please make sure the API is running.",
}: {
  message?: string;
}) {
  return (
    <div
      className={
        "shell my-16 rounded-2xl border border-[#6f1f3533] bg-[#ead2d355] " +
        "p-8 text-center text-sm text-[#6f1f35]"
      }
    >
      {message}
    </div>
  );
}
export function LoadingSkeleton() {
  return (
    <div className="shell grid grid-cols-2 gap-4 py-16 md:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <div className="skeleton aspect-[4/5] rounded-3xl" />
          <div className="skeleton mt-4 h-5 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}
