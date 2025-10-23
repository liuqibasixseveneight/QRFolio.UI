const APOLLO_CLIENT_URL =
  (import.meta.env.VITE_APOLLO_CLIENT_URL as string) || 'http://localhost:4000';

const VITE_DATABASE_PROJECT_URL = import.meta.env
  .VITE_DATABASE_PROJECT_URL as string;
const VITE_DATABASE_PUBLIC_API_KEY = import.meta.env
  .VITE_DATABASE_PUBLIC_API_KEY as string;

// Production URL for QR code generation - should be set in environment variables
const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_URL as string;

export {
  APOLLO_CLIENT_URL,
  VITE_DATABASE_PROJECT_URL,
  VITE_DATABASE_PUBLIC_API_KEY,
  PRODUCTION_URL,
};
