import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-primary-500">
          <span className="text-2xl font-bold">DMT</span>
        </div>

        {children}
      </div>
    </div>
  );
}
