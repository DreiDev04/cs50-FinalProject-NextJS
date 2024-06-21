/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cs50-tindahan.s3.ap-southeast-2.amazonaws.com'],
  },
  env: {
    NEXT_AWS_S3_REGION: process.env.NEXT_AWS_S3_REGION,
    NEXT_AWS_S3_ACCESS_KEY_ID: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
    NEXT_AWS_S3_SECRET_ACCESS_KEY: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
    NEXT_AWS_S3_BUCKET_NAME: process.env.NEXT_AWS_S3_BUCKET_NAME,
  },
};

export default nextConfig;
