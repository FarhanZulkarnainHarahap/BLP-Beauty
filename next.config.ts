import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard/customer",
        destination: "/",
        permanent: false,
      },
      {
        source: "/dashboard/customer/shop",
        destination: "/shop",
        permanent: false,
      },
      {
        source: "/dashboard/customer/shop/:path*",
        destination: "/shop/:path*",
        permanent: false,
      },
      {
        source: "/dashboard/customer/campaign",
        destination: "/campaign",
        permanent: false,
      },
      {
        source: "/dashboard/customer/journal",
        destination: "/journal",
        permanent: false,
      },
      {
        source: "/dashboard/customer/journal/:path*",
        destination: "/journal/:path*",
        permanent: false,
      },
      {
        source: "/dashboard/customer/our-story",
        destination: "/our-story",
        permanent: false,
      },
      {
        source: "/dashboard/customer/profile",
        destination: "/profile",
        permanent: false,
      },
      {
        source: "/dashboard/customer/notifications",
        destination: "/notifications",
        permanent: false,
      },
      {
        source: "/products",
        destination: "/shop",
        permanent: false,
      },
      {
        source: "/products/:path*",
        destination: "/shop/:path*",
        permanent: false,
      },
      {
        source: "/campaigns",
        destination: "/campaign",
        permanent: false,
      },
      {
        source: "/articles",
        destination: "/journal",
        permanent: false,
      },
      {
        source: "/articles/:path*",
        destination: "/journal/:path*",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/our-story",
        permanent: false,
      },
      {
        source: "/admin/login",
        destination: "/login?callbackUrl=/dashboard/admin",
        permanent: false,
      },
      {
        source: "/admin/dashboard",
        destination: "/dashboard/admin",
        permanent: false,
      },
      {
        source: "/admin/users",
        destination: "/dashboard/super_admin/users",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "/dashboard/admin/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/auth/:path*",
          destination: `${apiUrl}/api/auth/:path*`,
        },
        {
          source: "/api/admin/:path*",
          destination: `${apiUrl}/:path*`,
        },
        {
          source: "/shop/:path*",
          destination: "/dashboard/customer/shop/:path*",
        },
        {
          source: "/campaign",
          destination: "/dashboard/customer/campaign",
        },
        {
          source: "/journal/:path*",
          destination: "/dashboard/customer/journal/:path*",
        },
        {
          source: "/our-story",
          destination: "/dashboard/customer/our-story",
        },
        {
          source: "/profile",
          destination: "/dashboard/customer/profile",
        },
        {
          source: "/notifications",
          destination: "/dashboard/customer/notifications",
        },
      ],
    };
  },
};

export default nextConfig;
