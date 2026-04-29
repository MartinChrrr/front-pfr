import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-primary-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M7 8h10" />
            <path d="M7 12h10" />
            <path d="M7 16h10" />
          </svg>
          <span className="text-2xl font-bold">DMT</span>
        </div>

        {children}
      </div>
    </div>
  );
}
