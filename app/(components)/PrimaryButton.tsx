import React from "react";

interface PrimaryButton extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function PrimaryButton({ className, text, ...props }: PrimaryButton) {
  return (
    <>
      <button
        type="button"
        {...props}
        className={classNames(className,
          "my-3 inline-flex items-center px-4 py-2 text-sm shadow-sm ")}
      >
        {text}
      </button >
    </>
  )
}