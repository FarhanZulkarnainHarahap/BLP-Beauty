export const formatRupiah = (value: string | number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));
export const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");
