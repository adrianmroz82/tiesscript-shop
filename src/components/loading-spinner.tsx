import { cn } from "@/lib/utils";
import { SVGProps } from "react";

export interface Props extends SVGProps<SVGSVGElement> {
  text?: string;
  size?: number;
  className?: string;
}

export function LoadingSpinner({ text = "Loading...", size = 24, className, ...props }: Props) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", className)}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <p>{text}</p>
    </div>
  );
}
