import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900 ${className}`}>
      {children}
    </div>
  );
}
