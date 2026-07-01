import { apiRequest } from "@/lib/api";
export const uploadService = {
  image: (file: File) => {
    const body = new FormData();
    body.set("file", file);
    return apiRequest<{ url: string }>("/upload", { method: "POST", body });
  },
};
