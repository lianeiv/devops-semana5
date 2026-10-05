import type { NextConfig } from 'next';

const staticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = staticExport
  ? {
      output: 'export',
      images: { unoptimized: true },
    }
  : {
      output: 'standalone',
      skipTrailingSlashRedirect: true,
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/:path*`,
          },
        ];
      },
    };

export default nextConfig;