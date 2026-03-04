import type { ReactNode } from "react";

type CardProps = {
  borderHeader?: boolean;
  classNameHeader?: string;
  title: string;
  children: ReactNode;
};

export default function Card({
  title,
  borderHeader = false,
  classNameHeader = "",
  children,
}: CardProps) {
  return (
    <div className={`rounded-[10px] bg-white shadow-sm border border-text-placeholder`}>
      <h3 className="text-lg font-semibold px-6.25 py-2.5 gap-2.5">
        {title}
      </h3>
      {borderHeader && <div className="h-px bg-text-placeholder"/>}
    
      <div 
      className={`flex flex-col px-6.25 py-2.5 gap-2.5`}
      >
        {children}
      </div>
    </div>
  );
}
