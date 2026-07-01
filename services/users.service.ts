import { apiRequest } from "@/lib/api";
import type { Role, User } from "@/types";
export const usersService = {
  list: () => apiRequest<User[]>("/users"),
  updateRole: (id: string, role: Role) =>
    apiRequest<User>(`/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }),
};
