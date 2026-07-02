export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";
export type AuthUser = {
  id: string;
  role: Role;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};
export type AuthSession = {
  user: AuthUser;
  expires: string;
};
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  createdAt: string;
};
export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string | number;
  discountPrice?: string | number | null;
  imageUrl: string;
  categoryId: string;
  category: Category;
  badge?: string | null;
  stock: number;
  isBestSeller: boolean;
  isPublished: boolean;
  createdAt: string;
};
export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
};
export type Campaign = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  buttonText?: string | null;
  buttonLink?: string | null;
  isPublished: boolean;
  createdAt: string;
};
export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  isPublished: boolean;
  createdAt: string;
};
export type Subscriber = { id: string; email: string; createdAt: string };
export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: Role;
  createdAt: string;
};
export type ApiMeta = { page: number; limit: number; total: number; pages: number };
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: ApiMeta;
  error?: { message: string; code: string };
};
