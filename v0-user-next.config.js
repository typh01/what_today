/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! 경고 !!
    // 타입 오류가 있어도 프로덕션 빌드를 허용합니다.
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint 오류가 있어도 빌드를 허용합니다.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

