import React, { createElement as h } from "https://esm.sh/react@18.2.0";

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      tw?: string 
    }
  }
}

export function Marker({
  children,
  strokeColor = "currentColor",
  fillColor = "currentColor",
  strokeWidth = 0.5,
}: {
  children: React.ReactNode
  strokeColor: string;
  fillColor: string;
  strokeWidth: number
}) {
  return (
    <div tw="flex flex-row mx-auto relative bg-transparent w-[128px] h-[128px] justify-center items-center">
      <svg
        height={128}
        viewBox="0 0 22 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M11 27.333c-3.578-3.044-6.25-5.872-8.016-8.482C1.218 16.24.334 13.823.334 11.6c0-3.333 1.072-5.989 3.217-7.967C5.696 1.656 8.179.667 11 .667c2.822 0 5.306.989 7.45 2.966 2.146 1.978 3.218 4.634 3.217 7.967 0 2.222-.884 4.64-2.651 7.25-1.767 2.612-4.44 5.44-8.016 8.483z"
          fill={fillColor}
        />
      </svg>
      {children}
    </div>
  );
}
