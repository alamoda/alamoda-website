import React from "react";
import { cn } from "../(utils)/helpers";

interface PrimaryButton extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
}

export default function PrimaryButton({ className, text, ...props }: PrimaryButton) {
  return (
    <>
      <button
        type="button"
        {...props}
        className={cn(className,
          "my-3 inline-flex items-center px-4 py-2 text-sm shadow-sm ")}
      >
        {text}
      </button >
    </>
  )
}